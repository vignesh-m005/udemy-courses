import uuid
from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from db import items, stores

blp = Blueprint("Items", "items", description="Operations on items")


@blp.route("/item/<string:item_id>")
class Item(MethodView):
    def get(self, item_id):
        try:
            return {"item": items[item_id]}
        except KeyError:
            abort(400, "Invalid item id")

    def delete(self, item_id):
        try:
            del items[item_id]
            return {"message": "Item deleted"}, 200
        except KeyError:
            abort(400, "Invalid key mentioned")


@blp.route("/item")
class ItemList(MethodView):
    def get(self):
        return {"items": list(items.values())}

    def post(self):
        item_data = request.get_json()
        if (
                "price" not in item_data or
                "name" not in item_data or
                "store_id" not in item_data
        ):
            abort(400,
                  message="Bad request! add price, name, store_id")

        for item in items.values():
            if (
                    item_data["name"] == item["name"] and
                    item_data["store_id"] == item["store_id"]
            ):
                abort(400, "Item already exist")

        if item_data["store_id"] in stores.keys():
            item_id = uuid.uuid4()
            item = {**item_data, "id": item_id}
            items[str(item_id)] = item
            return items, 201
        # return {"message": "Store not found"}, 400
        abort(400, message="Store not found")

import time
import uuid
from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from db import items, stores
from schemas2 import ItemSchema, ItemUpdateSchema

blp = Blueprint("Items", "items", description="Operations on items")


@blp.route("/item/<string:item_id>")
class Item(MethodView):

    @blp.response(200, ItemSchema)
    def get(self, item_id):
        try:
            return items[item_id]
        except KeyError:
            abort(400, "Invalid item id")

    def delete(self, item_id):
        try:
            del items[item_id]
            return {"message": "Item deleted"}, 200
        except KeyError:
            abort(400, "Invalid key mentioned")

    @blp.arguments(ItemUpdateSchema)
    @blp.response(200, ItemSchema)
    def put(self, item_data, item_id):
        # item_data = request.get_json()
        # if (
        #         "price" not in item_data or
        #         "name" not in item_data
        # ):
        #     abort(400,
        #           message="Bad request! Add price, name fields")
        try:
            # items[item_id]["name"] = item_data["name"]
            # items[item_id]["price"] = item_data["price"]

            item = items[item_id]
            # item |= item_data   won't work below 3.9 ver
            item.update(item_data)

        except KeyError:
            abort(400,
                  message="Bad request! Invalid item id")
        return item


@blp.route("/item")
class ItemList(MethodView):

    @blp.response(200, ItemSchema(many=True))
    def get(self):
        return list(items.values())

    @blp.arguments(ItemSchema)
    @blp.response(201, ItemSchema)
    def post(self, item_data):
        # item_data = request.get_json()
        # if (
        #         "price" not in item_data or
        #         "name" not in item_data or
        #         "store_id" not in item_data
        # ):
        #     abort(400,
        #           message="Bad request! add price, name, store_id")

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
            return items[str(item_id)], 201
        # return {"message": "Store not found"}, 400
        abort(400, message="Store not found")

from flask import Flask, request
from db import items, stores
from flask_smorest import abort
import uuid

app = Flask(__name__)


@app.get("/store/<string:store_id>")
def get_store_by_id(store_id):
    try:
        return stores[store_id]
    except KeyError:
        # return {"message": "Invalid store id - " + str(store_id),
        #         "status": False}, 400
        abort(400, message=f"Invalid store id - {store_id}")


@app.get("/stores")
def get_stores():
    return {"stores": list(stores.values())}


@app.post("/store")
def create_new_store():
    store_data = request.get_json()

    if "name" not in store_data:
        abort(400,
              message="Bad request. Ensure 'name' is included in JSON")

    for store in stores.values():
        if store["name"] == store_data["name"]:
            abort(400, "Store already exist")

    store_id = uuid.uuid4().hex
    new_store = {**store_data, "id": store_id}
    stores[store_id] = new_store
    return stores, 201


@app.post("/item")
def create_item():
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


@app.get("/items")
def get_all_items():
    return {"items": list(items.values())}


@app.get("/item/<string:item_id>")
def get_item_by_id(item_id):
    try:
        return {"item": items[item_id]}
    except KeyError:
        abort(400, "Invalid item id")


@app.delete("/item/<string:item_id>")
def delete_item(item_id):
    try:
        del items[item_id]
        return {"message": "Item deleted"}, 200
    except KeyError:
        abort(400, "Invalid key mentioned")


@app.put("/item/<string:item_id>")
def update_item(item_id):
    item_data = request.get_json()
    if (
            "price" not in item_data or
            "name" not in item_data
    ):
        abort(400,
              message="Bad request! Add price, name fields")
    try:
        # items[item_id]["name"] = item_data["name"]
        # items[item_id]["price"] = item_data["price"]

        item = items[item_id]
        # item |= item_data   won't work below 3.9 ver
        item.update(item_data)

    except KeyError:
        abort(400,
              message="Bad request! Invalid item id")
    return "Update successfully"

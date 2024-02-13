from flask import Flask, request

app = Flask(__name__)

stores = [
    {
        "name": "My store",
        "items": [
            {
                "name": "Chair",
                "price": 400.0
            }
        ]
    }
]


@app.get("/store")
def get_stores():
    return {"stores": stores}


@app.get("/")
def default_page():
    return "Welcome"


@app.post("/store")
def create_new_store():
    request_data = request.get_json()
    new_store = {"name": request_data["name"], "items": []}
    stores.append(new_store)
    return stores, 201


@app.post("/store/item/<string:name>")
def create_item(name):
    request_data = request.get_json()
    for store in stores:
        if store["name"] == name:
            store["items"].append(request_data["item"])
            return stores, 201
    return {"message": "No stores found for - " + name}, 400


@app.get("/store/<string:name>")
def get_specific_store(name):
    for store in stores:
        if store["name"] == name:
            return store
    return {"message": "No stores found for - " + name}, 400
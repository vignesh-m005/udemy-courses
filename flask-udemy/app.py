from flask import Flask

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

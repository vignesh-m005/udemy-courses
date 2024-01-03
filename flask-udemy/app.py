import os
from flask_jwt_extended import JWTManager
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_smorest import Api
from sqlalchemy import URL
import secrets

from blocklist import BLOCKLIST
from db import db
from resources.item import blp as ItemBlueprint
from resources.store import blp as StoreBlueprint
from resources.tags import blp as TagBlueprint
from resources.user import blp as UserBlueprint


def create_app(db_url=None):
    app = Flask(__name__)

    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "Stores Rest API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    url = URL.create(
        drivername="postgresql+psycopg2",
        username="postgres",
        password="Vignesh@12",
        host="localhost",
        port=5432,
        database="flask-udemy"
    )

    app.config["SQLALCHEMY_DATABASE_URI"] = url or os.getenv(
        url.render_as_string(hide_password=False).replace('%', '%%'), "sqlite:///data.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    migrate = Migrate(app, db)

    # @app.before_first_request
    # def create_tables():
    #     db.create_all()

    with app.app_context():
        db.create_all()

    api = Api(app)

    app.config["JWT_SECRET_KEY"] = "311079073095142418098352057504553349841"
    jwt = JWTManager(app)

    @jwt.additional_claims_loader
    def add_claims_to_jwt(identity):
        if identity == 1:
            return {"is_admin": True}
        return {"is_admin": False}

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        return jwt_payload["jti"] in BLOCKLIST

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return (
            jsonify(
                {"description": "The token has been revoked.", "error": "token_revoked"}
            ),
            401,
        )

    @jwt.needs_fresh_token_loader
    def token_not_fresh_callback(jwt_header, jwt_payload):
        return jsonify(
            {
                "description": "The token is not fresh",
                "error": "fresh_token_required"
            }
        ), 401

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return (
            jsonify({"message": "The token has expired.", "error": "token_expired"}),
            401,
        )

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return (
            jsonify(
                {"message": "Signature verification failed.", "error": "invalid_token"}
            ),
            401,
        )

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return (
            jsonify(
                {
                    "description": "Request does not contain an access token.",
                    "error": "authorization_required",
                }
            ),
            401,
        )

    api.register_blueprint(ItemBlueprint)
    api.register_blueprint(StoreBlueprint)
    api.register_blueprint(TagBlueprint)
    api.register_blueprint(UserBlueprint)

    return app

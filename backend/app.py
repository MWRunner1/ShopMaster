import json
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os
import random

app = Flask(__name__)
CORS(app)


@app.route("/api/products", methods=["GET"])
def get_products():
    if random.random() < 0.3:
        return jsonify({"error": "Simulated server error"}), 500
    try:
        with open("products.json", "r") as f:
            products = json.load(f)
        return jsonify(products), 200
    except FileNotFoundError:
        return jsonify({"error": "Products file not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON in file"}), 500


@app.route("/api/save_cart", methods=["POST"])
def save_cart():
    if random.random() < 0.3:
        return jsonify({"error": "Simulated server error"}), 500
    data = request.get_json()
    if not data or "cart" not in data:
        return jsonify({"error": "Missing cart data"}), 400
    cart = data["cart"]

    merged = {}
    for item in cart:
        pid = item["id"]
        if pid in merged:
            merged[pid]["quantity"] += item.get("quantity", 1)
        else:
            merged[pid] = item.copy()
            if "quantity" not in merged[pid]:
                merged[pid]["quantity"] = 1
    merged_cart = list(merged.values())

    try:
        # Load existing purchases
        try:
            with open("./purchases.json", "r") as f:
                purchases = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            purchases = []
        # Append new merged cart
        purchases.append(merged_cart)
        with open("./purchases.json", "w") as f:
            json.dump(purchases, f, indent=2)
        return jsonify({"message": "Cart saved successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/in_cart")
def view_cart():
    try:
        with open("purchases.json", "r") as f:
            purchases = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        purchases = []

    return render_template("in_cart.html", purchases=purchases)


# The corrected catch-all route
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)

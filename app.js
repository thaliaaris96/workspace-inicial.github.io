const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const port = 5500;

app.use(bodyParser.json());

app.get("/emercado-api/cats/cat.json", (req, res) => {
    let archivo = "./data/emercado-api/cats/cat.json";
    try {
        const catData = fs.readFileSync(archivo, "utf8");
        const catJson = JSON.parse(catData);
        res.json(catJson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener cat.json" });
    }
});

app.get(`/emercado-api/cats_products/:index`, (req, res) => {
    let archivo2 = `./data/emercado-api/cats_products/${req.params.index}.json`;
    try {
        const catData = fs.readFileSync(archivo2, "utf8");
        const catJson = JSON.parse(catData);
        res.json(catJson);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener producto" });
    }
});

app.get(`/emercado-api/products/:index`, (req, res) => {
    let archivo3 = `./data/emercado-api/products/${[req.params.index]}.json`;
    try {
        const catData = fs.readFileSync(archivo3, "utf8");
        const catJson = JSON.parse(catData);
        res.json(catJson);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener producto" });
    }
});

app.get(`/emercado-api/products_comments/:index`, (req, res) => {
    let archivo4 = `./data/emercado-api/products/${[req.params.index]}.json`;
    try {
        const catData = fs.readFileSync(archivo4, "utf8");
        const catJson = JSON.parse(catData);
        res.json(catJson);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener producto" });
    }
});

app.get("/emercado-api/sell/publish.json", (req, res) => {
    let archivo5 = "./data/emercado-api/sell/publish.json";
    try {
        const catData = fs.readFileSync(archivo5, "utf8");
        const catJson = JSON.parse(catData);
        res.json(catJson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener publish.json" });
    }
});

app.get("/emercado-api/user_cart/25801.json", (req, res) => {
    let archivo6 = "./data/emercado-api/user_cart/25081.json";
    try {
        const catData = fs.readFileSync(archivo6, "utf8");
        const catJson = JSON.parse(catData);
        res.json(catJson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener 25081.json" });
    }
});

/* */

let usuarios = new Array();
usuarios = [
    {
        id: 1,
        nombreUsuario: "Juan",
        contraUsuario: "Contra987"
    },
    {
        id: 2,
        nombreUsuario: "Pancho",
        contraUsuario: "SupahPass257"
    }
];

app.post("/login", function(req,res) {
    let TheUsuarios = usuarios.find(usu => usu.nombreUsuario === nombreUsuario && usu.contraUsuario === contraUsuario);
});

app.listen(port, function() {
    console.log(`Servidor se esta escuchando en el puerto ${port}`);
})
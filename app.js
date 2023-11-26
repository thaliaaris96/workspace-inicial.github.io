const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
/**/

const app = express();
const port = 3000;

app.use(cors());
app.use(cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));
app.options('/login', cors());

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
        nombreUsuario: "admin@prueba.com",
        contraUsuario: "admin"
    },
    {
        id: 2,
        nombreUsuario: "Pancho@prueba.com",
        contraUsuario: "SupahPass257"
    }
];

app.use(bodyParser.json());

// Endpoint para autenticación y generación de token
app.post('/login', (req, res) => {
  const { nombreUsuario, contraUsuario } = req.body;

  // Buscar al usuario en el array
  const usuario = usuarios.find(
    (u) => u.nombreUsuario === nombreUsuario && u.contraUsuario === contraUsuario
  );

  // Verificar si el usuario existe y la contraseña es correcta
  if (usuario) {
    // Generar token usando jsonwebtoken
    const token = jwt.sign({ nombreUsuario }, 'secreto'); // Aquí debes usar una clave secreta más segura en un entorno de producción

    // Devolver el token como respuesta
    res.json({ token });
  } else {
    // Si la autenticación falla, devolver un error
    res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
  }
});

app.use('/cart', (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secreto');
        console.log(decoded);
        next();
    }
    catch (error) {
        res.status(401).json({ message: "No autorizado"})
    }
});

const mariadb = require('mariadb');
const pool = mariadb.createPool({host: "localhost", user: "root", password: "1234", database: "proyecto", connectionLimit: 10});

app.post('/cart', async (req, res) => {
    try
    {
        const con = await pool.getConnection();
        const cartItems = req.body;
        console.log(cartItems);
        for(const item of cartItems)
        {
            await con.query('INSERT INTO carrito (id, name, unitCost, currency, image, count) VALUES (?, ?, ?, ?, ?, ?)', [item.id, item.name, item.unitCost, item.currency, item.image, item.count]);
        }

        con.release();
        res.status(200).json({ message: 'Carrito actualizado con exito'});
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el carrito'});
    }
});

app.listen(port, function() {
    console.log(`Servidor se esta escuchando en el puerto ${port}`);
});



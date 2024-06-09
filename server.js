const express = require("express");

const path = require("path");

const app = express();
const puerto = 3000;

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Configurar carpeta pública
app.use(express.static(path.join(__dirname, "./src/public")));

//confiar en encabezados de proxy
app.set("trust proxy", true);

//db
const sequelize = require("./src/configuracion/db.js");

sequelize.sync({ logging: false }).then(() => {
  console.log("db conectada!");
});

// Middleware para analizar datos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
const inicioRouter = require("./src/routes/inicio.js");
const adminRouter = require("./src/routes/admin.js");
const clienteRouter = require("./src/routes/cliente.js");
const compraRouter = require("./src/routes/compra.js");

app.use("/", inicioRouter);
app.use("/admin", adminRouter);
app.use("/", clienteRouter); // registro y login
app.use("/compra", compraRouter);

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

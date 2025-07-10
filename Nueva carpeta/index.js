const express = require('express');
const app = express();
const usuarioRutas = require("./routes/usuario.routes");

app.use('/api',usuarioRutas);

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Corriendo en el puerto " + PORT);
});
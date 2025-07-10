const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const md5 = require('md5');

router.use(express.json());

router.get('/', (req, res) => {
  res.json({ mensaje: "Bienvenido a la Api de Gestion de Usuarios" });
});

router.get('/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuario');
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
});

router.get('/usuario/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM usuario WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ mensaje: "Error al obtener usuario" });
  }
});

router.post('/usuario', async (req, res) => {
  const { nombre, correo, edad } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO usuario (nombre, correo, edad) VALUES ($1, $2, $3) RETURNING *",
      [nombre, correo, edad]
    );
    res.status(201).json({ mensaje: result.rows[0] });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ mensaje: "Error al insertar usuario" });
  }
});

router.delete('/usuario/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM usuario WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ mensaje: "Error al eliminar usuario" });
  }
});

router.put('/usuario/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, edad } = req.body;
  try {
    const result = await db.query(
      "UPDATE usuario SET nombre = $1, correo = $2, edad = $3 WHERE id = $4 RETURNING *",
      [nombre, correo, edad, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    } else {
      res.status(200).json({ mensaje: result.rows[0] });
    }
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ mensaje: "Error al actualizar usuario" });
  }
});

module.exports = router;

// routes/cliente.js
module.exports = function (db) {
  const express = require('express');
  const router = express.Router();

  // Obtener todos los clientes
  router.get('/', (req, res) => {
    db.query('SELECT * FROM Cliente', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  // Fragmento 1
  router.get('/fragmento1', (req, res) => {
    db.query('SELECT * FROM Cliente_Fragmento1', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  // Fragmento 2
  router.get('/fragmento2', (req, res) => {
    db.query('SELECT * FROM Cliente_Fragmento2', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  // Obtener cliente por ID
  router.get('/:id', (req, res) => {
    db.query('SELECT * FROM Cliente WHERE ID_Cliente = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    });
  });

  // Crear cliente
  router.post('/', (req, res) => {
    const cliente = req.body;
    db.query('INSERT INTO Cliente SET ?', cliente, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ mensaje: 'Cliente creado' });
    });
  });

  // Actualizar cliente
  router.put('/:id', (req, res) => {
    db.query('UPDATE Cliente SET ? WHERE ID_Cliente = ?', [req.body, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Cliente actualizado' });
    });
  });

  // Eliminar cliente
  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Cliente WHERE ID_Cliente = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Cliente eliminado' });
    });
  });

  return router;
};

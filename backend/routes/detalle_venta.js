const express = require('express');

module.exports = function(db) {
  const router = express.Router();

  router.get('/', (req, res) => {
    db.query('SELECT * FROM Detalle_Venta', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });


// Fragmento 1
  router.get('/fragmento1', (req, res) => {
    db.query('SELECT * FROM Detalle_Venta_Fragmento1', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  // Fragmento 2
  router.get('/fragmento2', (req, res) => {
    db.query('SELECT * FROM Detalle_Venta_Fragmento2', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });


  router.get('/:id', (req, res) => {
    db.query('SELECT * FROM Detalle_Venta WHERE ID_Detalle = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    });
  });

  router.post('/', (req, res) => {
    db.query('INSERT INTO Detalle_Venta SET ?', req.body, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ mensaje: 'Detalle creado' });
    });
  });

  router.put('/:id', (req, res) => {
    db.query('UPDATE Detalle_Venta SET ? WHERE ID_Detalle = ?', [req.body, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Detalle actualizado' });
    });
  });

  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Detalle_Venta WHERE ID_Detalle = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Detalle eliminado' });
    });
  });

  return router;
};

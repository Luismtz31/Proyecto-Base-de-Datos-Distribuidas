module.exports = function(db) {
  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
    db.query('SELECT * FROM Venta', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });


// Fragmento 1
  router.get('/fragmento1', (req, res) => {
    db.query('SELECT * FROM Venta_Fragmento1', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  // Fragmento 2
  router.get('/fragmento2', (req, res) => {
    db.query('SELECT * FROM Venta_Fragmento2', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });



router.get('/:id', (req, res) => {
    db.query('SELECT * FROM Venta WHERE ID_Venta = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    });
  });

  router.post('/', (req, res) => {
    db.query('INSERT INTO Venta SET ?', req.body, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ mensaje: 'Venta creada' });
    });
  });

  router.put('/:id', (req, res) => {
    db.query('UPDATE Venta SET ? WHERE ID_Venta = ?', [req.body, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Venta actualizada' });
    });
  });

  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Venta WHERE ID_Venta = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Venta eliminada' });
    });
  });

  return router;

};

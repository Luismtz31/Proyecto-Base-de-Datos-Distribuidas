module.exports = function(db) {
  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
    db.query('SELECT * FROM Proveedor', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

 router.get('/:id', (req, res) => {
    db.query('SELECT * FROM Proveedor WHERE ID_Proveedor = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    });
  });

  router.post('/', (req, res) => {
    db.query('INSERT INTO Proveedor SET ?', req.body, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ mensaje: 'Proveedor creado' });
    });
  });

  router.put('/:id', (req, res) => {
    db.query('UPDATE Proveedor SET ? WHERE ID_Proveedor = ?', [req.body, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Proveedor actualizado' });
    });
  });

  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Proveedor WHERE ID_Proveedor = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Proveedor eliminado' });
    });
  });

  return router;

};

module.exports = function(db) {
  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
    db.query('SELECT * FROM Empleado', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

router.get('/:id', (req, res) => {
    db.query('SELECT * FROM Empleado WHERE ID_Empleado = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    });
  });

  router.post('/', (req, res) => {
    db.query('INSERT INTO Empleado SET ?', req.body, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ mensaje: 'Empleado creado' });
    });
  });

  router.put('/:id', (req, res) => {
    db.query('UPDATE Empleado SET ? WHERE ID_Empleado = ?', [req.body, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Empleado actualizado' });
    });
  });

  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Empleado WHERE ID_Empleado = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Empleado eliminado' });
    });
  });

  return router;

};

module.exports = function(db) {
  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
    db.query('SELECT * FROM Tarea_Pendiente', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

router.get('/:id', (req, res) => {
    db.query('SELECT * FROM Tarea_Pendiente WHERE ID_Tarea = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    });
  });

  router.post('/', (req, res) => {
    db.query('INSERT INTO Tarea_Pendiente SET ?', req.body, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ mensaje: 'Tarea creada' });
    });
  });

  router.put('/:id', (req, res) => {
    db.query('UPDATE Tarea_Pendiente SET ? WHERE ID_Tarea = ?', [req.body, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Tarea actualizada' });
    });
  });

  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Tarea_Pendiente WHERE ID_Tarea = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Tarea eliminada' });
    });
  });

  return router;

};


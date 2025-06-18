module.exports = function(db) {
  const express = require('express');
  const router = express.Router();

  // Obtener todos los productos
  router.get('/', (req, res) => {
    db.query('SELECT * FROM Producto ', (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error en la consulta' });
      }
      res.json(results);
    });
  });


  // Fragmento 1
  router.get('/fragmento1', (req, res) => {
    db.query('SELECT * FROM Producto_Fragmento1', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  // Fragmento 2
  router.get('/fragmento2', (req, res) => {
    db.query('SELECT * FROM Producto_Fragmento2', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });


router.get('/:id', (req, res) => {
    db.query('SELECT * FROM Producto WHERE ID_Producto = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    });
  });

  router.post('/', (req, res) => {
    db.query('INSERT INTO Producto SET ?', req.body, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ mensaje: 'Producto creado' });
    });
  });

  router.put('/:id', (req, res) => {
    db.query('UPDATE Producto SET ? WHERE ID_Producto = ?', [req.body, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Producto actualizado' });
    });
  });

  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Producto WHERE ID_Producto = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Producto eliminado' });
    });
  });

  return router;

};

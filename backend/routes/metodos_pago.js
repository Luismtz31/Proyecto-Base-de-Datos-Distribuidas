module.exports = function(db) {
  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
    db.query('SELECT * FROM Metodo_Pago', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  return router;
};

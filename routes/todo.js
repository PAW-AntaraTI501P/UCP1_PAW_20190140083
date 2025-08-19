const express = require("express");
const router = express.Router();
const db = require("../db"); // koneksi dari db.js

// GET semua tugas
router.get("/", (req, res) => {
  db.query("SELECT * FROM perpustakaan", (err, results) => {
    if (err) return res.status(500).send("Error mengambil data");
    res.json(results);
  });
});

// GET satu tugas
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM perpustakaan WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).send("Error");
    if (results.length === 0) return res.status(404).send("Nama Buku tidak ditemukan");
    res.json(results[0]);
  });
});

// POST tambah tugas
router.post("/", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).send("Nama Buku tidak boleh kosong");

  db.query("INSERT INTO perpustakaan (Buku) VALUES (?)", [task], (err, result) => {
  if (err) {
    console.error("MySQL Error:", err); // log detail di terminal
    return res.status(500).send(`Error menambah tugas: ${err.sqlMessage || err.message}`);
  }
    res.status(201).json({ id: result.insertId, task });
  });
});

// PUT update tugas
router.put("/:id", (req, res) => {
  const { task } = req.body;
  db.query("UPDATE perpustakaan SET Buku = ? WHERE id = ?", [task, req.params.id], (err, result) => {
    if (err) return res.status(500).send("Error mengupdate");
    if (result.affectedRows === 0) return res.status(404).send("Tugas tidak ditemukan");
    res.json({ id: req.params.id, task });
  });
});

// DELETE hapus tugas
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM perpustakaan WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).send("Error menghapus");
    if (result.affectedRows === 0) return res.status(404).send("Tugas tidak ditemukan");
    res.status(204).send();
  });
});

module.exports = { router };

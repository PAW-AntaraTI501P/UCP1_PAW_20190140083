require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

connection.connect(err => {
  if (err) {
    console.error('Koneksi ke MySQL gagal:', err);
    return;
  }
  console.log('Terhubung ke database MySQL');
});

module.exports = connection;
require('dotenv').config();
const express = require('express');
const app = express();
const { router: todoRoutes } = require('./routes/todo.js'); // hanya router saja
const db = require('./db'); // koneksi mysql

const port = process.env.PORT || 3000;
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use("/todos", todoRoutes);

app.get('/', (req, res) => {
    res.render("index", {
        layout : "layouts/main-layout",
    });
}); 

app.get("/contact", (req, res) => {
    res.render("contact",{
        layout : "layouts/main-layout",
    });
    
});

// Todo dari array lokal
const todoArray = [
    { id: 1, task: "Belajar Express" },
    { id: 2, task: "Mengerjakan Tugas" },
    { id: 3, task: "Ngoding sampai malam" },
];

app.get("/todo-array", (req, res) => {
    res.render("todo-array", {
        layout: "layouts/main-layout",
        todos: todoArray
    });
});

// Render halaman list todos dari DB, bukan array statis
app.get("/todos-list", (req, res) => {
    db.query("SELECT * FROM perpustakaan", (err, results) => {
        if (err) throw err;

        res.render("todos-page", { 
            layout: "layouts/main-layout",
            todos: results
        });
    });
});


app.use((req, res, next) => {
    res.status(404).send('404 - Page Not Found');
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});


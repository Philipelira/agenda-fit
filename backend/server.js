const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados SQLite
const db = new sqlite3.Database('./backend/database.db');

// Criação da tabela
db.run(`
  CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT,
    email TEXT
  )
`);

// Endpoint: cadastrar aluno
app.post('/alunos', (req, res) => {
  const { nome, telefone, email } = req.body;

  db.run(
    'INSERT INTO alunos (nome, telefone, email) VALUES (?, ?, ?)',
    [nome, telefone, email],
    function (err) {
      if (err) {
        return res.status(500).json({ erro: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
});

// Endpoint: listar alunos
app.get('/alunos', (req, res) => {
  db.all('SELECT * FROM alunos', [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

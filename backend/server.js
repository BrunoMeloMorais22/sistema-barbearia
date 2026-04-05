const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/horarios', (req, res) => {
  const { data } = req.query;

  const todos = ["14:00", "15:00", "16:00", "17:00", "18:00"];

  db.query(
    "SELECT horario FROM agendamentos WHERE data = ? AND status = 'agendado'",
    [data],
    (err, result) => {
      if (err) return res.json({ erro: "Erro ao buscar horários" });

      const ocupados = result.map(r => r.horario);

      const livres = todos.filter(h => !ocupados.includes(h));

      res.json(livres);
    }
  );
});

app.post('/agendar', (req, res) => {
  const { nome, telefone, data, horario, servico } = req.body;

  if (!nome || !telefone || !data || !horario || !servico) {
    return res.json({ erro: "Preencha todos os campos" });
  }

  const verifica = `
    SELECT * FROM agendamentos
    WHERE data = ? AND horario = ? AND status = 'agendado'
  `;

  db.query(verifica, [data, horario], (err, result) => {
    if (result.length > 0) {
      return res.json({ erro: 'Horário já ocupado' });
    }

    const insert = `
      INSERT INTO agendamentos
      (nome, telefone, data, horario, servico, status)
      VALUES (?, ?, ?, ?, ?, 'agendado')
    `;

    db.query(insert, [nome, telefone, data, horario, servico], (err) => {
      if (err) {
        console.log("ERRO MYSQL:", err);
        return res.json({ erro: "Erro ao inserir dados" });
    }
      res.json({ sucesso: 'Agendamento realizado!' });
    });
  });
});

app.get('/agendamentos', (req, res) => {
  const { data } = req.query;

  db.query(
    "SELECT * FROM agendamentos WHERE data = ?",
    [data],
    (err, result) => {
      if (err) return res.json({ erro: "Erro ao selecionar" });

      res.json(result);
    }
  );
});


app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000 🚀');
});
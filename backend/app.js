require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const db = require('./db');
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json('API Funcionando!');
});

app.get('/tarefas', async (req, res) => {
    const results = await db.selectTasks();
    return res.json(results);
});

app.post('/tarefas', async (req, res) => {
    await db.insertTasks(req.body);
    res.sendStatus(201);
    return;
});

app.put('/tarefas/:id', async (req, res) => {
    await db.updateTasks(req.params.id, req.body);
    res.status(200);
    return;
});

app.delete('/tarefas/:id', async (req, res) => {
    await db.deleteTasks(req.params.id);
    res.sendStatus(203);
    return;
});


app.listen(port);
console.log('API rodando na porta http://localhost:3000');

const mysql = require('mysql2/promise');
const tasks = mysql.createPool(process.env.CONNECTION_STRING);


async function selectTasks() {
    const res = await tasks.query('SELECT id,nome FROM tarefa');
    return res[0];
};

async function insertTasks(tarefa) {
    const sql = 'INSERT INTO tarefa(nome) VALUES(?)';
    const values = [tarefa.nome];
    return await tasks.query(sql, values);
};

async function updateTasks(id,tarefa) {
    const sqlUpdate = 'UPDATE tarefa SET nome=? WHERE id=?';
    const value = [tarefa.nome];
    return await tasks.query(sqlUpdate, value);
};

async function deleteTasks(id) {
    return await tasks.query('DELETE FROM tarefa WHERE id=?',[id]);
};

module.exports = {selectTasks, insertTasks, updateTasks, deleteTasks};



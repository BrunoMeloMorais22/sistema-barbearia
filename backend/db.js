const mysql = require('mysql2')


const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "passport",
    database: "sistema_barbearia"
});

connection.connect((err) =>{
    if(err){
        console.error('Erro ao conectar:', err)
        return
    }

    console.log("Conectado ao MySQL")
});

module.exports = connection
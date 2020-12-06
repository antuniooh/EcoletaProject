// importar dependecnia
const sqlite3 = require("sqlite3").verbose()

//criar o objeto para operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

//utilizar o objeto para operações
/*
db.serialize( () => {
    //1. Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //2. Inserir dados na tabela

    const query = `
        INSERT INTO places (
            image, 
            name,
            address,
            address2,
            state,
            city,
            items 
        ) VALUES (?,?,?,?,?,?,?); 
    `

    const values = [
        "data:image/jpeg;base64,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",
        "Colectoria",
        "Antonio Gustavo, SBC",
        "Número 206",
        "São Paulo",
        "São Bernardo do Campo",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    //3. Consultar dados da tabela
    db.all(`SELECT * from places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("Aqui estão seus registros")
        console.log(rows)
    })

    //4. Deletar dados 
    db.run('DELETE FROM places WHERE id = ?', [1], function(err){
        if(err){
            return console.log(err)
        }
        console.log("Registro removido com sucesso")
    })
})

*/

module.exports = db
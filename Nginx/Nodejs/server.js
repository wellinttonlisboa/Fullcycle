const express = require('express')
const app = express()
const port = 3000
const host = 'localhost';
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `DELETE FROM people`
connection.query(sql)

const names = ['Wesley Willians', 'ME', 'CONTRATA', 'Wellintton Lisboa', 'wlisboa@outlook.com', '(71) 98291-2827', '...Fiquei fora da area por 10 anos, mas voltei com tudo.. rsrsrs']
names.forEach(function(name) {
    const sql = `INSERT INTO people(name) values ('` + name + `')`
    connection.query(sql)   
})

app.get('/', (req, res) => {
    connection.query('SELECT * FROM people', function(err, rows, fields){
        var body = ``
        if(err) throw err;
        rows.forEach(function(people) {
            body = body + '<li>' + people.name + '</li>'
        })

        res.send(`
        <html>
            <head>       
                <title>Full Cycle</title>        
            </head>        
            <body>
                <h1>Full Cycle</h1>
                <ul>
            `   + body + `
                </ul>
            </body>        
        </html>`)
    })
})

app.listen(port, ()=> {
    console.log(`Running on http://${host}:${port}`)
})

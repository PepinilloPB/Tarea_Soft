//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var tasks = []

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = tasks.length + 1;
    req.body.title = "Tarea " + (tasks.length + 1);
    req.body.detail = "Detalle " + (tasks.length + 1);
    req.body.status = false;
    tasks.push(req.body);
    res.send("OK");
});

app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});

app.put("/tasks/:idtask", (req, res, next) =>{
    var id = req.params.idtask;
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id == id){
            tasks[i].title = "Tarea Editada";
            res.send("OK");
        }
    }
});

app.delete("/tasks/:idtask", (req, res, next) => {
    var id = req.params.idtask;
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id == id){
            tasks.splice(i, 1);
            res.send("OK");
        }
    }
});

app.put("/tasks/:idtask/:status", (req, res, next) =>{
    var id = req.params.idtask;
    var status = req.params.status;
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id == id){
            if(status == "false"){
                tasks[i].status = false;
            }
            if(status == "true"){
                tasks[i].status = true;
            }
            res.send("OK");
        }
    }
});

app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});
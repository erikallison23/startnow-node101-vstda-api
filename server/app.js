const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
//var mock = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// add your code 

var mock = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

app.get('/', (req, res) => {
    res.status(200).json();
})

app.get('/api/TodoItems', (req, res) => {
    res.status(200).json(mock);
});

app.get('/api/TodoItems/:number', (req, res) => {
    for (let i = 0; i < mock.length; i++) {
        if (mock[i].todoItemId == req.params.number) {
            return res.json(mock[i]);
        }
    }
    res.sendStatus(404);
});

app.post('/api/TodoItems/', (req, res) => {
    for (let i = 0; i < mock.length; i++) {
        if (mock[i].todoItemId == req.body.todoItemId) {
            mock[i] = req.body;
            return res.status(201).json(mock[i]);
        }
    }
    mock.push(req.body);
    res.status(201).send(mock[mock.length -1]);
   
});

app.delete('/api/TodoItems/:number', (req, res) => {
    var x = null;
    for (let i = 0; i < mock.length; i++) {
        if (mock[i].todoItemId == req.params.number){
        x = mock[i];
        mock.splice(i,1);
        }
    }
    res.status(200).json(x);
});

module.exports = app;

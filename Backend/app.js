const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000 || process.env.PORT;
const mongoose = require('./database/mongoose');
app.use(express.json());

const Task = require('./database/models/task');
const List = require('./database/models/list');
app.use(cors());
app.use(cors(), (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    res.header('Access-Control-Allow-Headers', 'orgin, X-Requested-With,Content-Type, Accept'); // If needed
    res.header('Access-Control-Allow-Credentials', true); // If needed
    //res.send('cors problem fixed:)');
    next();
});

app.get('/lists', (req, res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error))
})

app.post('/lists', (req, res) => {
    (new List({ 'title': req.body.title }))
    .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error))
});

app.get('/lists/:listId', (req, res) => {
    List.findOne({ _id: req.params.listId })
        .then((list) => res.send(list))
        .catch((error) => console.log(error))
})

app.patch('/lists/:listId', (req, res) => {
    List.findOneAndUpdate({ '_id': req.params.listId }, { $set: req.body })
        .then((list) => res.send(list))
        .catch((error) => console.log(error))
});

app.delete('/lists/:listId', (req, res) => {
    const deleteTasks = (list) => {
        Task.deleteMany({ _listId: list._id })
            .then(() => list)
            .catch((error) => console.log(error))
    }

    const list = List.findByIdAndDelete(req.params.listId)
        .then((list) => res.send(deleteTasks(list)))
        .catch((error) => console.log(error))
    res.status(200)
})

/*http://localhost:3000/lists/:listId/tasks/:taskId */

app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({ _listId: req.params.listId })
        .then((tasks) => res.send(tasks))
        .catch((error) => console.log(error))
})

app.post('/lists/:listId/tasks', (req, res) => {
    (new Task({ '_listId': req.params.listId, 'title': req.body.title }))
    .save()
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({ _listId: req.params.listId, _id: req.params.taskId })
        .then((task) => res.send(task))
        .catch((error) => console.log(error))
})

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({ _listId: req.params.listId, _id: req.params.taskId }, { $set: req.body })
        .then((task) => res.send(task))
        .catch((error) => console.log(error))
})

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({ _listId: req.params.listId, _id: req.params.taskId })
        .then((task) => res.send(task))
        .catch((error) => console.log(error))
})
app.listen(PORT, () => console.log(`server is connected at port ${PORT}`))
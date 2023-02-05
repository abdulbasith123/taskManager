const express = require("express");
var cors = require('cors')

const mongoose = require('./database/mongoose')

const List = require('./database/model/list')
const Task = require('./database/model/task');

const app = express();
app.use(express.json())


app.use(cors({origin:['http://localhost:4200','http://192.168.1.35:8080',' http://127.0.0.1:8080']}))


//requesting list collection
app.get('/lists', (req, res) => {
    
    List.find({})
        .then(lists => res.send(lists))
        .catch(error => console.log(error))
});

//adding new list to
app.post('/lists', (req, res) => {
    (new List({ 'title': req.body.title })).save()
        .then(list => res.send(list))
        .catch(error => console.log(error))
})

//checking a particular list
app.get('/lists/:listId', (req, res) => {
    List.find({ "_id": req.params.listId })
        .then(list => res.send(list))
        .catch(error => console.log(error))
})

//find and update a document
app.patch('/lists/:listId', (req, res) => {
    List.findOneAndUpdate({ "_id": req.params.listId }, { $set: req.body }, { new: true })
        .then(list => res.send(list))
        .catch(error => console.log(error))
})

//find and delete a document
app.delete('/lists/:listId', (req, res) => {
    const deleteTasks = (list) => {
        Task.deleteMany({ _listId: list.id })
            .then(() => list)
            .catch(error => console.log(error));
    }

    const list = List.findByIdAndDelete(req.params.listId)
        .then((list) => res.send(deleteTasks(list)))
        .catch(error => console.log(error));
})

//TASKS

//get tasks
app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({ _listId: req.params.listId })
        .then((tasks) => res.send(tasks))
        .catch(error => console.log(error))
})

//add task
app.post('/lists/:listId/tasks', (req, res) => {
    (new Task({ 'title': req.body.title, _listId: req.params.listId })).save()
        .then((task) => res.send(task))
        .catch(error => console.log(error))
})

//get a task
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({ _listId: req.params.listId, _id: req.params.taskId })
        .then((task) => res.send(task))
        .catch(error => console.log(error))
})

//update a task
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({ _listId: req.params.listId, _id: req.params.taskId }, { $set: req.body }, { new: true })
        .then((task) => res.send(task))
        .catch(error => console.log(error))
})

//delete task
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({ _listId: req.params.listId, _id: req.params.taskId })
        .then((task) => res.send(task))
        .catch(error => console.log(error))
})


//creating server to listen to port
app.listen(3000, () => console.log('Server is connected on port 3000'))
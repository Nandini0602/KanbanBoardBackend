const express = require("express");
const bodyParser = require('body-parser');
const Task = require('./models/task');
//Create a express app with following command
const app = express();
const mongoose = require('mongoose');
const task = require("./models/task");

//express is a chain of middlewares, that we apply to the incoming requests. Each part of the funnel can do something with the request
//It could read it, manipulate it, or do something with response,send response.

// We add that middleware with following
//use function takes 3 arguments
//If you use next function then request will continue it's journey
mongoose.connect('mongodb://localhost:27017/KanbanBoard').
  catch(error => handleError(error));

async function run() {
    try {
            await mongoose.connect('mongodb://localhost:27017/KanbanBoard');
        } catch (error) {
              handleError(error);
            }
}

run();
app.use(bodyParser.json());

app.use((req, res, next)=>{
    //Any domain allowed to access server
    res.setHeader("Access-Control-Allow-Origin","*");
    //Allow types of headers
    res.setHeader("Access-Control-Allow-Headers",'Origin, Content-Type, Accept');
    //allow methods that we want to make accessible
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    next();

});
app.get('/api/tasks',(req, res)=>{
    /*const tasks = [
        {
            task_title: "Frontend",
            task_description: "Create basic Angular Project",
            assignee: "Nandini",
            deadline: '26/05/2022' ,
            status: 'Completed',
            priority: 'High'
        },
        {
            task_title: "Frontend",
            task_description: "Create Component",
            assignee: "Bhushan",
            deadline: '27/05/2022' ,
            status: 'InProgress',
            priority: 'High'
        },
        {
            task_title: "Backend",
            task_description: "Create basic Node Project",
            assignee: "Akash",
            deadline: '30/05/2022' ,
            status: 'ToDo',
            priority: 'Low'
        }
    ]*/
    //res.send("Hello from improved server!");
    Task.find().then(documents => {
        res.status(200).json({
            message: "Task saved successfully",
            tasks: documents
        });
    });
});

app.post('/api/tasks',(req, res)=>{
    //const post = req.body;
    console.log("Inside POST API")
    const task = new Task({
        task_title: req.body.task_title,
        task_description: req.body.task_description,
        assignee: req.body.assignee,
        deadline: req.body.deadline ,
        status: req.body.status,
        priority: req.body.priority
    });
    console.log('*******Task Received', task);
    /*console.log('*******Task Saved', task);
    res.status(201).json({
        message:"Task stored successfully"
    });*/
    task.save().then(createdTask => {
        res.status(201).json({
          message: "Task added successfully",
          taskId: createdTask._id
        });
      });

});
app.put('/api/tasks/:id', (req, res, next)=>{
    const post = new Task({
        _id: req.body.id,
        task_title: req.body.task_title,
        task_description: req.body.task_description,
        assignee: req.body.assignee,
        deadline: req.body.deadline ,
        status: req.body.status,
        priority: req.body.priority
    });
    Task.updateOne({_id: req.params.id}, task).then(result =>{
        console.log(result);
        res.status(200).json({message: "updated successfully"});
    });
});
app.delete('/api/tasks/:id', (req, res)=>{
    Task.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
        res.status(200).json({message: "Task Delete!"});
    });
});

// we want to use this app in server. to do that we need export it
module.exports = app;
const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const app = express();
const mongodb = require('./mongodb/mongodb.connect');

mongodb.connect();

app.use(express.json());

app.use('/todos', todoRoutes);

app.get('/', (req, res)=>{
    res.json('Hello world!');
});

// Comment out line 20 to satisfy
// [A worker process has failed to exit gracefully
// and has been force exited. This is likely caused
// by tests leaking due to improper teardown.
// Try running with --runInBand --detectOpenHandles to find leaks.]
// warning 

// app.listen(3000, ()=>{
//     console.log('Server is now running!');
// });

module.exports = app;
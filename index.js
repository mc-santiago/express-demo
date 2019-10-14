// Tutorial Material by Mosh https://www.youtube.com/watch?v=pKd0Rpw7O48&t=170s

// Express is a web application framework for NodeJS. 
// To install go to npmjs.com
// To see documentation go to expressjs.com 
const express = require('express');
const app = express();
// The port is dinamically assigned by the hosting environment. 
// On mac you can set an environment variable by executing 'export command'
// On windows you should use export port=5000
const port = process.env.port || 3000;

const courses = [
    { id:1, name: 'course1' },
    { id:2, name: 'course2' },
    { id:3, name: 'course3' },
]

// response in browser... Hello World
app.get('/', (req, res) => {
    res.send('Hello World');
}); 

// response in browser... [1,2,3]
app.get('/api/c', (req, res) => {
    res.send([1,2,3]);
})

// renponse in browser for /api/courses/1... 1
app.get('/api/c/:id', (req,res) => {
    res.send(req.params.id);
})

// response in browser... [{"id":1,"name":"course1"},{"id":2,"name":"course2"},{"id":3,"name":"course3"}]
app.get('/api/courses', (req, res) => {
    res.send(courses);
})

// renponse in browser for /api/courses/1... {"id":1,"name":"course1"}
// response in browser for /api/courses/5... The course with the given id was not found.
app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found.'); // 404 Not Found
    res.send(course);
});



app.listen(port, () => console.log(`Listening on port ${port}...`))
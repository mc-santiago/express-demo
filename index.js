// Tutorial Material by Mosh https://www.youtube.com/watch?v=pKd0Rpw7O48&t=170s

// For input validation. Best Practice: Capital J beacuse what is returned from this module is a class (pascal naming convention).
const Joi = require('joi');

// Express is a web application framework for NodeJS. 
// To install go to npmjs.com
// To see documentation go to expressjs.com 
const express = require('express');
const app = express();

// middleware 
app.use(express.json());

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

// response in browser for /api/courses/1... {"id":1,"name":"course1"}
// response in browser for /api/courses/5... The course with the given id was not found.
app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found.'); // 404 Not Found
    res.send(course);
});

// Use PostMan to test this... 
// response in PostMan for http:localhost:3000/api/courses... body... raw... json... {"name": "new course"}
// {"id": 4, "name": "new course"}
app.post('/api/courses', (req, res) => {
    // With Joi we first need to define a schema... this will define the shape of our object. 
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    };

    // Validation without Joi...
    // if (!req.body.name || req.body.name.length < 3) {
    //     res.status(400).send('Name is required and should have a minimum of 3 characters'); // 400 Bad request
    //     return;
    // }
    
    const course = {
        // when working with a database, the id will be automatically asigned.
        id: courses.lenght + 1,
        // we have to read this from the body of the request. always add some sort of validation 
        name: req.body.name 
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // If it does not exist, return 404 - Not Found
    if (!course) res.status(404).send('The course with the given id was not found.'); // 404 Not Found


    // //Validate
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // const result = Joi.validate(req.body, schema);
    // -OR- since this is used in post and put you can make a function so you can reuse it in both like this...
    const result = calidateCourse(req.body);  // result can be replaced with { error } which is the same as result.error
    
    //If not valid, return 400 - Bad Request
    if (result.error) {                       // if { error } is used above, you can replace result.error with just error
        res.status(400).send(result.error.details[0].message);
        return;
    };

    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);
});


function validateCourse(course) {
    //Validate
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}



app.listen(port, () => console.log(`Listening on port ${port}...`))
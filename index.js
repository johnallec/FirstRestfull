const express = require("express");
const app = express();
const quotesPOTC = require('./my_modules/quotesPOTC');

app.use(express.json());

function GenericObject(id,name){
    this.id=id;
    this.name=name;
}

var courses = [
    new GenericObject(0,"CourseA"),
    new GenericObject(1,"CourseB"),
    new GenericObject(2,"CourseC"),
    new GenericObject(3,"CourseA"),
    new GenericObject(4,"CourseA"),
    new GenericObject(5,"CourseC"),
    new GenericObject(6,"CourseC"),
    new GenericObject(7,"CourseB")
]

app.get("/", (req,res) =>{
    res.send("Hi there!");
})

app.get("/api/courses/all", (req,res) =>{
    res.send(courses);
})

app.get("/api/courses/:courseName", (req,res) => {
    try{
        if(courses.find(c => c.name == req.params.courseName)) {
            let foundCourses = [];
            for(let i = 0; i < courses.length; ++i)
                if(courses[i].name == req.params.courseName)
                    foundCourses.push(courses[i]);
            res.send(foundCourses);
        }
        else res.send("No course found");
    }
    catch(err){
        res.send("Follow this sintax /api/courses/typeAName");
    }
})

app.get("/api/courses/", (req,res) => {
    try{
        res.send(courses[parseInt(req.query.id)]);
    }
    catch(err){
        res.send("Follow this sintax /api/courses?id=typeAnId");
    }
})

// QUOTES API
app.get("/api/quotes/:id", (req,res) => {
    try{
        res.send(quotesPOTC.getQuote(parseInt(req.params.id)-1));
    }
    catch(err){
        console.log(err);
        res.send("Follow this sintax /api/quotes?id=typeAnId");
    }
})

app.post("/api/quotes", (req,res) => {
    try{
        quotesPOTC.addQuote(req.body.quote);
        res.send(quotesPOTC.getLastQuote());
    }
    catch(err){
        console.log(err);
        res.send("Check the documentation!");
    }
})

app.listen(3000, () => console.log("Listening on port 3000..."));
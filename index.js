const express = require("express");
const app = express();

function GenericObject(id,name){
    this.id=id;
    this.name=name;
}

var courses = [
    new GenericObject(0,"a"),
    new GenericObject(1,"b"),
    new GenericObject(2,"c")
]

app.get("/", (req,res) =>{
    res.send("Hi there!");
})

app.get("/api/courses/all", (req,res) =>{
    res.send(courses);
})

app.get("/api/courses/", (req,res) => {
    try{
        res.send(courses[parseInt(req.query.id)].name);
    }
    catch(err){
        res.send("Follow this sintax /api/courses?id=typeAnId");
    }
})

app.listen(3000, () => console.log("Listening on port 3000..."));
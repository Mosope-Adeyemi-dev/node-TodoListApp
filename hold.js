const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));

var items = ["Drink water","call jake","bathe the dogs"];
var item = "";



app.get("/", (req, res) => {
    var today = new Date();
    var currentDay = today.getDay(); //output 0 - 6

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    }

    var day = today.toLocaleDateString("en-US", options)

    res.render('list.ejs', {dayOfWeek: day, newItems: items});
 
})

app.post("/", (req, res) => {
    item = req.body.inpt;
    items.push(item);
    res.redirect("/");
})

app.use((err,req,res,next)=>{
    res.status(500)
    res.send('500 - server error')
})

app.use((req,res)=>{
    res.status(404);
    res.send("404 - not found")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server is now running on port 3000");
})
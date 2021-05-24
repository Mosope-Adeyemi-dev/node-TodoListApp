const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));

var itemsArray = ["hello", "it me"];
let workArray = [];
var item = "";

app.get("/", (req, res) => {
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    }
    let date = new Date().toLocaleDateString("en-US", options)

    res.render("list", {
        listType: date,
        items: itemsArray
    });
});

app.post("/", (req, res) => {
    if (req.body.submit === "work") {
        let workItem = req.body.inpt;
        workArray.push(workItem)

        res.redirect("/work");
    } else {
        item = req.body.inpt;
        itemsArray.push(item);

        res.redirect("/");
    }


})

app.get("/work", (req, res) => {
    res.render("list", {
        listType: "work list",
        items: workArray
    });
})

// app.post("/work", (req, res)=>{

//     let workItem = req.body.inpt;
//     workArray.push(workItem)

//     app.redirect("/work");
// })

app.use((req, res) => {
    res.status(404);
    res.send("404 - oh uh, Not Found");
})

// app.use((err, req, res, next)=>{
//     res.status(500);
//     res.send("500 - oh uh, Server Error");

// })

app.listen(process.env.PORT || 3000, () => {
    console.log("server is online");
})
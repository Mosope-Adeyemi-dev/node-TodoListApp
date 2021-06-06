const express = require('express');
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const _ = require('lodash');
const app = express();

mongoose.set('useFindAndModify', false);

// mongoose.connect("mongodb://localhost:27017/TodoDB", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// })
mongoose.connect("mongodb+srv://admin-dev:test123@cluster0.71tzy.mongodb.net/TodoDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));


let workArray = [];


//work schema
const itemSchema = new mongoose.Schema({
    name: String
});

//model
const Item = mongoose.model("item", itemSchema);

const item1 = new Item({
    name: "Welcome to your todo list"
});
const item2 = new Item({
    name: "Hit + button to add new item"
});
const item3 = new Item({
    name: "Hit this to delete"
});
const defaultItems = [item1, item2, item3];


app.get("/", (req, res) => {

    Item.find({}, function (err, data) {
            
        if (data.length === 0) {
            Item.insertMany(defaultItems, function (err){
                if (err) {
                    console.log(err)
                } else {
                    console.log("inserted deafault succesfully");
                }
            });
            res.redirect('/');
        }
        else {
            console.log("show default list");
            res.render("list", {listType:"Today",items: data});
        }
        if(err){
             console.log(err);
        }
       
    });
});

app.post("/", (req, res) => {
      const itemName = req.body.inpt;
      const listName = req.body.submit;
        
        const item = new Item ({
            name: itemName
        }); 
        if(listName === "Today"){
        item.save(function (err){
            console.log("added to default list");
            if(err){console.log(err);}
        });
        res.redirect('/'); 
      } else{
          List.findOne({name: listName}, function(err, data){
              data.item.push(item);
              data.save();
              res.redirect("/"+listName);
          });
      }   
});



app.post("/delete", (req, res)=>{
    const checkedItemID = req.body.checkbox;
    const listName = req.body.hiddenListName;
    console.log(listName);

    
    if( listName === "Today"){
        Item.findByIdAndRemove({_id: checkedItemID}, function(err){
        if(!err){
            console.log("succesfuly deleted from default list");
            res.redirect("/");
         }

        }); 
    } 
    else {
        List.findOneAndUpdate({name: listName}, {$pull: {item: {_id: checkedItemID}}}, (err, data)=>{
          if(!err){
              console.log("deleted from custom list"); 
              res.redirect("/"+listName);
          } 
          if(err){
              console.log(err);
          }     
        });
        
    }
    
});


const newListSchema = new mongoose.Schema({
    name: String,
    item: [itemSchema]
});

const List = mongoose.model("List", newListSchema);


app.get("/:newCustomListName", (req ,res)=>{
    const customListName = _.capitalize(req.params.newCustomListName);
    List.findOne({name: customListName}, (err, data)=>{
        if(!err){
            if(!data){
                const list = new List({
                    name: customListName,
                    item: defaultItems
                });
                list.save();
                res.redirect("/"+customListName);
            }else {
                res.render("list", {listType: data.name, items: data.item })  
            } 
        }
        
    });
})

app.use((req, res) => {
    res.status(404);
    res.send("404 - oh uh, Not Found");
});

app.use((err, req, res, next)=>{
console.log(err)
    res.status(500);
    res.send("500 - oh uh, Server Error");

})

app.listen(process.env.PORT || 3000, () => {
    console.log("server is online");
})
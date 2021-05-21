const express = require('express')
const app = express();

app.get("/", (req, res)=>{
    console.log(res.statusCode);
    res.send("welcome home!!")
})

app.listen(process.env.PORT || 3000, ()=>{
console.log("server is now running on port 3000");
})
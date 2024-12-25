const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require('method-override');
const ExpressError = require("./ExpressError.js");

app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
express.json();

main().then(()=>{
    console.log("Connection Successful !");
}).catch((err)=>{
    console.log(err);
});



async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


//DEFINING ERROR HANDLING MIDDLEWARE
app.use((err,req,res,next)=>{
    let {statusCode = 500, message ="Some Error"} = err;
    res.status(statusCode).send(message);
  
    })
    
// let chat1 = new Chat({
//     from : "Neha",
//     to : "Priya",
//     msg : "Send me your exam sheets.",
//     created_at : new Date(),
// })
// chat1.save().then((res)=>{
//     console.log(res);
// }
// ).catch((err)=>{
//     console.log(err);
// })

//INDEX route to show all chats
app.get("/chats",async(req,res)=>{
    try{
        let chats = await Chat.find();
    res.render("showAllChats.ejs",{chats});
    }catch(err){
       res.status(statusCode).send(message);
    }
})

//NEW form
app.get("/chats/new", (req,res)=>{
   // throw new ExpressError(404,"Page not found!");
        res.render("newForm.ejs");
});    

//INSERT chat
app.post("/chats",async(req,res,next)=>{
    try{
        let {from,to,msg}=req.body;
    let newChat = await new Chat({from:from,
        to:to,
        msg:msg,
        created_at : new Date()
    })
    await newChat.save();
    res.redirect("/chats");
    }catch(err){
        next(err);
    }
})

//EDIT route
app.get("/chats/edit/:_id",async(req,res,next)=>{
   try{
    let {_id } = req.params;
    let chat = await Chat.findOne({_id:_id});
    // if(!chat){
    //     next(new ExpressError(404,"Chat not found"));
    // }
    res.render("editChat.ejs",{chat});
    // console.log(chat);
    
   }catch(err){
    next(err);
   }
});

//UPDATE route
app.put("/chats/:_id/",async(req,res)=>{
    let {_id}=req.params;
    let {from,to,msg}=req.body;
    console.log(_id);
    await Chat.updateOne({_id:_id},{from:from});
    await Chat.updateOne({_id:_id},{to:to});
    await Chat.updateOne({_id:_id},{msg:msg});
    res.redirect("/chats");
})


//DELETE route
app.delete("/chats/:_id",async(req,res)=>{
    let {_id } = req.params;
    await Chat.findByIdAndDelete(_id);
    res.redirect("/chats");
})



app.listen(port,()=>{
    console.log(`SERVER IS LISTENING ON PORT ${port}`);
})
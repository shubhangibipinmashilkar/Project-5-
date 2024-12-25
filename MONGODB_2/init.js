const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
     
}
let allChats = [{
    from: "rohit",
    to:"mohit",
    msg:"teach me JS callbacks",
    created_at: new Date(),
},
{
    from: "jai",
    to:"raj",
    msg:"please share exam TT",
    created_at: new Date(),
},
{
    from: "shraddha",
    to:"shreya",
    msg:"i will teach you mongoDB",
    created_at: new Date(),
},
{
    from: "riya",
    to:"manas",
    msg:"Hi..will meet you tommorrow",
    created_at: new Date(),
},

];

Chat.insertMany(allChats);
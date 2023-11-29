const express = require("express");
const connectDb = require("./db")
var signinRouter = require("./routes/signin")
const cors = require("cors");

const app = express();
const port = 8010;
app.use(express.json());
app.use(cors({origin:"*"}));
connectDb();

app.get('/', (req, res) =>{
    res.send("Hello World!")
})

app.use("/signin", signinRouter);

app.listen(port,()=>{
    console.log(`Your server connect succsefully in port ${port}`)
});
const express = require("express");
const app = express();
const cors = require("cors")
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json())


// create a user

app.post("/users", async (req,res) =>{
    try{
       const { username,email,phone,website,img } = req.body;
       let myQuery = `INSERT INTO userlist (username,email,phone,website,img) VALUES('${username}','${email}','${phone}','${website}','${img}') RETURNING *`
       const newUser = await pool.query(myQuery);
       res.json(newUser.rows[0])
    } catch(err){
        res.json(err.message)
    }
})

// get all user

app.get("/users",async (req,res)=>{
    try{
        const allUsers = await pool.query("SELECT * FROM userlist");
        res.json(allUsers.rows)
    } catch(err){
        res.json(err.message)
    }
})

// get single user
app.get("/users/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM userlist WHERE user_id = $1" ,[id])
        res.json(user.rows[0])
    } catch (err) {
        res.json(err.message)
    }
})

// update a todo

app.put("/users/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const {username,email,phone,website,img} = req.body;
        // const user = await pool.query(`UPDATE todo SET username,email,phone,website,img= ('${username}','${email}','${phone}','${website}','${img}') WHERE todo_id = $2 RETURNING *`, [username,email,phone,website,img, id])
        const user = await pool.query("UPDATE userlist SET username = $1 , email =$2, phone= $3 , website=$4 , img=$5  WHERE user_id = $6 RETURNING *", [username,email,phone,website,img,id])
        res.json(user.rows[0])
    } catch (err) {
        res.json(err.message)
    }
})

// delete a todo
app.delete("/users/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteUser = await pool.query("DELETE FROM userlist WHERE user_id = $1 RETURNING *",[id])
        res.json(deleteUser)
    } catch (err) {
        console.log(err.message)
    }
})


app.listen(5000,()=>{
    console.log("backend server is running")
})
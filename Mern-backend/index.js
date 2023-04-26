const express = require('express');
const cors = require("cors");
require('./db/config');
const User = require('./db/User');
const todo = require("./db/todo")


const Jwt = require('jsonwebtoken');
const jwtKey = 'Pawanrajput';

const app = express();
app.use(cors());
app.use(express.json());



app.post("/register" ,async(req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    // resp.send(result);
    Jwt.sign({result},jwtKey,{expiresIn: "2h"},(err,token)=>{
        if(err){
         resp.send({result:"something went wrong , please try after sometimes"})
        }
     resp.send({result , auth:token})
 })
})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let result = await User.findOne(req.body).select({ _id: 1, name: 1 });
        if (result) {
            Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "something went wrong , please try after sometimes" })
                }
                resp.send({ result, auth: token })
            })

        }
        else {
            resp.send({ result: "No user found" })
        }
    } else {
        resp.send({ result: "No user found" })
    }

})

app.post("/add-product",  async (req, resp) => {
   try{
    let result = await todo.create(req.body);
    resp.send(result)
}catch(err){
    console.log(err.message)
}
})

app.get("/products", verifyToken, async (req, resp) => {
    try {
        let user_id = req.user_id
        

        let list = await todo.find({ userId: user_id });

        if (list.length > 0) {
            resp.send(list)
        } else {
            resp.send({ result: "No products found" })
        }
    } catch (err) {
        console.log(err.message)
    }
})

app.delete("/product/:id", verifyToken, async (req, resp) => {

    const result = await todo.deleteOne({ _id: req.params.id });
    resp.send(result);

})

app.get("/update/:id", async (req, resp) => {
    
    try {
        let result = await todo.findOne({ _id: req.params.id });
        if (result) {
            resp.send(result);
        } else {

            resp.send({ result: "no record found" })
        }
    } catch (err) {
        console.log(err.message)
    }
});

app.put("/update/:id", verifyToken, async (req, resp) => {
    try{let result = await todo.findOneAndUpdate(
        { _id:req.params.id },
        {
            $set: req.body
        })
    resp.send(result);
}catch(err){
    resp.send(err.message)
}
});



function verifyToken(req, resp, next) {

    let token = req.headers['authorization'];
    

    if (token) {
        // token = token.split('')[1];
        let verification = Jwt.verify(token, jwtKey)
        
        
        if(verification){
            req.user_id = verification.result._id 
            next()
        }else{
            resp.status(401).send({ result: "please provide valid token" })
            
        }
        // if (err) {
        //     console.log("err")
        //     resp.status(401).send({ result: "please provide valid token" })
        // } else {
        //     console.log(valid)
        //     req.user_id = valid.result._id || valid.user._id

        // }



    } else {
        resp.status(403).send({ result: "please add token with header" })
    }{}

}


app.listen(5000, () => {
    console.log("port is running on 5000")
})
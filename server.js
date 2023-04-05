const express = require('express');
const path = require ('path');
const database = require ('./database/dbconn');
const kalpaData = require ('./models/kalpalSchema');
const { send } = require('process');


const app = express();
const PORT = process.env.PORT || 2000;

//setting template engine
app.set('view engine', 'ejs');

//setting public path 
const publicPath = path.join(__dirname, 'public')

//middleware
app.use(express.static(publicPath))
app.use(express.urlencoded({extended:false}));

app.get('/',(req, res)=>{
    res.render('index')
})

//sathi seeds page 
app.get('/sathiseeds',(req, res)=>{
    res.render('sathiseeds');
})

//login and signup page 
app.get('/login', (req,res)=>{
    res.render('login');
})

app.get('/signUp', (req, res)=>{
    res.render('signUp');
})


//saving kalpabrikshya user data in database 

//signUp
app.post('/signUp', async (req ,res)=>{
   try {
    const sendData = new kalpaData(req.body);
    if(sendData.password===sendData.confPassword){
        await sendData.save();
        res.render('login');        
    }
    else{
        res.send('Password not match');
    }   
    
   } catch (error) {
    res.status(400).send(`Your form is not submitted ! ${error}`);
    
   }
})

// login

app.post('/login', async (req, res)=>{
    try {
        const userPassword = req.body.password;
        const checkEmail = req.body.email;
        const databaseData = await kalpaData.findOne({email:checkEmail});
        if(databaseData.password===userPassword){
            res.render('index');
        }
        else{
            res.send('password not match')
        }
        
    } catch (error) {
        res.send(`Credintials Not Match sign up first`)
        
    }
})




app.listen(PORT, (req, res)=>{
    console.log(`Server is runnin on port no : ${PORT}`);
})
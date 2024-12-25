const express = require('express');
const app = express();
const port = 3000;
const mongodb = require('mongoose');
const user = require('./models/users');


app.use(express.json());


//mongodb+srv://islamdebbi6:<db_password>@users.2ooqx.mongodb.net/?retryWrites=true&w=majority&appName=users

mongodb.connect("mongodb+srv://islamdebbi6:ifyouwantitcome@users.2ooqx.mongodb.net/?retryWrites=true&w=majority&appName=users").then(()=> {
    console.log('connected to mongodb');
    
}).catch((error) => {
    console.log('error:', error);
});





app.get('/', (req, res) => {
  res.send('hi karim && sabir i want to nal3blk biha');
});

app.get('/test', (req, res) => {
    res.send('test  ....');
  });
app.get('/findsum/:number1/:number2', (req, res) => {
    let num1 = req.params.number1;
    let num2 = req.params.number2;
       res.send('sum is : ' + (Number(num1) + Number(num2)));
    }
);
app.get('/asjson', (req, res) => {
    let name = req.body.name;
    let age = req.query.age;
       res.json({
        name: name,
         age: age
        }
    );
    }
);
app.get('/ashtml', (req, res) => {
    let name = req.body.name;
    let age = req.query.age;
       res.send(`<h1>name: ${name} age: ${age}</h1>`);
    }
);
app.get('/ashtml1', (req, res) => {
   
       res.sendFile(__dirname + '/views/newviews.html');
    }
);
app.get('/ashtml2', (req, res) => {
    let name = req.body.name;
    let age = req.query.age;
    res.render("newviews.ejs",
        {
            name: name,
            age: age
        }
    );
 }
);
app.get('/helloname', (req, res) => {
    let name = req.body.name;
    let age = req.query.age;
    res.send(`hello ${name} your age is ${age}`);
  }
);
       
app.post('/addComment', (req, res) => {
    res.send(' post request to add comment ....');
  }
);
app.delete('/testingdelete', (req, res) => {
    res.send(' delete ....');
  }
);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  

// i connect the server by nodemon app.js
// i will use postman to test the api




app.post('/users',async (req, res) => { 
    const {name, age, email, password } = req.body;
    const newUser = new user({
         name : name,
         age : age,
         email : email,
        password : password
    });
    console.log('newUser:', newUser);
    await newUser.save();
    res.send('user added successfully');
});  

app.get('/users', async (req, res) => {
    
    const users = await user.find();
    console.log('users:', users);
    res.json(users);

});

app.get('/users/:userid', async (req, res) => {
    const id = req.params.userid;
    try {
        const users = await user.findById(id);
        res.json(users);
    } catch (error) {
        res.send('user not found'+error);
        console.log('error:', error);
    }
    
});
app.delete('/users/:userid', async (req, res) => {
    const id = req.params.userid;
    try {
        const users = await user.findByIdAndDelete(id);
        res.send('user deleted successfully');
    } catch (error) {
        res.send('user not found'+error);
        console.log('error:', error);
    }
    
});
const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
 
const app = express();

const MongoConnect=require('./util/database').MongoConnect;

app.set('view engine', 'ejs');

app.set('views', 'views'); 

const User=require('./models/user');

// const product=require('./models/product');

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    User.findbyId("60073a0e95f985c17adffe22").then(user=>{
        req.user=new User(user.name,user.emailid,user.cart,user._id);
        next();

    }).catch(err=>{console.log(err)})
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

MongoConnect(()=>{
    app.listen(3000);
    
})



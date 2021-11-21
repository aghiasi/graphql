//3d part moduls
const express= require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
//components
const router = require('./router/baseRoutes');
//app middlewares
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
//routing
app.use(router);
//app starting
const uri ='mongodb+srv://ghiasi:meymitmad@cluster0.uifob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then( (result) => {
app.listen(4000,() => {
console.log('server is up');//server will run after the database connected 
});
});
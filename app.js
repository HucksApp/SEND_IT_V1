// dependencies
  const express = require('express');
  var router = require('./router/router');
  const googlePassport = require('./config/auth');
  const passport=require('passport');
  const cookieSession= require('cookie-session');
  const key =require('./keys/keys');
  const mongoose= require('mongoose');



//app.....
  var app = express();


//connect to database

mongoose.connect(key.db.dbString,{useNewUrlParser:true}).then(()=>{
  console.log('now connected to the data base');
}).catch((err)=>{console.log(err); return})


mongoose.promise= global.promise;
//middlewares

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
  name:'user_section',
  maxAge:60 *60*1000,
  keys:[key.session.cookieKey]
}))

  app.set('view engine', 'ejs');
  app.use(router);
  app.use(express.static('public'));






  app.listen(process.env.PORT || 3000, ()=>{
  console.log("hucksapp listening on port 3000!!")
});

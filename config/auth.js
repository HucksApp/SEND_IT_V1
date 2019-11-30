const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../keys/keys');
const userModel=require('./db/dbModel');

//set up post cookie script
passport.serializeUser((user, done)=>{
    done(null,user.id);
});

// set pull cookie script
passport.deserializeUser((id, done)=>{
  userModel.findById(id).then((user)=>{
  done(null, user);
  })

});

passport.use( new GoogleStrategy({

            callbackURL:'http://blooming-waters-53900.herokuapp.com'+'/andela/google/redirect',
            clientID:  keys.googleKeys.googleClientID,
            clientSecret:keys.googleKeys.googleClientSecret,
            proxy:true


  }, (acessToken, refreshToken, profile, done )=>{
    console.log(profile);
    //handle profile  data to check user or register user

      userModel.googleUserModel.findOne({id:profile.id})
              .then((googleUser)=>{
                if(googleUser){
                  console.log('a registered google user');
                   done(null,googleUser) ;
                }else{
                let googleUserReg= new userModel.googleUserModel(profile)
                .save().then(result=>console.log(result,"saved"))
                .catch((err)=>{console.log('there was error with the google user',err)});
                done(null, profile);
                }
              })

}));

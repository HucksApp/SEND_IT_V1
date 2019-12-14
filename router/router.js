const router = require('express').Router();
const bodyParser= require('body-parser');
const passport = require('passport');
const userModel = require('../config/db/dbModel');
const fs = require('fs');
const keys = require('../keys/keys');



//obj
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser= bodyParser.json();



// router eng
function index(req, res){
if(req.session.populated){
  res.render('index',{validUser:true})
}else{
  res.render('index', {validUser:false})
}
};
function store(req,res){res.render('store')};
function sign(req,res){res.render('sign', {data:req.query.data||''})};



function account(req,res){
   if(req.session.username){
      userModel.userModel.findOne({username:req.session.username})
            .then((user)=>{
            res.render('account',{user:user})

              }
            ).catch(err=>console.log(err))
    } else if(req.session.passport){
      userModel.googleUserModel.findOne({id:req.session.passport.user})
            .then((user)=>{
            res.render('account',{user:user})


            }).catch(err=>console.log(err))
    }else if(req.session.email){
      userModel.userModel.findOne({email:req.session.email})
            .then((user)=>{
            res.render('account',{user:user})

              }
            ).catch(err=>console.log(err))
    }else{
    res.status(301).redirect('sign?data=please sign up');
  }

};

function profile(req, res){
  if(req.session.username){
    userModel.userModel.findOne({username:req.session.username})
          .then((user)=>{
          res.render('profile',{user:user})

            }
          ).catch(err=>console.log(err))
  } else if(req.session.passport){
    userModel.googleUserModel.findOne({id:req.session.passport.user})
          .then((user)=>{
          res.render('profile',{user:user})


          }).catch(err=>console.log(err))
  }else if(req.session.email){
    userModel.userModel.findOne({email:req.session.email})
          .then((user)=>{
          res.render('profile',{user:user})

            }
          ).catch(err=>console.log(err))
  } else{
    let data="you are not a registered user, please sign up first";
  res.status(301).redirect('sign?data='+data+'& valid=none');
  };

};



function newprofile(req, res){
  userModel.userModel.findOne({email:req.body.email}).then((user)=>{
        if(user && (user.password==req.body.password || user.phoneno==req.body.phoneno)){
          let data= 'pls sign in!, You have an account with us'
          res.status(300).redirect('sign?data='+data)
    }else if(user){
      let data= 'pls sign in!,the email is registered'
      res.status(300).redirect('sign?data='+data)      
      
    }else{
      const newUser = new userModel.userModel(req.body);
  newUser.save().then((user)=>{
  req.session={username:req.body.username};
  res.render('account',{user:user});
}).catch(err=>console.log(err))
    };
  }).catch((err)=> {console.log(err);return });
};


function oldprofile(req, res){
  //credential needs to be checked before determing response of profile
  userModel.userModel.findOne({email:req.body.email2}).then((user)=>{
    if(user&& user.password==req.body.password2){
      req.session={email:req.body.email2};
      res.render('account',{user:user});
    }else{
      let data='Invalid User, Please check password or sign up first!!!!'
      res.status(300).redirect('sign?data='+data);
  }}).catch((err)=>{console.log(err); return});

};


function check_order_out(req,res){
  if(req.session.username){
    userModel.userModel.findOne({username:req.session.username})
            .then(
              (user)=>{
            let count =user.order.length+1;

              let newOrder =

                  {
                  order:req.body.order,
                  delivery:false,
                  count:count,
                  destination:req.body.locationd,
                  recipientno:parseInt(req.body.phoneno),
                  recipientname:req.body.recipientname,
                  pickup:req.body.pickupaddress

                };
              let  subdocu=user.order;


            subdocu.push(newOrder);
            user.save().then(()=>{console.log('saved')});
              })
            .catch(err=>console.log(err));
  }else if(req.session.passport){
    userModel.googleUserModel.findOne({id:req.session.passport.user})
            .then((user)=>{
            let count =user.order.length + 1;

            let newOrder =
            {
            order:req.body.order,
            delivery:false,
            count:count,
            location:req.body.locationd,
            recipientno:parseInt(req.body.phoneno),
            recipientname:req.body.recipientname,
            pickup:req.body.pickupaddress

          };
            let  subdoc=user.order;


          subdoc.push(newOrder);
          user.save();
            }
          )
            .catch(err=>console.log(err));

  }else if(req.session.email){
    userModel.userModel.findOne({email:req.session.email})
            .then((user)=>{
            let count =user.order.length+1;

            let newOrder =

            {
            order:req.body.order,
            delivery:false,
            count:count,
            destination:req.body.locationd,
            recipientno:parseInt(req.body.phoneno),
            recipientname:req.body.recipientname,
            pickup:req.body.pickupaddress

          };
            let  subdoc=user.order;


          subdoc.push(newOrder);
          user.save();
            }
          )
            .catch(err=>console.log(err));

  } else{
    res.redirect('sign?data=please sign up');
  }
};


function getorders(req, res){
  if(request.session.username){
    userModel.userModel.findOne({username:req.session.username})
            .then(
              (result)=>{
                res.render('checkout',{order:result.order})

            }).catch(err=>console.log(err));
  }else if(req.session.passport){
    userModel.googleUserModel.findOne({id:req.session.passport.user})
            .then(
              (result)=>{
                res.render('checkout',{order:result.order})

            }).catch(err=>console.log(err));

  }else if(request.session.email){
    userModel.userModel.findOne({email:req.session.email})
            .then(
              (result)=>{
                res.render('checkout',{order:result.order})

            }).catch(err=>console.log(err));

  }  else{ return;

  }
};


function deleteorder(req, res){
  let delOrd= parseInt(req.params.del);
  if(req.session.username){
    userModel.userModel.findOne({username:req.session.username})
            .then((user)=>{
      user.order.forEach((ord)=>{
        if(ord.count==delOrd){
          let delPosition=user.order.indexOf(ord);
          user.order.splice(delPosition,1);
          user.save();

        }
      })
          })
            .catch(err=>console.log(err));
  }else if(req.session.passport){
    userModel.googleUserModel.findOne({id:req.session.passport.user})
    .then((user)=>{


      user.order.forEach((ord)=>{
        if(ord.count==delOrd){
          let delPosition=user.order.indexOf(ord);
          user.order.splice(delPosition,1);
          user.save();

        }
      })
  })
            .catch(err=>console.log(err));

  } else if(req.session.email){
    userModel.userModel.findOne({email:req.session.email})
    .then((user)=>{

      user.order.forEach((ord)=>{
        if(ord.count==delOrd){
          let delPosition=user.order.indexOf(ord);
          user.order.splice(delPosition,1);
          user.save();

        }
      })
  })
            .catch(err=>console.log(err));

  }
};
function change_address(req, res){
  if(req.session.username){
    userModel.userModel.findOne({username:req.session.username})
            .then((user)=>{
              user.order[parseInt(req.query.count-1)].pickup=req.query.address;
              user.save()
            }
          )
            .catch(err=>console.log(err));
  }else if(req.session.passport){
    userModel.googleUserModel.findOne({id:req.session.passport.user})
            .then((user)=>{
              user.order[parseInt(req.query.count-1)].pickup=req.query.address;
              user.save()
            }
          )
            .catch(err=>console.log(err));

  }else if(req.session.email){
    userModel.userModel.findOne({email:req.session.email})
            .then((user)=>{
              user.order[parseInt(req.query.count-1)].pickup=req.query.address;
              user.save()
            }
          )
            .catch(err=>console.log(err));

  } else{
    res.redirect('sign?data=please sign up');
  }


};


function adminPage(req, res){

fs.readFile('./keys/admin.json','utf-8',(err, admin)=>{

if (err){throw err;}

  const adminCred= JSON.parse(admin);
    if(adminCred.Admin.email===req.body.email && adminCred.Admin.password.type===req.body.password){

      userModel.userModel.find({})
      .then((andUsers)=>{
        userModel.googleUserModel.find({}).then((gogUsers)=>{
          let andusers=[...andUsers];
          let gogusers=[...gogUsers];
          const allData ={admin:adminCred, andUsers:andusers, gogUsers:gogusers};
          res.render('admin',{allData:allData});
        })

      }).catch( err=>{console.log(err)});

    }else{

    }
})
};



function getAdmin(req, res){

  fs.readFile('./keys/admin.json','utf-8',(err, admin)=>{
    const adminCred= JSON.parse(admin);
  userModel.userModel.find({})
  .then((andUsers)=>{
    userModel.googleUserModel.find({}).then((gogUsers)=>{
      let andusers=[...andUsers];
      let gogusers=[...gogUsers];
      const allData ={admin:adminCred, andUsers:andusers, gogUsers:gogusers};
      res.render('admin',{allData:allData});
    }).catch(err=>console.log(err));

})
})
}




function replaceLocation(req, res){
const locationOrder= req.query.updated.split(" ");
let uIdentification =locationOrder[0].toString();
let uOrdCount=parseInt(locationOrder[1]);
if (uIdentification.indexOf('@')!== -1){
          userModel.userModel.findOne({email:uIdentification}).then(
            (user)=>{
              (user.order[uOrdCount-1]).location = req.body.location;
              user.save();

              res.redirect('back');
            }
          )
          .catch((err)=>{console.log(err)})
}else{
  userModel.googleUserModel.findOne({id:uIdentification}).then(
    (user)=>{
      user.order[uOrdCount-1].location = req.body.location;
        user.save();
        res.redirect('back');
    }
  ).catch(err=>{return})
}
};


function replaceOrderStatus(req, res){
  const orderStatus= req.query.updated.split(" ");
  let uIdentification =orderStatus[0].toString();
  let uOrdCount=parseInt(orderStatus[1]);
  if (uIdentification.indexOf('@')!== -1){
          userModel.userModel.findOne({email:uIdentification}).then(
            (user)=>{
              (user.order[uOrdCount-1]).delivery = parseBool(req.body.status);
              user.save();

              res.redirect('back');
            }
          )
          .catch((err)=>{console.log(err)})
}else{
  userModel.googleUserModel.findOne({id:uIdentification}).then(
    (user)=>{
      (user.order[uOrdCount-1]).delivery = parseBool(req.body.status);
      user.save();

      res.redirect('back');
    }
  ).catch(err=>{console.log(err)})
}

};


//conversts string to Boolean
function parseBool(val){
if('true'== val ){return true}else{return false}
};


function getmap(req, res){
if(req.session.username){
  userModel.userModel.findOne({username:req.session.username})
          .then(
            (user)=>{
            const pickup =  user.order[parseInt(req.query.ord)-1].pickup;
              const currentDlLo =  user.order[parseInt(req.query.ord)-1].location;
              res.render('map',{presentPosition:currentDlLo , pickup:pickup
              });

            })
          }else if(req.session.passport){
            userModel.googleUserModel.findOneAndUpdate({id:req.session.passport.user}, {address:req.query.address})
            .then(
              (user)=>{
            const pickup =  user.order[parseInt(req.query.ord)-1].pickup;
              const currentDlLo =  user.order[parseInt(req.query.ord)-1].location;
                res.render('map',{presentPosition:currentDlLo , pickup:pickup
                });

              })

          }else {  userModel.userModel.findOneAndUpdate({email:req.session.email}, {address:req.query.address})
          .then(
            (user)=>{
          const pickup =  user.order[parseInt(req.query.ord)-1].pickup;
            const currentDlLo =  user.order[parseInt(req.query.ord)-1].location;
              res.render('map',{presentPosition:currentDlLo , pickup:pickup
              });
            })


        }
};

function updateUserInfos(req, res){
  if(req.session.username){
    userModel.userModel.findOne({username:req.session.username})
            .then((user)=>{
               let data = req.body.classVal;     
               const contxt = req.body.contxt;
               validate(data,user,contxt);
              user.save()
            }
          )
            .catch(err=>console.log(err));
  }else if(req.session.passport){
    userModel.googleUserModel.findOne({id:req.session.passport.user})
            .then((user)=>{
              let data = req.body.classVal;     
              const contxt = req.body.contxt;
              validate(data,user,contxt);
              user.save()
            }
          )
            .catch(err=>console.log(err));

  }else if(req.session.email){
    userModel.userModel.findOne({email:req.session.email})
            .then((user)=>{
              let data = req.body.classVal;     
              const contxt = req.body.contxt;
              validate(data,user,contxt);
              user.save();
            }
          )
            .catch(err=>console.log(err));

  }
}


function validate(data,user,contxt){
if(data=='username'){
user.username =contxt;
}else if(data=='password'){
  user.password =contxt;
}else if(data=='phoneno'){
  user.phoneno =parseInt(contxt);
}else if(data =='address'){
  user.address = contxt;
}
};



function logout(req, res){
  console.log(req.session);
  req.session=null;
  //req.logout();
  res.redirect('/?user=user&log=logout');
};



// get requests
router.get('/', index);
router.get('/store', store);
router.get('/account', account);
router.get('/sign', sign);
router.get('/logout', logout);
router.get('/profile', profile);
router.get('/item', getorders);
router.get('/Admin', getAdmin);
router.get('/map', getmap);



//use google to register.....oauth20
router.get('/google', passport.authenticate('google',{scope:['profile']}));
//google redirect handeler

router.get('/andela/google/redirect',passport.authenticate('google'), (req, res)=>{
res.redirect('/account');
});


//post requests
router.post('/newuser',urlencodedParser, newprofile);
router.post('/olduser',urlencodedParser, oldprofile);
router.post('/checkout',jsonParser, check_order_out);
router.post('/Admin',urlencodedParser, adminPage);
router.post('/admin_user_address_update', urlencodedParser, replaceLocation);
router.post('/admin_order_status_update', urlencodedParser, replaceOrderStatus);
router.post('/updateUser',jsonParser, updateUserInfos)

//put request
router.put('/newaddress', change_address);

//delete requests
router.delete('/deleteorder/:del', deleteorder);

module.exports=router;

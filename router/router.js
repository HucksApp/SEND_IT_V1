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
function index(req, res){res.render('index')};
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
            console.log(user.order,'this is user order 1');
          res.render('profile',{user:user})

            }
          ).catch(err=>console.log(err))
  } else if(req.session.passport){
    userModel.googleUserModel.findOne({id:req.session.passport.user})
          .then((user)=>{
            console.log(user.order,'this is user order 1');
          res.render('profile',{user:user})


          }).catch(err=>console.log(err))
  }else if(req.session.email){
    userModel.userModel.findOne({email:req.session.email})
          .then((user)=>{
            console.log(user.order,'this is user order 1');
          res.render('profile',{user:user})

            }
          ).catch(err=>console.log(err))
  } else{
    let data="you are not a registered user, please sign up first";
  res.status(301).redirect('sign?data='+data+'& valid=none');
  };

};



function newprofile(req, res){

  console.log(req.body,'req body end here');
  userModel.userModel.findOne({username:req.body.username}).then((user)=>{
    console.log(user,'result end here');
    if(user && user.password==req.body.password){
      console.log('you are a registered user');
      req.session={username:req.body.username};
      res.render('account',{user:user});
    }else{
      const newUser = new userModel.userModel(req.body);
  newUser.save().then((user)=>{console.log('saved',user );
  req.session={username:req.body.username};
  res.render('account',{user:user});
}).catch(err=>console.log(err))
    };
  }).catch((err)=> {console.log(err);return });

};


function oldprofile(req, res){
  console.log(req.body);
  //credential needs to be checked before determing response of profile
  userModel.userModel.findOne({email:req.body.email2}).then((user)=>{
    console.log(user);
    if(user&& user.password==req.body.password2){
      console.log('welcome user')
      req.session={email:req.body.email2};
      res.render('account',{user:user});
    }else{
      console.log('pls register');
      let data='pls register'
      res.status(300).redirect('sign?data='+data);
  }}).catch((err)=>{console.log(err); return});

};


function check_order_out(req,res){
  console.log(req.body,'this is rq');
  console.log(req.body.order,"this is what you are looking for");
  if(req.session.username){
    userModel.userModel.findOne({username:req.session.username})
            .then(
              (user)=>{
                console.log(req.body);
                console.log(user);

              console.log('this is user .order',user.order);

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
              console.log(req.body);
              console.log(user);

            console.log('this is user .order',user.order);
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
              console.log(req.body);
              console.log(user);

            console.log('this is user .order',user.order);
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
              (result)=>{console.log(result.order);
                res.render('checkout',{order:result.order})



            }).catch(err=>console.log(err));
  }else if(req.session.passport){
    userModel.googleUserModel.findOne({id:req.session.passport.user})
            .then(
              (result)=>{console.log(result.order);
                res.render('checkout',{order:result.order})

            }).catch(err=>console.log(err));

  }else if(request.session.email){
    userModel.userModel.findOne({email:req.session.email})
            .then(
              (result)=>{console.log(result.order);
                res.render('checkout',{order:result.order})

            }).catch(err=>console.log(err));

  }  else{ return;

  }
};


function deleteorder(req, res){
  let delOrd= parseInt(req.params.del);
  if(req.session.username){
    console.log(req.params.del);
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
  console.log(req.query.address);
  if(req.session.username){
    userModel.userModel.findOne({username:req.session.username})
            .then((user)=>{
              user.order[parseInt(req.query.count-1)].pickup=req.query.address;
              user.save()
            }
          )
            .catch(err=>console.log(err));
  }else if(req.session.passport){
    userModel.googleUserModel.findOneAndUpdate({id:req.session.passport.user}, {address:req.query.address})
            .then((user)=>{
              user.order[parseInt(req.query.count-1)].pickup=req.query.address;
              user.save()
            }
          )
            .catch(err=>console.log(err));

  }else if(req.session.email){
    userModel.userModel.findOneAndUpdate({email:req.session.email}, {address:req.query.address})
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

  console.log(JSON.parse(admin));
  console.log(req.body);

  const adminCred= JSON.parse(admin);
  console.log(adminCred.Admin.email,req.body.email );
  console.log(adminCred.Admin.password,req.body.password);
    if(adminCred.Admin.email===req.body.email && adminCred.Admin.password.type===req.body.password){
      console.log('admin here');

      userModel.userModel.find({})
      .then((andUsers)=>{
        userModel.googleUserModel.find({}).then((gogUsers)=>{
          let andusers=[...andUsers];
          let gogusers=[...gogUsers];
          console.log('this is andusers ',Array.isArray(andusers),'this is gogusers',Array.isArray(gogusers))
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
      console.log('this is andusers ',Array.isArray(andusers),'this is gogusers',Array.isArray(gogusers))
      const allData ={admin:adminCred, andUsers:andusers, gogUsers:gogusers};
      res.render('admin',{allData:allData});
    }).catch(err=>console.log(err));

})
})
}




function replaceLocation(req, res){
console.log(req.query);
console.log(req.body);
const locationOrder= req.query.updated.split(" ");
let uIdentification =locationOrder[0].toString();
let uOrdCount=parseInt(locationOrder[1]);
console.log(uIdentification);
console.log(uOrdCount);
if (uIdentification.indexOf('@')!== -1){
          userModel.userModel.findOne({email:uIdentification}).then(
            (user)=>{
              console.log(user);
              (user.order[uOrdCount-1]).location = req.body.location;
              user.save();

              res.redirect('back');
            }
          )
          .catch((err)=>{console.log(err)})
}else{
  userModel.googleUserModel.findOne({id:uIdentification}).then(
    (user)=>{
      console.log(uOrdCount);
      user.order[uOrdCount-1].location = req.body.location;
        user.save();
        res.redirect('back');
    }
  ).catch(err=>{return})
}
};


function replaceOrderStatus(req, res){
  console.log(req.query);
  const orderStatus= req.query.updated.split(" ");
  let uIdentification =orderStatus[0].toString();
  let uOrdCount=parseInt(orderStatus[1]);
  if (uIdentification.indexOf('@')!== -1){
          userModel.userModel.findOne({email:uIdentification}).then(
            (user)=>{
              console.log(req.body.status);
              (user.order[uOrdCount-1]).delivery = parseBool(req.body.status);
              console.log(parseBool(req.body.status))
              user.save();

              res.redirect('back');
            }
          )
          .catch((err)=>{console.log(err)})
}else{
  userModel.googleUserModel.findOne({id:uIdentification}).then(
    (user)=>{
      console.log(req.body.status);
      console.log((user.order[uOrdCount-1]));
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
  console.log('here');
  userModel.userModel.findOne({username:req.session.username})
          .then(
            (user)=>{
            const pickup =  user.order[parseInt(req.query.ord)-1].pickup;
              const currentDlLo =  user.order[parseInt(req.query.ord)-1].location;
          console.log(currentDlLo );
              res.render('map',{presentPosition:currentDlLo , pickup:pickup
              });

            })
          }else if(req.session.passport){
            userModel.googleUserModel.findOneAndUpdate({id:req.session.passport.user}, {address:req.query.address})
            .then(
              (user)=>{
            const pickup =  user.order[parseInt(req.query.ord)-1].pickup;
              const currentDlLo =  user.order[parseInt(req.query.ord)-1].location;
            console.log(currentDlLo );
                res.render('map',{presentPosition:currentDlLo , pickup:pickup
                });

              })

          }else {  userModel.userModel.findOneAndUpdate({email:req.session.email}, {address:req.query.address})
          .then(
            (user)=>{
          const pickup =  user.order[parseInt(req.query.ord)-1].pickup;
            const currentDlLo =  user.order[parseInt(req.query.ord)-1].location;
          console.log(currentDlLo );
              res.render('map',{presentPosition:currentDlLo , pickup:pickup
              });
            })


        }
};





function logout(req, res){
  console.log(req.session);
  req.session=null;
  //req.logout();
  res.redirect('/index?user=user&log=logout');
};



// get requests
router.get('/index', index);
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
  console.log(req.session);
res.redirect('/account');
});


//post requests
router.post('/newuser',urlencodedParser, newprofile);
router.post('/olduser',urlencodedParser, oldprofile);
router.post('/checkout',jsonParser, check_order_out);
router.post('/Admin',urlencodedParser, adminPage);
router.post('/admin_user_address_update', urlencodedParser, replaceLocation);
router.post('/admin_order_status_update', urlencodedParser, replaceOrderStatus);

//put request
router.put('/newaddress', change_address);

//delete requests
router.delete('/deleteorder/:del', deleteorder);

module.exports=router;

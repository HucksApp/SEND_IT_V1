const mongoose = require('mongoose');



const Schema = mongoose.Schema;


var itemSchema = new Schema({

              delivery:{
                type:Boolean,
                default:false
              },
              date:{type:Date,default:Date.now},
              count:Number,
              location:{type:String,default:"ware House"},
              destination:{type:String},
              pickup:{type:String},
              recipientno:{type:Number},
              recipientname:{type:String}

});

let userSchema = new Schema({

        username:{
            type:String,
            required:true
        },
        password:{
              type:String

        },
        phoneno:{
            type:Number
        },
        address:{
            type:String
        },
        email:{
          type:String,
          default:false
        },
          order:[itemSchema]
});



 let googleUserSchema = new Schema({



                id:{
                  type:String
                },
                displayName:{
                  type:String
                },
                _json:{
                  sub:{
                  type:String}
                },
                address:{
                    type:String
                },
                  order:[itemSchema]
 });



 let googleUserModel = mongoose.model('google_user_Sendit', googleUserSchema);



   var userModel =  mongoose.model('Andelappuser_sendit',userSchema);

   //let itemModel=mongoose.model('items_order', itemSchema);


   module.exports={userModel:userModel,googleUserModel:googleUserModel/*,itemModel:itemModel*/}

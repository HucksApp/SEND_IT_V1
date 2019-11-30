//get dom elements

//store data
const form=document.getElementById('order');
const locationi =form.destination;
const pickupaddressi =form.pickupaddress;
const phonenoi =form.phoneno;
const recipient =form.name;



//item engine



function addorder(e){
  e.preventDefault();

  const order ={
      locationd: locationi.value,
      pickupaddress: pickupaddressi.value,
      phoneno:phonenoi.value,
      recipientname:recipient.value
  };

  console.log(order);


fetch('/checkout',{

          method: 'POST',
          headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(order)
}).then((response)=>{
  console.log(response);
})
.then((result)=>console.log(result))
  .catch((err)=>{console.log(err); return;})
  locationi.value="";
  pickupaddressi.value="";
  phonenoi.value="";
  recipient.value="";

document.getElementById('message').textContent="check out orders in basket";

};
/*
//nav toggle
const hov = document.getElementsByClassName('name');
const nav = document.getElementsByClassName('nav');
hov[0].addEventListener('mouseover',()=>{
  console.log('weeeeee');
if(!nav[0].classList.contains('open')){
  nav[0].classList.add('open')
}else{nav[0].classList.remove('open')}
});

//

*/

form.addEventListener('submit',addorder);

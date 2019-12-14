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
.then()
  .catch((err)=>{console.log(err); return;})
  locationi.value="";
  pickupaddressi.value="";
  phonenoi.value="";
  recipient.value="";

document.getElementById('message').textContent="Order Placed!.......check orders to see the list =============>>";

};

form.addEventListener('submit',addorder);

//get dom elements
const counter =document.getElementById('wrapcount');
const items= document.getElementsByClassName('item');
const arrows= document.getElementsByClassName('arrow');
const orderBtn=document.querySelector('.order');




//store data
var count = count || 1;
let cartitems=[];
let checkcount=0;
let eachitem = [...items];
let order={order:cartitems};


//item engine
 function pick(e){
  counter.innerHTML=`<span>ITEMS: </span><span>${count}</span>`;

  count++;

  let cartitem =this.id;
  cartitems.push(cartitem);
  //debug
  console.log(cartitems);
};


function additem(){
fetch('/checkout?data='+cartitems,{

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
location.reload();
};



function nextset(e){
  console.log('clicked me');
  for (i of eachitem){
    var checkcount=checkcount || 0;
    if(!i.classList.contains('other')){
      checkcount = checkcount++;
      console.log(i);
      setTimeout(i.classList.add('other'), 3000);
      i.classList.remove('newset');
      console.log(i.style.display);

    }else if(i.classList.contains('other')){
      setTimeout(i.classList.remove('other'), 3000);
      i.classList.add('newset');
      console.log('clicked me to flex');
    }

  }

};




Array.from(items).forEach((item)=>{
  item.addEventListener('click', pick);
});


Array.from(arrows).forEach((arrow)=>{
  arrow.addEventListener('click', nextset);
});

orderBtn.addEventListener('click',additem);

//dom element
const odels = document.getElementsByClassName('odel');
const ul = document.getElementsByTagName('ul');

//btn eng
function delorder(e){
  this.parentNode.parentNode.removeChild(this.parentNode);


  /*ul[0].innerHTML=`
          <li><article class="order" id="order1">order has been deleted </article></li>
          <li><article class="order" id="order1">you have no registered order</article> </li>
          `;*/

let orderDelString= this.parentNode.classList.value;
  let delOrd = orderDelString.replace(/order /g, "");
  console.log(delOrd);


fetch('/deleteorder/'+delOrd,{

            method:"DELETE",
            headers:{
                "Accept":"text/plain",
                "Content-Type":"text/plain"
            }
}).then(result=>console.log(result))
  .catch(err=>console.log(err));


}
//button controllers

[...odels].forEach((odel)=>{
    odel.addEventListener('click', delorder);
})

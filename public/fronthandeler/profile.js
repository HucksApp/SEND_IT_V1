//dom element
const odels = document.getElementsByClassName('odel');
const ul = document.getElementsByTagName('ul');
const edit =document.getElementsByClassName('edit');
const updatebtn =document.getElementsByClassName('updatei');
var address =  document.querySelector('.shown');
 const addedit =document.getElementsByClassName('addressedit');
var addressupdate =  document.querySelector('.update');
let counti =document.getElementById('count');
//btn eng
function delorder(e){
  this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);


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


};

function showaddressedit(e){
  this.parentNode.lastElementChild.classList.remove('hidden');
  address.classList.add('hidden');
  this.classList.add('hidden');


};


function replaceaddress(e){
  this.parentNode.classList.add('hidden');
  address.classList.remove('hidden');
  this.classList.remove('hidden');
   let newaddress=this.parentNode.firstElementChild.value;
   let count =this.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.textContent
   console.log(count, newaddress);


const http = new XMLHttpRequest();


http.addEventListener('readystatechange',()=>{
  if (http.readyState== 4 && http.status==200){
    console.log(data)
  }
});

http.addEventListener('error',err=>console.log(err));

http.open("PUT","/newaddress?address="+newaddress+"&count="+count,true);
http.send();

location.reload();
};





//button controllers

[...odels].forEach((odel)=>{
    odel.addEventListener('click', delorder);
});

[...edit].forEach((edi)=>{
edi.addEventListener('click', showaddressedit);
});

[...updatebtn].forEach((updatebt)=>{
  updatebt.addEventListener('click', replaceaddress);
});

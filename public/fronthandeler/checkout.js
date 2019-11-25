//get dom elements

 var idelbtn = document.getElementsByClassName('idel');
 var items =  document.querySelectorAll('.item');
 var address =  document.querySelector('.shown');
 var addressupdate =  document.querySelector('.update');
 var edit =document.getElementById('edit');
 var updatebtn =document.getElementById('update');
 var delitms =  document.querySelectorAll('.log');
 const addedit =document.getElementById('addressedit');



// buuton controllers
function delitem(e){
  items.forEach((item)=>{
    this.parentNode.parentNode.removeChild(this.parentNode);

    [...delitms].forEach((delitm)=>{
      console.log('in del item');
      if(e.target==delitm.parentNode.lastChild){
        let name=delitm.textContent;
        console.log(this.parentNode.classList,"heereee");
        let itemFromOrderS= this.parentNode.classList.value;
        let itemFromOrder=itemFromOrderS.replace(/item /g, "").replace('order',"");
        console.log(itemFromOrder,"heereee");

        console.log('item here');
        fetch('/delete?orderClicked='+itemFromOrder+'&item='+name, {

                method:'DELETE',
                headers:{
                  'Accept':'application/json, text/plain',
                  'Content-Type':'application/json'
                }
        }).then(data=>console.log('data,this is the data jare'))
          .catch(err=>console.log(err))
      }
    });


  })
};

function showaddressedit(e){
  addressupdate.classList.remove('hidden');
  address.classList.add('hidden');
  this.classList.add('hidden');


};

function replaceaddress(){
  addressupdate.classList.add('hidden');
  address.classList.remove('hidden');
  edit.classList.remove('hidden');
   let newaddress=addedit.value;


const http = new XMLHttpRequest();


http.addEventListener('readystatechange',()=>{
  if (http.readyState== 4 && http.status==200){
    console.log(data)
  }
});
http.addEventListener('error',err=>console.log(err));

http.open("PUT","/newaddress?address="+newaddress,true);
http.send();

location.reload();
};



 function retrieverOrder(){
  console.log('startinnnnnngggg')
  fetch('/item',{

          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
  })
      .then((response)=>{
        const orderdata=response.json();

      }).then((items)=>{
        console.log(items);
      })

};






// buttons
 Array.from(idelbtn).forEach((btn)=>{
   btn.addEventListener('click', delitem)
 });

 edit.addEventListener('click', showaddressedit);

updatebtn.addEventListener('click', replaceaddress);

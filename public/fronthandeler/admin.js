const btn= document.querySelector('.tog');
const userSheet= document.querySelector('.userInfo');
const addBtn= document.querySelectorAll('.addBtn');
const stBtn= document.querySelectorAll('.stBtn');
const regs = document.getElementsByClassName('rUser');




function togUserSheet(){
if (userSheet.classList.contains('open')){
  userSheet.classList.remove('open');
}else{
  userSheet.classList.add('open');
}

};


function addEdit(){
if(!this.parentNode.nextSibling.nextSibling){
  const toBeUpdated = this.parentNode.classList.value.slice(6);
  console.log(toBeUpdated,'we here');
    this.parentNode.insertAdjacentHTML('afterend',`
                      <div class="rUser toReplace ">
                      <form action="/admin_user_address_update?updated=${toBeUpdated}"   method="post">
                      <textarea class="addArea" name="location">example : 1600 Amphitheatre Parkway, Mountain View, CA</textarea>
                      <button class="btnSub"type="submit" ><img src="icons/icons8-replace-50 2.png"></button>
                      </form>
                      </div>
    `);
}else{


  this.parentNode.parentNode.removeChild(this.parentNode.nextSibling.nextSibling);
}

}


function stEdit(){
if(!this.parentNode.nextSibling.nextSibling){
  const toBeUpdated = this.parentNode.classList.value.slice(6);
  console.log(toBeUpdated);
    this.parentNode.insertAdjacentHTML('afterend',`
                      <div class="rUser">
                      <form action="/admin_order_status_update?updated=${toBeUpdated}" method="post">
                      <select class="status" name="status">
                      <option selected="selected"name="false" value="false">pending</option>
                      <option value="true" name="true">delivered</option>
                      </select>
                      <button class="btnSub2"  type="submit" ><img src="icons/icons8-replace-50 2.png"></button>
                      </form>
                      </div>
    `);
}else{


  this.parentNode.parentNode.removeChild(this.parentNode.nextSibling.nextSibling);
};


};




btn.addEventListener('click',togUserSheet);

[...addBtn].forEach((adbt)=>{
  adbt.addEventListener('click',addEdit);
});

[...stBtn].forEach((stbt)=>{
  stbt.addEventListener('click',stEdit);
});

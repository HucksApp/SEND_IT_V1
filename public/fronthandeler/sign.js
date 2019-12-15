//get the forms
 const signup = document.getElementById('signup');
  const signin = document.getElementById('signin');
  const adminbtn = document.querySelector('.admin');
  const adminFormOut=document.querySelector('#adminForm');




//functions

 function fullsignup(e){
   signin.style.display= "none";
   this.style.width="80%";
 };

 function fullsignin(e){
   signup.style.display= "none";
   this.style.width="80%";
 };


function togAdminform(){
adminFormOut.innerHTML=`

              <form action="/admin" method="post">
                <fieldset>
                  <legend>Admin</legend>
                  <div>
                    <label for="email" row="80">Email</label>
                    <input required type="email" name="email"/>
                  </div>
                  <div>
                    <label for="password">Password</label>
                    <input required type="password" name="password"/>
                  <div>
                  <button class="btn" type="submit">
                    <img name="submit" class="icons_r" src=" icons/icons8-administrative-tools-40.png"/>
                  </button>
                </fieldset>
              </form>
              `;
this.style.display="none";
};


  //toggle user

  signup.addEventListener('click',fullsignup);
  signin.addEventListener('click',fullsignin);
  adminbtn.addEventListener('click',togAdminform);





//get the dom elements needed
var menu = document.querySelector('.top');
var menubar = document.querySelector('#in-nav');
var body = document.querySelector('body');
var barpairs = document.querySelectorAll('#in-nav div');


// to toggle menu bar
menu.addEventListener('click', (e)=>{
  console.log('clicked');
if(!menubar.classList.contains('togmenu')){
  menubar.classList.add('togmenu');
} else {
  menubar.classList.remove('togmenu');

}
});


// to close menubar off focus
body.addEventListener('click',(e)=>{
  if(e.target!==menubar&&e.target!==menu &&menubar.classList.contains('togmenu'))
  {
    menubar.classList.remove('togmenu');
    menubar.classList.add('menuclosed');
  }
});

// nav toggle

//

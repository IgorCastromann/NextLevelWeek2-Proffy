var input = document.querySelectorAll("input");
var input1 = document.querySelector(".name")
var input2 = document.querySelector(".avatar")
var input3 = document.querySelector(".whatsapp")
// var input4 = document.querySelector(".subject")
var input5 = document.querySelector(".cost")




// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks the button, open the modal 
btn.onclick =  function showModal() {
  // let i=0;
   
  // while(i < input.length){
  //   if(input[i].value == ''){
   
   
  //   i++
  // }
  // }
 
    modal.style.display = "block";
  
    setInterval(() => {
      modal.style.display = "none";
    }, 1900);

  
 
}

// When the user clicks on <span> (x), close the modal
// span.onclick = function closeModal() {
//     return modal.style.display = "none";
// }

function closeModal() {
  return modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



// module.exports = {
//   showModal,
//   closeModal
// }
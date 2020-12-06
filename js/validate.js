const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const fnameError = document.querySelector(".fnameError");
const lnameError = document.querySelector(".lnameError");
const emailError = document.querySelector(".emailError");
const subjectError = document.querySelector(".subjectError");
const messageError = document.querySelector(".messageError");
const submit = document.querySelector("#submit");
const formSuccess = document.querySelector(".formSuccess");

function checkValidation(){
    if(fname.value.trim().length < 1){
        fnameError.style.display = "block";
    }else{
        fnameError.style.display = "none";
    }
    if(lname.value.trim().length < 1){
        lnameError.style.display = "block";
    }else{
        lnameError.style.display = "none";
    }
    if(validEmail(email.value) === true){
        emailError.style.display = "none";
    }else{
        emailError.style.display = "block";
    }
    if(subject.value.trim().length < 5){
        subjectError.style.display = "block";
    }else{
        subjectError.style.display = "none";
    }
    if(message.value.trim().length < 25){
        messageError.style.display = "block";
    }else{
        messageError.style.display = "none";
    }
    
};

function validEmail(arg){
    const regEx = /\S+@\S+\.\S+/;
    const valid = regEx.test(arg)
    return valid;
}

function finalCheck() {
    if (
      fnameError.style.display === 'none' &&
      lnameError.style.display === 'none' &&
      emailError.style.display === 'none' &&
      subjectError.style.display === 'none' &&
      messageError.style.display === 'none'
    ) {
      formSuccess.style.display = 'block';
    }
  }

submit.onclick = function () {
    event.preventDefault();
    checkValidation();
    finalCheck();
};

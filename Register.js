const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const form = document.querySelector("form");

function showError(input, message){
    let parent = input.parentElement;
    let small = parent.querySelector("small");
    parent.classList.add("error");
    small.innerText = message;
}
// showError(password, "loi");

function showSuccess(input){
    let parent = input.parentElement;
    let small = parent.querySelector("small");
    parent.classList.remove("error");
    small.innerText = "";
}
function checkEmptyError(listInput){
    let isEmptyError = false;
    for(let i = 0; i < listInput.length; i++)
    {
        let input = listInput[i];
        // console.log(input.value);
        input.value = input.value.trim();
        if(!input.value)
        {
            isEmptyError = true;
            showError(input, "khong duoc de trong ");
        }
        else{
            showSuccess(input);
        }
    }
    return isEmptyError;
}
function checkEmailError(input){
    const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let isEmailError = !regexEmail.test(input.value);
    // console.log(isEmailError);
    // khi email loi thi se return true 
    if(regexEmail.test(input.value)){
        showSuccess(input);

    }
    else{
        showError(input, "Email chua dung dinh dang");
    }
    return isEmailError;
}
function checkLengthError(input, name, min, max){
    input.value = input.value.trim();
    if(input.value.length < min){
        showError(input, `${name} can tren ${min} ky tu `);
        return true;
    }
    if(input.value.length > max)
    {
        showError(input, `${name} khong duoc qua ${max} ky tu `);
        return true ; 
    }
    showSuccess(input);
    return false;
}

function checkMathPassword(passwordInput, cfPasswordInput)
{
    if(passwordInput.value !== cfPasswordInput.value)
    {
        showError(cfPasswordInput, "Không khớp Password");
        return true;
    }
     return false;
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let isEmptyError = checkEmptyError([username, password, confirmPassword, email]);
    let isEmailError = checkEmailError(email);
    let isPasswordLength =  checkLengthError(password, "Password", 6, 25);
    let isUsernameLength = checkLengthError(username, "Username", 6, 25);
    let iscfPasswordError = checkMathPassword(password, confirmPassword)

    if(
        !isEmailError && 
        !isEmptyError && 
        !isPasswordLength && 
        !isUsernameLength && 
        !iscfPasswordError)
    {
const UserData = {
    id: Math.floor(Math.random() * 1000),
    username: username.value,
    email: email.value,
    password: password.value
        };
        localStorage.setItem("userData", JSON.stringify(UserData));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Bạn đã đăng ký thành công !",
            showConfirmButton: false,
            timer: 2000,
          });
          window.location.href = "Login.html"
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Lỗi !!!",
            text: "Mời bạn nhập lại ",
            showConfirmButton: false,
            timer: 2000,
          });
    }
});
const inputUsername = document.querySelector(".input-username");
const inputPassword = document.querySelector(".input-password");
const btnLogin = document.querySelector(".login-admin");
btnLogin.addEventListener("click" , function(e){
    e.preventDefault();
    if(inputUsername.value === "Admin" && inputPassword.value === "123456")
        {
            alert("Đăng Nhập thành công");
            window.location.href= "../Admin.html";
        }
        else
        {
            console.log(flase);
            alert("Đăng nhập thất bại ");
        }
});
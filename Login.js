// validation form login
const inputUsername = document.querySelector(".input-login-username");
const inputPassword = document.querySelector(".input-login-password");
const btnLogin = document.querySelector(".login-signInButton");
// validation form login
btnLogin.addEventListener("click", function(e) {
  e.preventDefault();
  console.log(inputUsername.value);
  if (inputUsername.value === "" || inputPassword.value === "") {
    alert("vui lòng không để trống");
  } else {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (
      user.username === inputUsername.value &&
      user.password === inputPassword.value
    ) {
      alert("Đăng Nhập Thành Công");
      window.location.href = "../TrangChu.html";
    } else {
      alert("Đăng Nhập Thất Bại");
    }
  }
});

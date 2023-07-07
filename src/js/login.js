import { createScrollBtn } from './utils.mjs'

const loginForm = document.getElementById("login-user");
const redirectParam = "src/user/index.html" || "/";

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location = "/user/index.html"

});

createScrollBtn();
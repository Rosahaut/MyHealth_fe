import "../styles/index.css";
import { fetchData } from "./fetch.js";
import { showToast } from "./toast.js";

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
  });

  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");
  const openLoginModal = document.getElementById("openLoginModal");
  const openSignupModal = document.getElementById("openSignupModal");
  const closeButtons = document.querySelectorAll(".close");

  openLoginModal.addEventListener("click", function () {
    loginModal.style.display = "block";
  });

  openSignupModal.addEventListener("click", function () {
    signupModal.style.display = "block";
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      loginModal.style.display = "none";
      signupModal.style.display = "none";
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
    if (event.target == signupModal) {
      signupModal.style.display = "none";
    }
  });

  const loginForm = document.querySelector("#loginModal .modal-content");
  const signupForm = document.querySelector("#signupModal .modal-content");

  loginForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const url = `http://localhost:3000/api/auth/login`;

    const data = {
      username: loginForm.querySelector("input[name=username]").value,
      password: loginForm.querySelector("input[name=password]").value,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetchData(url, options).then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.user.username);
        localStorage.setItem("user_id", data.user.user_id);
        window.location.href = "home.html";
      } else {
        showToast("Unauthorized: username or password incorrect!");
      }
    });
  });

  signupForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const url = `http://localhost:3000/api/users`;

    const data = {
      username: signupForm.querySelector("input[name=username]").value,
      password: signupForm.querySelector("input[name=password]").value,
      email: signupForm.querySelector("input[name=email]").value,
      autoLogin: true,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    
    console.log(options);

    try {
      fetchData(url, options).then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.user.username);
          localStorage.setItem("user_id", data.user.user_id);
          window.location.href = "home.html";
        } else {
          showToast("Failed to create user. Please try again.");
        }
      });
    } catch (error) {
      console.error(error);
      showToast("Failed to create user. Please try again.");
    }
  });
});

import "../styles/main.css";
import "../styles/settings.css";
import { showToast } from "./toast.js";

document.addEventListener("DOMContentLoaded", function () {
  // Toggle menu visibility
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
  });

  // Handle user settings form submission
  const form = document.getElementById("settings-form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      showToast("User ID not found. Please log in again.");
      return;
    }

    const formData = new FormData(form);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    userData["user_id"] = userId;
    if (userData["new-password"] !== userData["confirm-password"]) {
      showToast("New password and confirm password do not match.");
      return;
    }

    try {
      const url = `http://localhost:3000/api/users`; 
      const token = localStorage.getItem("token");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: userData["username"],
          password: userData["new-password"],
          email: userData["email"],
          user_id: userId,
        }),
      };
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update user data");
      }

      form.reset();
      showToast("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      showToast("Failed to update user data. Please try again.");
    }
  });

  // Handle logout
  const logoutLink = document.querySelector(".logout a");
  logoutLink.addEventListener("click", function (event) {
    event.preventDefault();
    showToast("Logged out");

    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });
});

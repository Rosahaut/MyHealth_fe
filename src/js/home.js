import "../styles/main.css";
import "../styles/home.css";
import { fetchData } from './fetch';
import { showToast } from "./toast.js";

// Navigaatio menun avaaminen ja sulkeminen
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("show");
    });
  }

  // Käyttäjänimen näyttäminen
  showUserName();

  // Kirjautuminen ulos
  const logoutLink = document.querySelector('.logout a');
  if (logoutLink) {
    logoutLink.addEventListener('click', function (event) {
      event.preventDefault();
      showToast('Logging out');

      localStorage.removeItem('user_id');
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    });
  }
});

// Käyttäjänimen hakeminen ja näyttäminen
async function showUserName() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem('user_id');

  if (!token || !userId) {
    console.warn("User is not logged in.");
    return;
  }

  console.log("Token haettu LocalStoragesta:", token);
  console.log("Käyttäjän ID:", userId);

  const url = `http://localhost:3000/api/auth/me`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await fetchData(url, options);
    if (data?.user?.username) {
      document.getElementById("name").textContent = data.user.username;
    } else {
      showToast('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    showToast('Error fetching user data');
  }
}

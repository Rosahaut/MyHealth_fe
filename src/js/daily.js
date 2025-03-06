import "../styles/style.css";
import { fetchData } from "./fetch.js";
import { showToast } from "./toast.js";

// Navigaatiomenun avaaminen ja sulkeminen
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
});

// Lomakkeen lähetys
const form = document.getElementById("daily-form");
form.addEventListener("submit", submitDiary);

// Entries-napin toiminnallisuus
const entriesButton = document.querySelector("#fetch-data");
entriesButton.addEventListener("click", getEntries);

// Edit-modalin sulkeminen
const editModal = document.getElementById("edit-modal");
const closeButton = document.querySelector(".close-button");
const editForm = document.getElementById("edit-form");

closeButton.onclick = () => (editModal.style.display = "none");
window.onclick = (event) => {
  if (event.target === editModal) {
    editModal.style.display = "none";
  }
};

// Uuden päiväkirjamerkinnän lisääminen
async function submitDiary(event) {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const userId = localStorage.getItem("user_id");
  const formData = new FormData(form);
  const diaryData = {};
  formData.forEach((value, key) => {
    diaryData[key] = value;
  });

  diaryData.user_id = userId;

  try {
    const url = `http://localhost:3000/api/entries`;
    const token = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(diaryData),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to add diary entry");
    }

    form.reset();
    showToast("Daily entry added successfully!");
    getEntries();
  } catch (error) {
    console.error("Error adding daily entry:", error.message);
    showToast("Failed to add daily entry. Please try again.");
  }
}

// Päiväkirjamerkintöjen haku
async function getEntries() {
  const userId = localStorage.getItem("user_id");
  const url = `http://localhost:3000/api/entries`;
  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetchData(url, options).then((data) => {
    createTable(data);
  });
}

function createTable(data) {
    const tbody = document.querySelector(".tbody");
    tbody.innerHTML = "";
  
    data.forEach((element) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${new Date(element.entry_date).toLocaleDateString("fi-FI")}</td>
      <td>${element.mood}</td>
      <td>${element.sleep_hours}</td>
      <td>${element.notes}</td>
        <td><button class="edit" data-entry-id="${element.entry_id}">Edit</button></td>
      `;
  
      tbody.appendChild(tr);
    });
  
    document.querySelectorAll(".edit").forEach((button) =>
      button.addEventListener("click", (evt) => openEditModal(evt, data))
    );
  }

  function openEditModal(evt, data) {
    const entryId = parseInt(evt.target.dataset.entryId, 10);
    const entryData = data.find((entry) => entry.entry_id === entryId);
  
    if (!entryData) {
      showToast("Error: Entry not found!");
      return;
    }
    const {entry_date} = entryData
    const date = new Date(new Date(entry_date).getTime() - new Date().getTimezoneOffset()*60000).toISOString().split('T')[0];
    document.getElementById("edit-entry-id").value = entryId;
    document.getElementById("edit-date").value = date;
    document.getElementById("edit-mood").value = entryData.mood;
    document.getElementById("edit-sleep").value = entryData.sleep_hours;
    document.getElementById("edit-notes").value = entryData.notes || "";
  
    editModal.style.display = "block";
  }

// Päiväkirjamerkinnän päivittäminen
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const url = `http://localhost:3000/api/entries`;
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      entry_id: formData.get("edit-entry-id"),  
      entry_date: formData.get("edit-date"),
      mood: formData.get("edit-mood"),
      sleep_hours: formData.get("edit-sleep"),
      notes: formData.get("edit-notes"),
    }),
  };

  fetchData(url, options).then(() => {
    editModal.style.display = "none";
    showToast("Diary entry updated");
    getEntries();
  });
});

// Päiväkirjamerkinnän poistaminen
document.getElementById("delete-entry").addEventListener("click", function (e) {
  const entryId = document.getElementById("edit-entry-id").value;
  if (entryId) {
    deleteEntry(e, entryId);
  }
});

async function deleteEntry(e, entryId) {
  if (!confirm("Are you sure you want to delete this entry?")) {
    return;
}
e.preventDefault();
  const formData = new FormData(e.target.form);

  const url = `http://localhost:3000/api/entries/${formData.get("edit-entry-id")}`;
  const token = localStorage.getItem("token");
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetchData(url, options).then(() => {
    showToast("Diary entry deleted");
    editModal.style.display = "none";
    getEntries();
  });
}

// Uloskirjautuminen
document.addEventListener("DOMContentLoaded", function () {
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

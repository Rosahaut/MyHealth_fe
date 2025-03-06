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
const form = document.getElementById("medication-form");
form.addEventListener("submit", submitMedication);

// Entries-napin toiminnallisuus
const entriesButton = document.querySelector("#fetch-medications");
entriesButton.addEventListener("click", getMedications);

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

// Uuden lääkkeen lisääminen
async function submitMedication(event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const userId = localStorage.getItem("user_id");
  const formData = new FormData(form);
  const medicationData = {};
  formData.forEach((value, key) => {
    medicationData[key] = value;
  });

  medicationData.user_id = userId;

  try {
    const url = `http://localhost:3000/api/medications`;
    const token = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(medicationData),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to add medication");
    }

    form.reset();
    showToast("Medication added successfully!");
    getMedications();
  } catch (error) {
    console.error("Error adding medication:", error.message);
    showToast("Failed to add medication. Please try again.");
  }
}

// Lääkkeiden haku
async function getMedications() {
  const userId = localStorage.getItem("user_id");
  const url = `http://localhost:3000/api/medications/user/${userId}`;
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

// Taulukon luonti
function createTable(data) {
  const tbody = document.querySelector(".tbody");
  tbody.innerHTML = "";

  data.forEach((element) => {
    const tr = document.createElement("tr");
    const time = element.taken_at.split(':');
    tr.innerHTML = `
      <td>${new Date(element.medication_date).toLocaleDateString("fi-FI")}</td>
      <td>${element.name}</td>
      <td>${element.dosage}</td>
      <td>${time[0]}:${time[1]}</td>
      <td>${element.notes || "No notes"}</td>
      <td><button class="edit" data-medication-id="${element.medication_id}">Edit</button></td>
    `;

    tbody.appendChild(tr);
  });

  document.querySelectorAll(".edit").forEach((button) =>
    button.addEventListener("click", (evt) => openEditModal(evt, data))
  );
}

// Edit-modalin avaaminen
function openEditModal(evt, data) {
  const medicationId = parseInt(evt.target.dataset.medicationId, 10);
  const entryData = data.find((entry) => entry.medication_id === medicationId);

  if (!entryData) {
    showToast("Error: Medication not found!");
    return;
  }

  const { medication_date } = entryData;
  const date = new Date(new Date(medication_date).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
  document.getElementById("edit-medication-id").value = medicationId;
  document.getElementById("edit-medication-date").value = date;
  document.getElementById("edit-name").value = entryData.name;
  document.getElementById("edit-dosage").value = entryData.dosage;
  document.getElementById("edit-taken-at").value = entryData.taken_at;
  document.getElementById("edit-notes").value = entryData.notes || "";

  editModal.style.display = "block";
}

// Lääkkeen päivittäminen
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const url = `http://localhost:3000/api/medications/${formData.get("medication-id")}`;
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: user_id,
      medication_date: formData.get("date"),
      name: formData.get("name"),
      dosage: formData.get("dosage"),
      taken_at: formData.get("taken-at"),
      notes: formData.get("notes"),
    }),
  };

  fetchData(url, options).then(() => {
    editModal.style.display = "none";
    showToast("Medication entry updated!");
    getMedications();
  });
});

// Lääkkeen poistaminen
document.getElementById("delete-entry").addEventListener("click", function (e) {
  const medicationId = document.getElementById("edit-medication-id").value;
  if (medicationId) {
    deleteMedication(e, medicationId);
  }
});

async function deleteMedication(e, medicationId) {
  if (!confirm("Are you sure you want to delete this medication?")) {
    return;
  }

  const url = `http://localhost:3000/api/medications/${medicationId}`;
  const token = localStorage.getItem("token");

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetchData(url, options).then(() => {
    showToast("Medication deleted!");
    editModal.style.display = "none";
    getMedications();
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

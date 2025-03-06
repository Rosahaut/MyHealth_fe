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
const form = document.getElementById("measurement-form");
form.addEventListener("submit", submitForm);

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

// Uuden mittauksen lisääminen
async function submitForm(event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const userId = localStorage.getItem("user_id");
  if (!userId) {
    showToast("User ID not found. Please log in again.");
    return;
  }

  const formData = new FormData(form);
  const measurementData = {};
  formData.forEach((value, key) => {
    measurementData[key] = value;
  });

  const createdAt = new Date().toISOString();
  measurementData["created_at"] = createdAt;
  measurementData.user_id = userId;

  try {
    const url = `http://localhost:3000/api/measurements`;
    const token = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(measurementData),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to add Measurement");
    }

    form.reset();
    showToast("Measurement added successfully!");
    fetchMeasurementData(); // Päivitä taulukko lisäyksen jälkeen
  } catch (error) {
    console.error("Error adding measurement:", error.message);
    showToast("Failed to add measurement. Please try again.");
  }
}

// Mittausten haku
const fetchButton = document.querySelector("#fetch-data");
fetchButton.addEventListener("click", fetchMeasurementData);

async function fetchMeasurementData() {
  const userId = localStorage.getItem("user_id");
  const url = `http://localhost:3000/api/measurements/user/${userId}`;
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

    const formattedDate = new Date(element.metric_date).toLocaleDateString("fi-FI");

    const td1 = document.createElement("td");
    td1.innerText = formattedDate;

    const td2 = document.createElement("td");
    td2.innerText = element.heart_rate;

    const td3 = document.createElement("td");
    td3.innerText = element.blood_pressure;

    const td4 = document.createElement("td");
    td4.innerText = element.blood_sugar;

    const td5 = document.createElement("td");
    td5.innerText = element.notes;

    const td6 = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.setAttribute("data-measurement-id", element.measurement_id);
    editButton.innerText = "Edit";
    editButton.addEventListener("click", (evt) => openEditModal(evt, data));
    td6.appendChild(editButton);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    tbody.appendChild(tr);
  });

  document
    .querySelectorAll(".edit")
    .forEach((button) =>
      button.addEventListener("click", (evt) => openEditModal(evt, data))
    );
}

// Edit-modalin avaaminen
function openEditModal(evt, data) {
  const measurementId = parseInt(evt.target.dataset.measurementId, 10);
  const entryData = data.find((entry) => entry.measurement_id === measurementId);

  if (!entryData) {
    showToast("Error: Measurement not found!");
    return;
  }

  const { metric_date } = entryData;
  const date = new Date(new Date(metric_date).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
  document.getElementById("edit-metric-id").value = measurementId;
  document.getElementById("edit-metric-date").value = date;
  document.getElementById("edit-heart-rate").value = entryData.heart_rate;
  document.getElementById("edit-blood-pressure").value = entryData.blood_pressure;
  document.getElementById("edit-blood-sugar").value = entryData.blood_sugar;
  document.getElementById("edit-notes").value = entryData.notes;

  editModal.style.display = "block";
}

// Mittauksen päivittäminen
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const measurementId = formData.get("edit-metric-id");

  const url = `http://localhost:3000/api/measurements/${measurementId}`;
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
      metric_date: formData.get("edit-metric-date"),
      heart_rate: formData.get("edit-heart-rate"),
      blood_pressure: formData.get("edit-blood-pressure"),
      blood_sugar: formData.get("edit-blood-sugar"),
      notes: formData.get("edit-notes"),
    }),
  };

  fetchData(url, options).then(() => {
    editModal.style.display = "none";
    showToast("Measurement updated!");
    fetchMeasurementData();
  });
});

// Mittauksen poistaminen
document.getElementById("delete-entry").addEventListener("click", function () {
  const measurementId = document.getElementById("edit-metric-id").value;
  if (measurementId) {
    deleteMeasurement(measurementId);
  }
});

async function deleteMeasurement(measurementId) {
  if (!confirm("Are you sure you want to delete this measurement?")) {
    return;
  }

  const url = `http://localhost:3000/api/measurements/${measurementId}`;
  const token = localStorage.getItem("token");

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetchData(url, options).then(() => {
    showToast("Measurement deleted!");
    editModal.style.display = "none";
    fetchMeasurementData();
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
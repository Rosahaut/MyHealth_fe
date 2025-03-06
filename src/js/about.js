document.addEventListener("DOMContentLoaded", function () {
    const aboutModal = document.getElementById("aboutModal");
    const openAboutModal = document.getElementById("openAboutModal");
    const closeButtons = document.querySelectorAll(".close");
  
    // Avaa "About" -modaali
    openAboutModal.addEventListener("click", function () {
      aboutModal.style.display = "block";
    });
  
    // Sulje modaali sulku-painikkeella
    closeButtons.forEach(button => {
      button.addEventListener("click", function () {
        aboutModal.style.display = "none";
      });
    });
  
    // Sulje modaali, kun klikataan sen ulkopuolelle
    window.addEventListener("click", function (event) {
      if (event.target == aboutModal) {
        aboutModal.style.display = "none";
      }
    });
  });
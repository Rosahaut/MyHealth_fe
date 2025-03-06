function showSnackbar(message) {
    // Hae snackbar-säiliö, jossa viesti näytetään
    const snackbarContainer = document.getElementById('snackbar-container');
    
    // Luo uusi snackbar-elementti
    const snackbar = document.createElement('div');
    snackbar.className = 'snackbar'; // Tyylitellään se 'snackbar'-luokalla
    snackbar.textContent = message;
  
    // Voit lisätä myös painikkeen, esimerkiksi undo-toimintaa varten
    const actionButton = document.createElement('button');
    actionButton.textContent = 'UNDO'; // Esimerkki toiminnosta
    actionButton.className = 'snackbar-button';
    snackbar.appendChild(actionButton);
  
    // Lisää snackbar säiliöön
    snackbarContainer.appendChild(snackbar);
  
    // Poista snackbar 6 sekunnin kuluttua
    setTimeout(() => {
      snackbarContainer.removeChild(snackbar);
    }, 6000);
  }
  
  export { showSnackbar };
  
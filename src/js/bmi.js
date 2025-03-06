window.onload = () => {
    document.getElementById("calculate").addEventListener("click", () => {
      const weight = parseFloat(document.getElementById("weight").value);
      const height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to meters
  
      if (!weight || !height) {
        alert("Anna molemmat arvot!");
        return;
      }
  
      const bmi = (weight / (height * height)).toFixed(1);
      document.getElementById("bmi-result").textContent = bmi;
  
      //
      document.querySelector(".highlight") &&
        document.querySelector(".highlight").classList.remove("highlight");
  
      //
      const analysisElement = document.getElementById("analysis");
  
      if (bmi < 18.5) {
        document.getElementById("underweight-row").classList.add("highlight");
        analysisElement.textContent =
          "Alipaino: Painoindeksisi on normaalia alhaisempi. Keskustele lääkärin tai ravitsemusterapeutin kanssa.";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        document.getElementById("normal-row").classList.add("highlight");
        analysisElement.textContent =
          "Normaali paino: Painoindeksisi on normaalialueella. Hyvinvointisi on todennäköisesti hyvä!";
      } else {
        document.getElementById("overweight-row").classList.add("highlight");
        analysisElement.textContent =
          "Ylipaino: Painoindeksisi on normaalia korkeampi. Harkitse terveellisiä elämäntapamuutoksia.";
      }
    });
  };
const display = document.getElementById("display");
const bottoni = document.querySelectorAll("button");

let currentInput = "";
let parentesiAperte = 0;

function aggiornaDisplay(value) {
  display.value = value;
}

bottoni.forEach((btn) => {
  btn.addEventListener("click", () => {
    const valore = btn.textContent;
    switch (valore) {
      case "C":
        currentInput = "";
        parentesiAperte = 0;
        aggiornaDisplay("0");
        break;
      case "=":
        try {
          let expr = currentInput;
          for (let i = 0; i < parentesiAperte; i++) {
            expr += ")";
          }

          expr = expr.replace(/([\d.]+)%([\d.]+)/g, function (_, a, b) {
            return "(" + a + "*" + b + "/100)";
          });

          expr = expr.replace(/([\d.]+)%/g, "($1/100)");
          let risultato = eval(expr);
          if (risultato === undefined) risultato = 0;
          aggiornaDisplay(risultato);
          currentInput = risultato.toString();
          parentesiAperte = 0;
        } catch (e) {
          aggiornaDisplay("Errore");
          currentInput = "";
          parentesiAperte = 0;
        }
        break;
      case "()":
        if (currentInput === "" || /[\+\-\*\/\(]$/.test(currentInput)) {
          currentInput += "(";
          parentesiAperte++;
        } else if (parentesiAperte > 0) {
          currentInput += ")";
          parentesiAperte--;
        }
        aggiornaDisplay(currentInput || "0");
        break;
      default:
        if (valore === "%") {
          if (/\d$/.test(currentInput)) {
            currentInput += "%";
          }
        } else {
          currentInput += valore;
        }
        aggiornaDisplay(currentInput);
        break;
    }
  });
});

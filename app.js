function getHistory() {
    return document.getElementById("history-value").innerText;
}
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}
function getOutput() {
    return document.getElementById("output-value").innerText;
}
function printOutput(num) {
    //si le champ est vide ne pas formater le résultat
    if (num == "") {
        document.getElementById("output-value").innerText = num;
    }
    else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}
function getFormattedNumber(num) {
    //pour ne pas obtenir de NaN pour les valeurs négatives
    if (num == "-") {
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
}
function reverseNumberFormat(num) {
    // les caractères à supprimer sont entre les slash
    return Number(num.replace(/,/g, ''));
}
let operator = document.getElementsByClassName("operator");
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        }
        else if (this.id == "backspace") {
            //retire les virgules
            let output = reverseNumberFormat(getOutput()).toString();
            if (output) {//si la sortie est une valeur
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        }
        else {
            let output = getOutput();
            let history = getHistory();
            if (output == "" && history != "") {
                //retire le dernier caratère si c'est un opérateur
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (output != "" || history != "") {
                output = output == "" ? output : reverseNumberFormat(output);
                history = history + output;
                if (this.id == "=") {
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }

    });
}
let number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        let output = reverseNumberFormat(getOutput());
        if (output != NaN) { //Si la sortie est un nombre
            output = output + this.id;
            printOutput(output);
        }
    });
}

var operators = ["+", "-", "/", "*"];
var box = null;
var last_operation_history = null;
var operator_value = null;
var last_operator = null;
var calc_operator = null;
var firstNum = true;
var numbers = [];
var last_button = null;

window.onload = function () {
    box = document.getElementById("box");
    last_operation_history = document.getElementById("last_operation_history");
};

function button_number(button) {
    box = document.getElementById("box");
    last_operation_history = document.getElementById("last_operation_history");
    var equal = document.getElementById("equal_sign").value;
    var dot = document.getElementById("dot").value;
    last_button = button;

    // Number or dot input
    if (!operators.includes(button) && button != equal) {
        if (firstNum) {
            if (button == dot) {
                box.innerText = "0" + dot;
            } else {
                box.innerText = button;
            }
            firstNum = false;
        } else {
            if (box.innerText.length === 1 && box.innerText === "0") {
                if (button == dot) {
                    box.innerText += button;
                } else {
                    box.innerText = button;
                }
                return;
            }
            if (box.innerText.includes(dot) && button == dot) return;
            if (box.innerText.length >= 20) return;
            if (button == dot && box.innerText == "-") {
                box.innerText = "-0" + dot;
            } else {
                box.innerText += button;
            }
        }
    }
    // Operator or equal input
    else {
        if (operator_value != null && button == operator_value) return;

        if (button == "-" && box.innerText == "0") {
            box.innerText = button;
            firstNum = false;
            operator_value = button;
            showSelectedOperator();
            return;
        } else if (operators.includes(button) && box.innerText == "-") {
            return;
        } else if (button == "-" && operator_value == "-" && last_operation_history.innerText.includes("=")) {
            return;
        }

        if (operators.includes(button)) {
            calc_operator = button;
            if (button == "*") last_operator = "×";
            else if (button == "/") last_operator = "÷";
            else last_operator = button;
            operator_value = button;
            firstNum = true;
            showSelectedOperator();
        }

        if (numbers.length === 0) {
            numbers.push(box.innerText);
            last_operation_history.innerText = box.innerText + " " + (last_operator || button);
        } else {
            if (numbers.length === 1) numbers[1] = box.innerText;
            var temp_num = box.innerText;

            if (button == equal && calc_operator != null) {
                var total = calculate(numbers[0], numbers[1], calc_operator);
                box.innerText = total;
                if (!last_operation_history.innerText.includes("=")) {
                    last_operation_history.innerText += " " + numbers[1] + " =";
                }
                numbers[0] = total;
                operator_value = null;
                showSelectedOperator();
            } else if (calc_operator != null) {
                last_operation_history.innerText = temp_num + " " + last_operator;
                calc_operator = button;
                numbers = [box.innerText];
            }
        }
    }
}

function showSelectedOperator() {
    var elements = document.getElementsByClassName("operator");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#e68a00";
    }
    if (operator_value == "+") document.getElementById("plusOp").style.backgroundColor = "#ffd11a";
    else if (operator_value == "-") document.getElementById("subOp").style.backgroundColor = "#ffd11a";
    else if (operator_value == "*") document.getElementById("multiOp").style.backgroundColor = "#ffd11a";
    else if (operator_value == "/") document.getElementById("divOp").style.backgroundColor = "#ffd11a";
}

function calculate(num1, num2, operator) {
    var total;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (operator === "+") total = num1 + num2;
    else if (operator === "-") total = num1 - num2;
    else if (operator === "*") total = num1 * num2;
    else if (operator === "/") total = num1 / num2;
    else return box.innerText;
    if (!Number.isInteger(total)) total = total.toPrecision(12);
    return parseFloat(total);
}

// Optional: Keyboard support for numbers and operators
document.addEventListener('keydown', function (e) {
    var equal = document.getElementById("equal_sign").value;
    var dot = document.getElementById("dot").value;
    if (e.key === "Enter" || e.key === "=") {
        button_number(equal);
        return;
    }
    if (e.key === "." || e.key === ",") {
        button_number(dot);
        return;
    }
    if (operators.includes(e.key)) {
        button_number(e.key);
        return;
    }
    if (!isNaN(e.key) && e.key !== " ") {
        button_number(e.key);
        return;
    }
});
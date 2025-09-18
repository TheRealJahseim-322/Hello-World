let results = [];
let isCancelled = false;

function calculate() {
    if (isCancelled) return;

    const x = document.getElementById("num1").value;
    const y = document.getElementById("num2").value;
    const operator = document.getElementById("operator").value;

    let result;
    let valid = true;

    if (isNaN(x) || isNaN(y)) {
        result = "Error: Non-numeric input";
        valid = false;
    } else {
        const num1 = parseFloat(x);
        const num2 = parseFloat(y);

        const operations = [
            { op: "+", fn: (a, b) => a + b },
            { op: "-", fn: (a, b) => a - b },
            { op: "*", fn: (a, b) => a * b },
            { op: "/", fn: (a, b) => b !== 0 ? a / b : "Error: Division by zero" },
            { op: "%", fn: (a, b) => b !== 0 ? a % b : "Error: Modulus by zero" }
        ];

        let found = false;
        for (let i = 0; i < operations.length; i++) {
            if (operations[i].op === operator) {
                result = operations[i].fn(num1, num2);
                found = true;
                if (typeof result === "string") valid = false;
                break;
            }
        }

        if (!found) {
            result = "Error: Invalid operator";
            valid = false;
        }

        if (valid && typeof result === "number") {
            results.push(result);
        }
    }

    addToTable(x, operator, y, result);
}

function addToTable(x, operator, y, result) {
    const tableContainer = document.getElementById("results");
    if (!tableContainer.innerHTML) {
        tableContainer.innerHTML = `
            <table id="calcTable">
                <tr><th>Number 1</th><th>Operator</th><th>Number 2</th><th>Result</th></tr>
            </table>
        `;
    }

    const table = document.getElementById("calcTable");
    const row = table.insertRow();
    row.innerHTML = `<td>${x}</td><td>${operator}</td><td>${y}</td><td>${result}</td>`;
}

function showSummary() {
    if (isCancelled) return;

    if (results.length === 0) {
        document.getElementById("summary").innerHTML = "<p>No valid results to summarize.</p>";
        return;
    }

    const min = Math.min(...results);
    const max = Math.max(...results);
    const total = results.reduce((acc, val) => acc + val, 0);
    const avg = total / results.length;

    document.getElementById("summary").innerHTML = `
        <table>
            <tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>
            <tr><td>${min}</td><td>${max}</td><td>${avg.toFixed(2)}</td><td>${total}</td></tr>
        </table>
    `;
}

function cancelCalculator() {
    isCancelled = true;

    document.getElementById("num1").disabled = true;
    document.getElementById("num2").disabled = true;
    document.getElementById("operator").disabled = true;

    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);

    document.getElementById("cancelMessage").innerText = "Thank you for using the calculator!";
}

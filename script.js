class Calculator {
    constructor(pOperandText, cOperandText){
        this.pOperandText = pOperandText;
        this.cOperandText = cOperandText;
        this.reset = false;
        this.clear();
    }
    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operator = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }
    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operator){
        if(this.currentOperand === "") return;
        if(this.previousOperand !== "") {
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    compute(){
    let result;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(curr)) return;
    switch (this.operator){
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "*":
            result = prev * curr;
            break;
        case "\u00f7":
            result = prev / curr;
            break;
        default:
            return;
    }
    this.reset = true;
    this.currentOperand = result;
    this.previousOperand = "";
    this.operator = undefined;

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split(".")[0]);
        const decimalDigit = stringNumber.split(".")[1];
        let integerDisplay;
        if(isNaN(integerDigit)){
            integerDisplay = "";
        }
        else {
            integerDisplay = integerDigit.toLocaleString("en", {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigit != null){
            return `${integerDisplay}.${decimalDigit}`
        }
        else {
            return integerDisplay;
        }
    }
    updateDisplay(){
        this.cOperandText.innerText = 
            this.getDisplayNumber(this.currentOperand);
        if(this.operator != null){
        this.pOperandText.innerText = 
            `${this.previousOperand}  ${this.operator}`;
    }
    else {
        this.pOperandText.innerText = "";
    }
}
}

const numberBtns = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const acBtn = document.querySelector("[data-all-clear]");
const pOperandText = document.querySelector("[data-previous-operand]");
const cOperandText = document.querySelector("[data-current-operand]");



const calculator = new Calculator(pOperandText, cOperandText);

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
    if(calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.reset){
        calculator.currentOperand = "";
        calculator.reset = false;
    }
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();  
    })
});

operators.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();  
    })
});

equalsBtn.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

acBtn.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})
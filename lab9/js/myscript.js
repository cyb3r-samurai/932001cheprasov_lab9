class Calculator{
    constructor(previousOperandTextEl,currentOperandTextEl){
        this.previousOperandTextEl=previousOperandTextEl;
        this.currentOperandTextEl=currentOperandTextEl;
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    appendNumber(number){
        if (number === '.' && (this.currentOperand.includes('.') || (this.currentOperand == ''))) return;
        this.currentOperand= this.currentOperand.toString()+number.toString();
        this.currentOperandTextEl.innerText = this.currentOperand; 
    }
    appendOperation(operation){
        if (this.currentOperand === '-') return
        if (this.currentOperand === ''){
        if(operation == '-'){
        this.appendNumber('-');
        return;
        }
        else return;
        }

        if (this.previousOperand !== '') {
            this.compute();
        }
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.operation =operation;
        this.currentOperandTextEl.innerText = this.currentOperand; 
        this.previousOperandTextEl.innerText = this.previousOperand+operation;
    }
    compute(){
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        switch(this.operation){
            case '/':
                if (current != 0){
                    result = prev/  current;
                }
                break
            case '*':
                result =  prev *current;
                break
            case '-':
                result = prev - current;
                break
            case '+':
                result = prev+current;
                break
            default:
                return
        }
        this.currentOperand = result;
        this.previousOperand = '';
        this.operation = undefined;
        this.currentOperandTextEl.innerText = this.currentOperand; 
        this.previousOperandTextEl.innerText = this.previousOperand;
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.currentOperandTextEl.innerText = this.currentOperand; 
        this.previousOperandTextEl.innerText = this.previousOperand;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
        this.currentOperandTextEl.innerText = this.currentOperand; 
    }
}

const previousOperand = document.getElementById("id01");
const currentOperand =document.getElementById("id02");
const numberButtons = document.querySelectorAll('[data-number]');
const opertions = document.querySelectorAll('[data-operation]');
const equalbutton = document.getElementById("equal");
const clearbutton = document.getElementById("clear");
const deletebutton = document.getElementById("delete");

const calculator = new Calculator(previousOperand,currentOperand)


numberButtons.forEach(button => {
    button.addEventListener('click',() =>{  
        calculator.appendNumber(button.innerText);
    })
    
});
opertions.forEach(button => {
    button.addEventListener('click',() =>{  
        calculator.appendOperation(button.innerText);
    })
    
});
equalbutton.addEventListener('click',button => {
    calculator.compute();
})
clearbutton.addEventListener('click',button => {
    calculator.clear();
})
deletebutton.addEventListener('click',button => {
    calculator.delete();
})
// Immediately Invoked Function Expression to avoid polluting global scope
(function() {
    // Selecting elements using document.querySelector()
    const display = document.querySelector('#display');
    const buttons = document.querySelectorAll('.btn');

    // Initialize display content
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    // Function to update display
    function updateDisplay(value) {
        display.value = value;
    }

    // Clear function
    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
        console.clear(); // Clear console for a fresh view of operations
    }

    // Calculation logic
    function calculate() {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result = 0;

        // Calculation based on operator
        if (operator === '+') result = num1 + num2;
        else if (operator === '-') result = num1 - num2;
        else if (operator === '*') result = num1 * num2;
        else if (operator === '/') result = num1 / num2;

        // Log each calculation step
        console.log(`Calculation: ${num1} ${operator} ${num2} = ${result}`);
        
        currentInput = result.toString();
        previousInput = '';
        operator = '';
        updateDisplay(currentInput);
    }

    // Event listener for button clicks
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            // Number or decimal input
            if (!isNaN(value) || value === '.') {
                currentInput += value;
                updateDisplay(currentInput);
            }
            // Operator input
            else if (value === '+' || value === '-' || value === '*' || value === '/') {
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = value;
                }
            }
            // Equal input
            else if (value === '=') {
                if (previousInput && currentInput && operator) {
                    calculate();
                }
            }
            // Clear input
            else if (value === 'C') {
                clearDisplay();
            }
        });
    });
})();

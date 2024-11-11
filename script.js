const inputs = document.querySelectorAll('input');
const labels = document.querySelectorAll('.input-label');

inputs.forEach(function(input, index) {
    input.addEventListener('input', function() {
        if (input.value.trim() !== '') {
            input.classList.add('orange');
			labels[index].classList.add('orange');
			
        } else {
            input.classList.remove('orange');
            labels[index].classList.remove('orange');
        }
    });
});

document.getElementById('calculator').addEventListener('submit', function (event) {
    event.preventDefault();
    var equationField = document.getElementById('equation')
    var lowerBoundField = document.getElementById('lowerBound')
    var upperBoundField = document.getElementById('upperBound')
    var subIntervalField = document.getElementById('subIntervals')
    var answerField = document.getElementById('answer');

    var equation = equationField.value;
    var lowerBound = math.evaluate(lowerBoundField.value);
    var upperBound = math.evaluate(upperBoundField.value);
    var subIntervals = parseInt(subIntervalField.value);


    // Validate input: Ensure that the equation is not empty
    if (!equation.trim()) {
        equationField.classList.add("shake");
        answerField.textContent = 'Please enter a valid equation.';
        answerField.classList.add("shake");
        return;
    }

    // Validate input: Ensure that the bounds are numeric
    if (isNaN(lowerBound)) {
        lowerBoundField.classList.add("shake");
        answerField.textContent = 'Please enter valid lowerbound value.';
        answerField.classList.add("shake");
        return;
    }

    if (isNaN(upperBound)) {
        upperBoundField.classList.add("shake");
        answerField.textContent = 'Please enter valid upperbound value.';
        answerField.classList.add("shake");
        return;
    }

    // Validate input: Ensure that the number of subintervals is positive
    if (subIntervals <= 0 || isNaN(subIntervals)) {
        subIntervalField.classList.add("shake");
        answerField.textContent = 'Please enter a positive number of subintervals.';
        answerField.classList.add("shake");
        return;
    }

    // Use the math.js library to parse and evaluate the equation
    var f = math.compile(equation);

    // Calculate the step size
    var h = (upperBound - lowerBound) / subIntervals;

    // Initialize the integral
    var integral = 0;

    if (subIntervals != 1) {
        // Multiple applications of the trapezoidal rule
        integral = f.evaluate({ x: lowerBound }) + f.evaluate({ x: upperBound });

        // Add up the areas of the trapezoids
        for (var i = 1; i < subIntervals; i++) {
            integral += 2 * f.evaluate({ x: lowerBound + i * h });
        }

        integral *= h / 2;
    } else {
        // Single application of the trapezoidal rule
        integral = h * (f.evaluate({ x: lowerBound }) + f.evaluate({ x: upperBound })) / 2;
    }

    // Display the result
    answerField.textContent = 'I = ' + integral.toFixed(6);
});
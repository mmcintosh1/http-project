// Select the quiz form, reset button, and overall results section
const quizForm = document.getElementById("httpQuiz");
const resetButton = document.getElementById("resetButton");
const quizResults = document.getElementById("quizResults");

// Hide the overall results until the user submits the quiz
quizResults.style.display = "none";

// Runs when the user submits the quiz
quizForm.addEventListener("submit", function (event) {
    // Prevents the browser from refreshing the page
    event.preventDefault();

    let score = 0;

    // Question 1: Fill in the blank
    const question1Answer = document
        .getElementById("q1")
        .value
        .trim()
        .toLowerCase();

    if (
        question1Answer === "request" ||
        question1Answer === "http request"
    ) {
        score += 20;

        displayQuestionResult(
            "result1",
            true,
            "20/20 points — Correct. The answer is HTTP request."
        );
    } else {
        displayQuestionResult(
            "result1",
            false,
            "0/20 points — Incorrect. The correct answer is HTTP request."
        );
    }

    // Question 2: Multiple choice
    const question2 = document.querySelector(
        'input[name="q2"]:checked'
    );

    if (question2 && question2.value === "GET") {
        score += 20;

        displayQuestionResult(
            "result2",
            true,
            "20/20 points — Correct. HTTP/0.9 supported the GET method."
        );
    } else {
        displayQuestionResult(
            "result2",
            false,
            "0/20 points — Incorrect. The correct answer is GET."
        );
    }

    // Question 3: Multiple choice
    const question3 = document.querySelector(
        'input[name="q3"]:checked'
    );

    if (question3 && question3.value === "HTTP/2") {
        score += 20;

        displayQuestionResult(
            "result3",
            true,
            "20/20 points — Correct. HTTP/2 introduced multiplexing."
        );
    } else {
        displayQuestionResult(
            "result3",
            false,
            "0/20 points — Incorrect. The correct answer is HTTP/2."
        );
    }

    // Question 4: Multiple choice
    const question4 = document.querySelector(
        'input[name="q4"]:checked'
    );

    if (question4 && question4.value === "TLS") {
        score += 20;

        displayQuestionResult(
            "result4",
            true,
            "20/20 points — Correct. TLS protects HTTP communication."
        );
    } else {
        displayQuestionResult(
            "result4",
            false,
            "0/20 points — Incorrect. The correct answer is TLS."
        );
    }

    // Question 5: Multiple-selection question
    const selectedAnswers = Array.from(
        document.querySelectorAll('input[name="q5"]:checked')
    ).map(function (checkbox) {
        return checkbox.value;
    });

    const correctAnswers = ["GET", "POST", "DELETE"];

    const question5Correct =
        selectedAnswers.length === correctAnswers.length &&
        correctAnswers.every(function (answer) {
            return selectedAnswers.includes(answer);
        });

    if (question5Correct) {
        score += 20;

        displayQuestionResult(
            "result5",
            true,
            "20/20 points — Correct. GET, POST, and DELETE are HTTP methods."
        );
    } else {
        displayQuestionResult(
            "result5",
            false,
            "0/20 points — Incorrect. The correct answers are GET, POST, and DELETE."
        );
    }

    // Display the overall total score
    document.getElementById("totalScore").textContent =
        "Total Score: " + score + " out of 100";

    const passFail = document.getElementById("passFail");

    // A score of 70 or higher is passing
    if (score >= 70) {
        passFail.textContent = "PASS";
        passFail.className = "pass-result";
    } else {
        passFail.textContent = "FAIL";
        passFail.className = "fail-result";
    }

    quizResults.style.display = "block";

    // Moves the screen to the overall results
    quizResults.scrollIntoView({
        behavior: "smooth"
    });
});

// Displays the result under an individual question
function displayQuestionResult(elementId, isCorrect, message) {
    const resultElement = document.getElementById(elementId);

    resultElement.textContent = message;

    if (isCorrect) {
        resultElement.className = "question-result correct";
    } else {
        resultElement.className = "question-result incorrect";
    }
}

// Clears all answers and quiz results
resetButton.addEventListener("click", function () {
    quizForm.reset();

    const individualResults = document.querySelectorAll(
        ".question-result"
    );

    individualResults.forEach(function (result) {
        result.textContent = "";
        result.className = "question-result";
    });

    document.getElementById("passFail").textContent = "";
    document.getElementById("totalScore").textContent = "";

    quizResults.style.display = "none";

    // Returns the user to the top of the quiz
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

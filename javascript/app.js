// Functions and variables to allow game to create questions and fill in boxes

// Timer variable and functions for clock manipulation
var counter = 45;
var intervalId;
function runTimer() {
    stop();
    intervalId = setInterval(decrement, 1000);
};
function decrement() {
    counter--;
    $("#timerBox").html("<h2>"+ counter + "</h2>");
    if (counter === 0) {
        stop();
        enterResults();
    }
};
function stop() {
    clearInterval(intervalId);
};

// Questions and answers
var questions = [
    {
        question: "Where is Gamora?",
        answers: {
            a: "Who is Gamora?",
            b: "What is Gamora?",
            c: "How is Gamora?"
        },
        correctAnswer: 'a',
    },
    {
        question: "How many Infinity Stones are there?",
        answers: {
            a: '3',
            b: '5',
            c: '6'
        },
        correctAnswer: 'c',
    },
    {
        question: "Which Marvel movie is said to still have a hidden Easter Egg?",
        answers: {
            a: "Captain America: Winter Soldier",
            b: "Guardians of the Galaxy 2",
            c: "Thor 2: Dark World"
        },
        correctAnswer: 'b',
    },
    {
        question: "Who is the star of the upcoming Marvel movie in March 2019?",
        answers: {
            a: "Captain Marvel",
            b: "Black Widow",
            c: "The Fanta Squad"
        },
        correctAnswer: 'a',
    },
    {
        question: "What city does Spider-Man call home?",
        answers: {
            a: "New York",
            b: "Dallas",
            c: "Chicago"
        },
        correctAnswer: 'a',
    },
]
// Function starts the game, clears the start box, and starts the counter
function startGame() {
    $("#startBox").hide();   
    $("#resultsBox").hide();
    $("#questionBox").show();
    $("#timerBox").html("<h2>"+ counter + "</h2>");
    runTimer();
};
// Function to create questions in a form and provide radio buttons for selection
function createQuestions() {
    var qs = [];
    var answers;

    for(var i = 0; i<questions.length; i++){
        answers = [];
        for (letter in questions[i].answers){
            answers.push(
                '<label>' 
                + '<input type="radio" class="answerBtn" name="question' + i + '" value="'+ letter + '">' + " "
                + letter + ': '
                + questions[i].answers[letter]
                +'</label>' + " "
            );
        }
        qs.push(
            '<div class="question">' + questions[i].question + '<div>'
            + '<div class="answers">' + answers.join('') + '<div>'
        );
    }
    $("#questions").html(qs.join(''));
}

// Function to check answers and show results
function enterResults () {
    $("#questionBox").hide();
    $("#resultsBox").show();

    var answerBox = $(".answers");
    var userInput = '';
    var amtCorrect = 0;

    for (var i = 0; i < questions.length; i++) {
        var userInput = (answerBox[i].querySelector('input[name=question' + i + ']:checked') || {}).value;
        
        if (userInput === questions[i].correctAnswer){
            amtCorrect++;
        }
        $("#resultsTotal").html(amtCorrect + " out of " + questions.length + "! Good job!");
    }
}
// Tells Query to wait until document is ready
$(document).ready(function() {

    // looks for click at start game button
    $("#startButton").on("click", function() {
    startGame();
    createQuestions();
});
    // checks answers of quiz
    $("#submitBtn").on("click", function() {
    enterResults();
});
    // resets game
    $("#restartBtn").on("click", function() {
        counter = 45;
        startGame();
        createQuestions();
    })

// Closes doc.ready
});
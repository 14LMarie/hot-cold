$(document).ready(function () {

    /*--- Display information modal box ---*/
    $(".what").click(function () {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });
    //function to start a new game
    function newGame() {
        document.location.reload(true);
    }
    //function to create a random number
    function secretNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var secretNumber = secretNum(1, 100);
    console.log("Secret Number: " + secretNumber);

    var oldGuess = 0;

    var counter = 20;
    $('#count').text(counter);


    //Counting the number of guesses
    function guessCounter(counter) {
        $('#count').text(counter);
    }
    //function updating the guesses history
    function guessHistory() {
        $('#guessList').append('<li>' + parseInt($('#userGuess').val(), 10) + '</li>');
    }

    //function to validate and make sure value is a number
    function validation(guessedNumber) {
        console.log("Guessed Number: " + guessedNumber)
        if (guessedNumber % 1 !== 0) {
            alert('You must enter an integer value!');
            $('#userGuess').val('');
            return false;
        } else if (guessedNumber < 1 || guessedNumber > 100) {
            alert('Please guess a number between 1 to 100!');
            $('#userGuess').val('');
            return false;
        } else {
            guessFeedback(secretNumber, guessedNumber);
            counter--;
            guessHistory();
            $('#userGuess').val('');
        }
        if (counter <= 0) {
            $('feedback').text('GAME OVER!');
            document.getElementById("userGuess").disabled = true;
            document.getElementById("guessButton").disabled = true;
            alert('The secret number was ' + secretNumber + ' ! Better luck next time!');
        }
        guessCounter(counter);
    }

    //function to compare random number to guessed number from user and give feedback- hot, cold, warm, etc. #feedback
    function guessFeedback(secretNumber, guessedNumber) {
        var difference = Math.abs(secretNumber - guessedNumber);
        if (difference >= 50) {
            $('#feedback').text('You are in the North Pole! Frost Bite, Ouch!');
        } else if (difference >= 30 && difference <= 49) {
            $('#feedback').text('COLD, is there a blizzard outside?');
        } else if (difference >= 20 && difference <= 29) {
            $('#feedback').text('WARMth days melt the snow.');
        } else if (difference >= 10 && difference <= 19) {
            $('#feedback').text('Must be the sunshine making you HOT!');
        } else if (difference >= 1 && difference <= 9) {
            $('#feedback').text('Sooo close, you are on FIRE!');
        } else {
            $('#feedback').text('Perfect Answer, dance in your chair!');
        }
    }
    //function to compare old guess with new guess, relative comparison
    function relativeFeedback(secretNumber, oldGuess, newGuess) {
        var oldDiff = parseInt(Math.abs(secretNumber - oldGuess));
        var newDiff = parseInt(Math.abs(secretNumber - newGuess));
        if (newDiff > oldDiff) {
            $('#relative-feedback').text('You must love the snow, you are colder than the last guess!');
        } else if (newDiff === oldDiff) {
            $('#relative-feedback').text('You are as far as your previous guess!');
        } else {
            $('#relative-feedback').text('You must love the beach, you are hotter than the last guess!');
        }
    }

    $('.new').on('click', newGame);
    //get input number from the user
    $('#guessButton').on('click', function () {
        var guessedNumber = parseInt($('#userGuess').val(), 10);
        var newGuess = parseInt(guessedNumber);

        validation(guessedNumber);
        if (oldGuess !== 0 && guessedNumber >= 1 && guessedNumber <= 100) {
            relativeFeedback(secretNumber, oldGuess, newGuess);
        }
        oldGuess = newGuess;
    });

    $('#userGuess').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            var guessedNumber = parseInt($('#userGuess').val(), 10);
            var newGuess = parseInt(guessedNumber);

            validation(guessedNumber);

            if (oldGuess !== 0 && guessedNumber >= 1 && guessedNumber <= 100) {
                relativeFeedback(secretNumber, oldGuess, newGuess);
            }
            oldGuess = newGuess;
        }
    });

});

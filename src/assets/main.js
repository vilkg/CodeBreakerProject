let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');
let results = document.getElementById('results');
let code = document.getElementById('code');
let guessingDiv = document.getElementById('guessing-div');
let replayDiv = document.getElementById('replay-div');

function guess() {
    let input = document.getElementById('user-guess');
    if (answer.value === '' || attempt.value === '') {
      setHiddenFields();
    }

    if (!validateInput(input.value)) {
      return false;
    }

    console.log(getResults(input.value));
    if (!getResults(input.value) && attempt.value >= 10) {
      setMessage("You Lose! :(");
      showAnswer(false);
      showReplay();
    } else if (getResults(input.value)) {
      setMessage("You Win! :)");
      showAnswer(true);
      showReplay();
    } else {
      setMessage("Incorrect, try again.");
    }

    attempt.value += 1;
}

function setHiddenFields() {
  let randomNumber = Math.floor(Math.random() * 1000).toString();
  while (randomNumber.length < 4) {
    randomNumber = '0' + randomNumber;
  }

  answer.value = randomNumber;
  attempt.value = 0;
}

function setMessage(msg) {
  message.innerHTML = msg;
}

function validateInput(input) {
  if (input.length != 4) {
    setMessage("Guesses must be exactly 4 characters long.")
    return false;
  }

  return true;
}

function getResults(input) {
  let initialDiv = "<div class=\"row\"><span class=\"col-md-6\">" + input + "</span><div class=\"col-md-6\">";

  if (input == answer.value) {
    return true;
  }

  for (var i = 0; i < input.length; i++) {
    var classToAppend = "glyphicon-remove";
    if (answer.value.indexOf(input.charAt(i)) > -1) {
      classToAppend = "glyphicon-transfer";
    }

    if (input.charAt(i) == answer.value.charAt(i)) {
      classToAppend = "glyphicon-ok";
    }

    initialDiv += "<span class=\"glyphicon " + classToAppend + "\"></span></div></div>"
  }

  results.innerHTML = initialDiv;
  return false;
}

function showAnswer(param) {
  code.innerHTML= answer.value;
  if (param == true) {
    code.className = ' success';
  }

  else {
    code.className = ' failure'
  }
}

function showReplay() {
  guessingDiv.style = 'display:none';
  replayDiv.style = 'display:block';

}

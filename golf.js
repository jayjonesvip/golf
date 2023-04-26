let power;
let accuracyInterval;
let club;
let max;
let par;
let distance;
let accuracy;
let holeDistance;
let ballX = 0;
let ballY = 50;
let distanceFromPin;

const hole = document.querySelector('#hole');
const pin = document.querySelector('#pin');
const ball = document.querySelector('#ball');

window.onload = function () {
  setHoleProperties();
}

function setHoleProperties() {

  par = 3;
  holeDistance = Math.floor(Math.random() * 76) + 125; // generate random distance 125-250

  //draw the hole and the pin
  hole.style.width = `${holeDistance * 1.25}px`;
  pin.style.left = `${holeDistance}px`;

  // Update the hole info on the page
  document.querySelector('#par').textContent = par;
  document.querySelector('#hole-distance').textContent = holeDistance;
}


function setClub(selectedClub) {
  club = selectedClub;
  enablePowerButtons();
  disableClubButtons();
}

function setPower(selectedPower) {
  power = selectedPower;
  disablePowerButtons();
  enableSwingButton();
  startAccuracy();
}


function startAccuracy() {
  accuracy = 1;
  const accuracyCounter = document.querySelector('#accuracy');
  const accuracyCounterFill = document.querySelector('#accuracy-counter-inside');
  accuracyInterval = setInterval(() => {
    accuracy = accuracy >= 10 ? 1 : accuracy + 1;
    accuracyCounter.textContent = `${accuracy * 10}`;
    accuracyCounterFill.style.width = `${accuracy * 10}%`;
  }, getSpeed());
}


function getSpeed() {
  const powerSpeedMap = {
    'light': 200,
    'average': 75,
    'strong': 33
  };
  return powerSpeedMap[power] || 0;
}

function getMax() {
  const clubMaxMap = {
    'wedge': 100,
    'iron': 200,
    'driver': 300
  };
  return clubMaxMap[club] || 0;
}


function getOffset() {
  const offsets = [0, 5, 7, 10, 13, 15, 17, 25, 40, 50];
  return offsets[accuracy] || 0;
}


function getDistance() {
  const max = getMax() * (power === 'strong' ? 1.5 : 1);
  const min = max * 0.8 * (power === 'light' ? 0.75 : 1);
  const distance = Math.floor(Math.random() * (max - min + 1)) + min;

  const dist = document.querySelector('#distance');
  const offsetDiv = document.querySelector('#offset');
  const ball = document.querySelector('#ball');
  const far = document.querySelector('#far');

  let distanceToTravel = 0;
  let offsetDistanceToTravel = 0;
  let dir = ""
  const direction = Math.random() < 0.5 ? 'left' : 'right';

  if (direction === 'left') {
    dir = "<<"
  } else {
    dir = ">>"
  }

  let top = 50;
  let offset = getOffset();


  let timeOut = 10;
  let ballSize = 10;

  distanceInterval = setInterval(() => {

    offsetDiv.textContent = `${dir} ${offsetDistanceToTravel}`;
    distanceToTravel++;
    dist.textContent = distanceToTravel;

    if (distanceToTravel % Math.floor(distance / 25) === 0) {
      if (distanceToTravel < distance / 2 && ballSize < 25) {
        ballSize++;
      } else if (distanceToTravel >= distance / 2 && ballSize > 10) {
        ballSize--;
      }
    }

    ball.style.width = `${ballSize}px`;
    ball.style.height = `${ballSize}px`;
    ball.style.borderRadius = `${ballSize}px`;

    if (distanceToTravel % offset === 0) {
      offsetDistanceToTravel++;
      if (dir == '<<') {
        top = (50 - offsetDistanceToTravel);
        ball.style.top = `${top}%`;
      } else {
        top = (50 + offsetDistanceToTravel);
        ball.style.top = `${top}%`;
      }
    }

    ball.style.left = `${distanceToTravel}px`;

    const rect1 = pin.getBoundingClientRect();
    const rect2 = ball.getBoundingClientRect();
    const a = rect2.left - rect1.left;
    const b = rect2.top - rect1.top;
    const c = Math.round(Math.sqrt(a ** 2 + b ** 2));
    distanceFromPin = c;
    //console.log(`The distance between div1 and div2 is ${c}px.`);

    far.textContent = `${distanceFromPin} yds from the hole!`

    if (distanceToTravel === distance) {
      clearInterval(distanceInterval);
    }

  }, timeOut);


  return distance;
}

function stopAccuracy() {

  clearInterval(accuracyInterval);
  disableSwingButton();

  switch (accuracy) {
    case 1:
      document.querySelector('#message').textContent = "Did you close your eyes?";
      break;
    case 2:
      document.querySelector('#message').textContent = "At least you're consistent... consistently bad!";
      break;
    case 3:
      document.querySelector('#message').textContent = "Maybe try using the force next time?";
      break;
    case 4:
      document.querySelector('#message').textContent = "Did you mean to hit that tree?";
      break;
    case 5:
      document.querySelector('#message').textContent = "Just a bit outside... like waaaay outside!";
      break;
    case 6:
      document.querySelector('#message').textContent = "Looks like someone needs a mulligan!";
      break;
    case 7:
      document.querySelector('#message').textContent = "Better luck next time... or maybe just try mini-golf?";
      break;
    case 8:
      document.querySelector('#message').textContent = "Not bad, but I've seen better swings on a playground!";
      break;
    case 9:
      document.querySelector('#message').textContent = "Nice shot, Happy Gilmore... if Happy Gilmore was blindfolded!";
      break;
    case 10:
      document.querySelector('#message').textContent = "Wow, that was actually pretty good! You're a regular Tiger Woods!";
      break;
    default:
      document.querySelector('#message').textContent = "Oops, something went wrong!";
      break;
  }


  distance = getDistance();
}

function disableSwingButton() {
  const swingButton = document.querySelector('#swing');
  swingButton.disabled = true;
}

function showAccuracy() {
  alert(`Accuracy: ${accuracy}/10`);
  resetGame();
}


function disablePowerButtons() {
  const buttons = document.querySelectorAll('#power-buttons button');
  buttons.forEach(button => {
    button.disabled = true;
  });
}

function enableSwingButton() {
  const swingButton = document.querySelector('#swing');
  swingButton.disabled = false;
}




function disablePowerButtons() {
  const buttons = document.querySelectorAll('#power-buttons button');
  buttons.forEach(button => {
    button.disabled = true;
  });
}

function enablePowerButtons() {
  const buttons = document.querySelectorAll('#power-buttons button');
  buttons.forEach(button => {
    button.disabled = false;
  });
}

function enableClubButtons() {
  const buttons = document.querySelectorAll('#club-buttons button');
  buttons.forEach(button => {
    button.disabled = false;
  });
}

function disableClubButtons() {
  const buttons = document.querySelectorAll('#club-buttons button');
  buttons.forEach(button => {
    button.disabled = true;
  });
}


function resetGame() {
  const accuracyCounter = document.querySelector('#accuracy');
  accuracyCounter.textContent = '';
  //enablePowerButtons();
  enableClubButtons();
  disablePowerButtons();
  disableSwingButton();
}


var balances = document.querySelectorAll('span');


//beginning of color functions

function changeStyleToRed(accountNumber){
  if (accountNumber == 0) {
    var account = '.savings'
  } else {
    var account = '.checking'
  }
  document.querySelectorAll('main>*:first-child, main>*:last-child')[accountNumber].style = "background-color: darkred";
  document.querySelector(account + ' ' + 'h3').style = 'color: white';
  document.querySelector(account + ' ' + 'small').style = 'color: white';
  document.querySelector(account + ' ' + 'h2').style = 'color: white';
  document.querySelector(account + ' ' + 'span').style = 'color: white';
  document.querySelectorAll(account + ' ' + 'button')[0].className = 'red-button';
  document.querySelectorAll(account + ' ' + 'button')[1].className = 'red-button';
}

function changeStyleToNormal(accountNumber){
  if (accountNumber == 0) {
    var account = '.savings';
    var button = 'savings__button';
    var color = 'darkorange';
  } else {
    var account = '.checking';
    var button = 'checking__button';
    var color = 'color: #008CFF';
  }
  document.querySelectorAll('main>*:first-child, main>*:last-child')[accountNumber].style = "background-color: rgba(252,252,252)";
  document.querySelector(account + ' ' + 'small').style = 'color: dimgrey';
  document.querySelector(account + ' ' + 'h3').style = color;
  document.querySelector(account + ' ' + 'h2').style = 'color: dimgrey';
  document.querySelector(account + ' ' + 'span').style = 'color: dimgrey';
  document.querySelectorAll(account + ' ' + 'button')[0].className = button;
  document.querySelectorAll(account + ' ' + 'button')[1].className = button;
}

//beginning of money functions

function checkBalance(account){
  currentValue = balances[account].textContent
  if (Number(currentValue) === 0) {
    changeStyleToRed([account]);
  }
}

function depositMoney(account){

  var input = document.querySelectorAll('input')[account].value
  var currentValue = balances[account].textContent
  if (Number(input) > 0){ 
    changeStyleToNormal(account);
    return balances[account].textContent = (Number(currentValue) + Number(input)).toFixed(2);
  } else {
    shake(document.querySelectorAll('main>*:first-child, main>*:last-child')[account])
    shake(document.querySelectorAll('main>*:first-child, main>*:last-child')[account])
    shake(document.querySelectorAll('main>*:first-child, main>*:last-child')[account])
  }
}

function withdrawMoney(account){

  var input = document.querySelectorAll('input')[account].value
  var currentValue = balances[account].textContent
  if (Number(input) <= Number(currentValue) && Number(input) > 0){ 
    return balances[account].textContent = (Number(currentValue) - Number(input)).toFixed(2);
  } else {
    shake(document.querySelectorAll('main>*:first-child, main>*:last-child')[account])
    shake(document.querySelectorAll('main>*:first-child, main>*:last-child')[account])
    shake(document.querySelectorAll('main>*:first-child, main>*:last-child')[account])
  }
}


//beginning of event listeners

document.querySelectorAll('.deposit-button')[0].addEventListener('click',function(){depositMoney(0)});
document.querySelectorAll('.deposit-button')[1].addEventListener('click',function(){depositMoney(1)});
document.querySelectorAll('.withdraw-button')[0].addEventListener('click',function(){withdrawMoney(0);checkBalance(0)});
document.querySelectorAll('.withdraw-button')[1].addEventListener('click',function(){withdrawMoney(1);checkBalance(1)});


// beginning of shake function
var shakingElements = [];

var shake = function (element, magnitude = 20, angular = false) {
  //First set the initial tilt angle to the right (+1) 
  var tiltAngle = 1;

  //A counter to count the number of shakes
  var counter = 1;

  //The total number of shakes (there will be 1 shake per frame)
  var numberOfShakes = 15;

  //Capture the element's position and angle so you can
  //restore them after the shaking has finished
  var startX = 0,
      startY = 0,
      startAngle = 0;

  // Divide the magnitude into 10 units so that you can 
  // reduce the amount of shake by 10 percent each frame
  var magnitudeUnit = magnitude / numberOfShakes;

  //The `randomInt` helper function
  var randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //Add the element to the `shakingElements` array if it
  //isn't already there
  if(shakingElements.indexOf(element) === -1) {
    //console.log("added")
    shakingElements.push(element);

    //Add an `updateShake` method to the element.
    //The `updateShake` method will be called each frame
    //in the game loop. The shake effect type can be either
    //up and down (x/y shaking) or angular (rotational shaking).
    if(angular) {
      angularShake();
    } else {
      upAndDownShake();
    }
  }

  //The `upAndDownShake` function
  function upAndDownShake() {

    //Shake the element while the `counter` is less than 
    //the `numberOfShakes`
    if (counter < numberOfShakes) {

      //Reset the element's position at the start of each shake
      element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';

      //Reduce the magnitude
      magnitude -= magnitudeUnit;

      //Randomly change the element's position
      var randomX = randomInt(-magnitude, magnitude);
      var randomY = randomInt(-magnitude, magnitude);

      element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';

      //Add 1 to the counter
      counter += 1;

      requestAnimationFrame(upAndDownShake);
    }

    //When the shaking is finished, restore the element to its original 
    //position and remove it from the `shakingElements` array
    if (counter >= numberOfShakes) {
      element.style.transform = 'translate(' + startX + ', ' + startY + ')';
      shakingElements.splice(shakingElements.indexOf(element), 1);
    }
  }

  //The `angularShake` function
  function angularShake() {
    if (counter < numberOfShakes) {
      console.log(tiltAngle);
      //Reset the element's rotation
      element.style.transform = 'rotate(' + startAngle + 'deg)';

      //Reduce the magnitude
      magnitude -= magnitudeUnit;

      //Rotate the element left or right, depending on the direction,
      //by an amount in radians that matches the magnitude
      var angle = Number(magnitude * tiltAngle).toFixed(2);
      console.log(angle);
      element.style.transform = 'rotate(' + angle + 'deg)';
      counter += 1;

      //Reverse the tilt angle so that the element is tilted
      //in the opposite direction for the next shake
      tiltAngle *= -1;

      requestAnimationFrame(angularShake);
    }

    //When the shaking is finished, reset the element's angle and
    //remove it from the `shakingElements` array
    if (counter >= numberOfShakes) {
      element.style.transform = 'rotate(' + startAngle + 'deg)';
      shakingElements.splice(shakingElements.indexOf(element), 1);
      //console.log("removed")
    }
  }

};
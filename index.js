let currentTurn = 1;
let turnCounter = 1;

function endTurn() {
  turnCounter++;

  //cycle turns
  if (currentTurn == 1) {
    currentTurn = 2;
  } else {
    currentTurn = 1;
  }
  return turnCounter;
}

function updateTurnNumber() {
  // Return the current turn number.
  return turnCounter;
}

function resetTurnNumber() {
  turnCounter = 1;
  return turnCounter;
}

let plyC1 = "FF0000";
let plyC2 = "0091FF";

function activePlayer() {
  if (currentTurn == 1) {
    plyC1 = pickerP1.hsva.toRGBA().toString();
    // work out how to get the RGB color for the picker applied later. maybe store the value somehow?
  } else {
    plyC2 = pickerP2.hsva.toRGBA().toString();
  }
}

function resetBoard() {
  $('.cell').each((event) => {
    if ($(this).hasClass('x')) {
      $(this).removeClass('fa-times');
    } else if ($(this).hasClass('o')) {
      $(this).removeClass('fa-circle');
      $(this).addClass('fa-ticTacIcon');

      // Reset any uses of 'far' for the circle icons (Xs use 'fas', so we have to switch it each time)
      if ($(this).hasClass('far')) {
        $(this).removeClass('far');
        $(this).addClass('fas');
      }
    }
  });
}


$('button.cell').on("click", () => {
  let icon = $(this).find('i');
  
  if (icon.hasClass('fa-times') || icon.hasClass('fa-circle')) {
    // Do nothing if we already have an icon
  } else {
    if (currentTurn == 1) {
      icon.addClass('fa-times');
    } else if (currentTurn == 2) {
      icon.removeClass('fas');
      icon.addClass('far');
      icon.addClass('fa-circle');
    }
  }
});

// fa-times for Xs
// fa-circle for circles
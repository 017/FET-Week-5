let currentTurn = 1;
let turnCounter = 1;

let X = 'fa-times';
let O = 'fa-circle';

let p1Wins = 0;
let p2Wins = 0;
let ties = 0;
let winner = -1;

let tied = false;

let X_cells = [];
let O_cells = [];
let win_combos = [
  ['0', '1', '2'],
  ['3', '4', '5'],
  ['6', '7', '8'],
  ['0', '3', '6'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['0', '4', '8'],
  ['2', '4', '6']
];

const gameWinText = $('#ModalLabel');
const gameWinDesc = $('#winMessageText');
const gameWinBG = $('#bg-changer');
function updateWinnerText() {
  let tieTitle;
  let tieMessage;
  let winnerTitle;
  let winnerMessage;

  let player1WinBanners = [
    "./img/player1/win_01.jpg",
    "./img/player1/win_02.jpg",
    "./img/player1/win_03.jpg",
  ];
  let player2WinBanners = [
    "./img/player2/win_01.jpg",
    "./img/player2/win_02.jpg",
    "./img/player2/win_03.jpg",
  ];
  let tieBanners = [
    "./img/tie/tie_01.jpg",
    "./img/tie/tie_02.jpg",
    "./img/tie/tie_03.jpg",
  ];

  let tieTitles = [
    `Tie!`,
    `Tied!`,
    `Tie Game!`,
    `Draw!`,
    `It's a Draw!`,
    `Meow.`,
    `Cat's Game`
  ];
  
  let tieMessages = [
    `It's a Cat's Game!`,
    `The Game is a Tie!`,
    `Nobody Wins!`,
    `Guess what? You lost the Game.`,
    `The cat has the game!`,
    `Game Over: Tie!`
  ];

  let player1 = 'Player 1';
  let player1WinnerMessages = [
    `${player1} won!`,
    `${player1} won a tic tac toe game! Yay!`,
    `${player1} won, despite their best efforts!`,
    `${player1} lost! Not. Player ${winner} won.`,
    `${player1} takes another victory!`,
    `${player1} wins another victory!`,
    `${player1} is the victor!`
  ];

  let player1WinnerTitles = [
    `${player1} won!`,
    `${player1} wins!`,
    `${player1} won!`,
    `${player1} won!`,
    `${player1} is the winner!`,
  ];

  let player2 = 'Player 2';
  let player2WinnerMessages = [
    `${player2} won!`,
    `${player2} won a tic tac toe game! Yay!`,
    `${player2} won, despite their best efforts!`,
    `${player2} lost! Not. Player ${winner} won.`,
    `${player2} takes another victory!`,
    `${player2} wins another victory!`,
    `${player2} is the victor!`
  ];

  let player2WinnerTitles = [
    `${player2} won!`,
    `${player2} wins!`,
    `${player2} won!`,
    `${player2} won!`,
    `${player2} is the winner!`,
  ];

  if (winner == 1) {
    let indexT = Math.floor(Math.random() * player1WinnerTitles.length);
    let indexM = Math.floor(Math.random() * player1WinnerMessages.length);
    let indexBG = Math.floor(Math.random() * player1WinBanners.length);
    winnerTitle = player1WinnerTitles[indexT];
    winnerMessage = player1WinnerMessages[indexM];
    winnerBG = player1WinBanners[indexBG];
    gameWinText.html(winnerTitle);
    gameWinDesc.html(winnerMessage);
    gameWinBG.css("background-image", `url(${winnerBG})`);
  } else if (winner == 2) {
    let indexT = Math.floor(Math.random() * player2WinnerTitles.length);
    let indexM = Math.floor(Math.random() * player2WinnerMessages.length);
    let indexBG = Math.floor(Math.random() * player2WinBanners.length);
    winnerTitle = player2WinnerTitles[indexT];
    winnerMessage = player2WinnerMessages[indexM];
    winnerBG = player2WinBanners[indexBG];
    gameWinText.html(winnerTitle);
    gameWinDesc.html(winnerMessage);
    gameWinBG.css("background-image", `url(${winnerBG})`);
  } else if (tied) {
    let indexT = Math.floor(Math.random() * tieTitles.length);
    let indexM = Math.floor(Math.random() * tieMessages.length);
    let indexBG = Math.floor(Math.random() * tieBanners.length);
    tieTitle = tieTitles[indexT];
    tieMessage = tieMessages[indexM]
    tieBG = tieBanners[indexBG];
    gameWinText.html(tieTitle);
    gameWinDesc.html(tieMessage);
    gameWinBG.css("background-image", `url(${tieBG})`);
  }

}

$('#endGameModal').modal({ show: false});

function popGameEndMessage() {
  updateWinnerText();
  $('#endGameModal').modal('show');
}

// retrieve all IDs for the fontawesome classID, then dump it to one of the
function updateCellElements(classID) {
  // Reset X and O cells to blank, then fill them again
  let idArray = [];
  $('button.cell').each( function() {
    let icon = $(this).find('i');
    if ( icon.hasClass(classID) ) {
      idArray.push(icon.attr('id'));
      if (classID === "fa-times") {
        X_cells = idArray;
      } else if (classID === "fa-circle") {
        O_cells = idArray;
      }
    }
  } );
}

updateCellElements("fa-times");
updateCellElements("fa-circle");

function updateTurnCounter(playerName) {
  $('#currentTurnTracker').html(playerName);
}

let currentTurnDisplay = 'Player 1';
function endTurn() {
  turnCounter++;

  //cycle turns
  if (currentTurn == 1) {
    currentTurn = 2;
    currentTurnDisplay = `Player 2`;
    updateTurnCounter(currentTurnDisplay);
  } else {
    currentTurn = 1;
    currentTurnDisplay = `Player 1`;
    updateTurnCounter(currentTurnDisplay);
  }
  return turnCounter;
}
//$('#skipButton').on('click', endTurn());

function updateTurnNumber() {
  // Return the current turn number.
  return turnCounter;
}

function resetTurnNumber() {
  turnCounter = 1;
  return turnCounter;
}

function compareArrays(masterArr, checkingArr){
  if (masterArr.every(el => checkingArr.includes(el))) {
    return true;
  } else {
    return false;
  }
}



function checkWin() {

  // winners = [1, 2];
  // if (winners.every(el => el == winner)) {
  //   return true;
  // }

  win_combos.find((element, index, array) => {
    if ( winner == 1 || winner == 2 ) {
      return true;
    }
    
    if ( winner == -1 ) {
      if (compareArrays(array[index], X_cells)) {
        winner = 1;
      } else if (compareArrays(array[index], O_cells)) {
        winner = 2;
      } else if (tied) {
        winner = 0;
      }

      if (winner > 0) {
        if (winner == 1) {
          return true;
        } else if (winner == 2) {
          return true;
        } else if (winner == 0) {
          return false;
        } else {
          return false;
        }
      }
    }
  });
}

function checkTie() {
  let combined = O_cells.concat(X_cells);
  let amount = 0;

  tieTest = element => {
    if (compareArrays(element, combined)) {
      if (amount > 7) {
        tied = true;
        return true;
      } else {
        amount++;
        tied = false;
        return false;
      }
    } else {
      return false;
    }
  };

  return win_combos.find(tieTest);
}



function updateScore(amount, type) {
  if (type == 'tieType') {
    $('#tieTracker').html(`${amount}`);
  } else if (type == 'p1Type') {
    $('#p1ScoreTracker').html(`${amount}`);
  } else if (type == 'p2Type') {
    $('#p2ScoreTracker').html(`${amount}`);
  }
}

function endGame() {
  if (tied) {
    ties++;
    updateScore(ties, 'tieType');
    tied = false;
  } else {
    if (winner == 1) {
      updateScore(p1Wins, 'p1Type');
    } else if (winner == '2') {
      updateScore(p2Wins, 'p2Type');
    }
  }
  popGameEndMessage();
  
  winner = -1;
  // Add Prompt for Starting a New Game
  // Also add a 'new game' button
}

function turnCheck() {
  if (checkWin() === false) {
    // Just end the turn if the winner check returns false
    endTurn();
  } else if (winner > 0) {
    if (winner == 1) {
      p1Wins++;
      endGame();
    } else if (winner == 2) {
      p2Wins++;
      endGame();
    }
  } else if (tied) {
    endGame();
    // If the game is a cat's game(unwinnable)
  } else {
    endTurn();
  }
}

function resetBoard() {
  $('button.cell').each(function() {
    let resetIcon = $(this).find('i');
    if (resetIcon.hasClass('fa-times')) {
      resetIcon.removeClass('fa-times');
    } else if (resetIcon.hasClass('fa-circle')) {
      resetIcon.removeClass('fa-circle');

      // Reset any uses of 'far' for the circle icons (Circles use 'far', so we have to switch it back each time)
      if (resetIcon.hasClass('far')) {
        resetIcon.removeClass('far');
        resetIcon.addClass('fas');
      }
    }
  });
}

$(document).on('click', 'button.cell', function() {
  let icon = $(this).find('i');
  if (icon.hasClass('fa-times') || icon.hasClass('fa-circle')) {
    // Do nothing if we already have an icon
  } else {
    if (currentTurn == 1) {
      icon.addClass('fa-times');
      icon.addClass('iconP1');
      updateCellElements("fa-times");
      turnCheck();
    } else if (currentTurn == 2) {
      icon.removeClass('fas');
      icon.addClass('far');
      //icon.removeClass('fa-10x');
      icon.addClass('fa-circle');
      icon.addClass('iconP2');
      updateCellElements("fa-circle");
      turnCheck();
    }
  }
});
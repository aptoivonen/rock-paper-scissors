/* Plays 5 round game and reports winner at the end */
function game() {
  const CHOICES = new Map();
  CHOICES.set("ROCK", "SCISSORS");
  CHOICES.set("SCISSORS", "PAPER");
  CHOICES.set("PAPER", "ROCK");
  Object.freeze(CHOICES);
  let gameResult = {
    playerWins: 0,
    computerWins: 0,
    ties: 0,
  };
  const RESULTS = {
    PLAYER_WIN: "PLAYER_WIN",
    COMPUTER_WIN: "COMPUTER_WIN",
    TIE: "TIE",
  };
  Object.freeze(RESULTS);

  /* Plays one round of rps and returns string result */
  function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
      return RESULTS.TIE;
    } else if (CHOICES.get(playerSelection) === computerSelection) {
      return RESULTS.PLAYER_WIN;
    } else {
      return RESULTS.COMPUTER_WIN;
    }
  }

  function updateResult(gameResult, roundResult) {
    const newGameResult = {
      playerWins: gameResult.playerWins,
      computerWins: gameResult.computerWins,
      ties: gameResult.ties,
    };
    if (roundResult === RESULTS.TIE) newGameResult.ties++;
    else if (roundResult === RESULTS.PLAYER_WIN) newGameResult.playerWins++;
    else if (roundResult === RESULTS.COMPUTER_WIN) newGameResult.computerWins++;
    return newGameResult;
  }

  function textResult(result, playerSelection, computerSelection) {
    if (result === RESULTS.TIE) {
      return `Your ${playerSelection} equals computer's ${computerSelection}. A tie.`;
    } else if (result === RESULTS.PLAYER_WIN) {
      return `Your ${playerSelection} beats computer's ${computerSelection}! You won!`;
    } else if (result === RESULTS.COMPUTER_WIN) {
      return `Computer's ${computerSelection} beats your ${playerSelection}. You... have lost.`;
    } else {
      return "";
    }
  }

  /* Returns random game object */
  function computerPlay() {
    const randomChoice = Math.floor(Math.random() * CHOICES.size);
    const iterator = CHOICES.keys();
    for (i = 0; i < randomChoice; i++) {
      iterator.next();
    }
    return iterator.next().value;
  }

  function getUserChoice(round) {
    while (true) {
      let userInput = prompt(`Round ${round + 1}. Give choice:`);
      if (!userInput) return null;
      userInput = userInput.toUpperCase();
      if (CHOICES.get(userInput)) return userInput;
    }
  }

  for (let round = 0; round < 5; round++) {
    const userChoice = getUserChoice(round);
    const computerChoice = computerPlay();
    if (!userChoice) break;
    const roundResult = playRound(userChoice, computerChoice);
    gameResult = updateResult(gameResult, roundResult);
    console.log(textResult(roundResult, userChoice, computerChoice));
  }
  console.table(gameResult);
}

//game();

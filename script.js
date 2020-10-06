class GameData {
  constructor() {
    this.CHOICES = Object.freeze(
      new Map()
        .set("ROCK", "SCISSORS")
        .set("SCISSORS", "PAPER")
        .set("PAPER", "ROCK")
    );
    this.RESULTS = Object.freeze({
      PLAYER_WIN: "PLAYER_WIN",
      COMPUTER_WIN: "COMPUTER_WIN",
      TIE: "TIE",
    });
    this.gameResult = {
      playerWins: 0,
      computerWins: 0,
      ties: 0,
    };
    this.MAX_ROUNDS = 5;
    this.round = 1;
  }

  updateResult(roundResult) {
    let { gameResult, MAX_ROUNDS, RESULTS } = this;
    if (this.round >= MAX_ROUNDS) return;
    if (roundResult === RESULTS.TIE) gameResult.ties++;
    else if (roundResult === RESULTS.PLAYER_WIN) gameResult.playerWins++;
    else if (roundResult === RESULTS.COMPUTER_WIN) gameResult.computerWins++;
    this.round++;
  }

  isGameOver() {
    return this.round >= this.MAX_ROUNDS;
  }

  getFinalResult() {
    const { gameResult, RESULTS } = this;
    if (!this.isGameOver) return false;
    if (gameResult.playerWins > gameResult.computerWins)
      return RESULTS.PLAYER_WIN;
    else if (gameResult.playerWins < gameResult.computerWins)
      return RESULTS.COMPUTER_WIN;
    else return RESULTS.TIE;
  }

  reset() {
    this.gameResult = {
      playerWins: 0,
      computerWins: 0,
      ties: 0,
    };
    this.round = 1;
  }
}

const $ = function (id) {
  return document.getElementById(id);
};

/* Returns random game object */
const computerPlay = function () {
  const { CHOICES } = gameData;
  const randomChoice = Math.floor(Math.random() * CHOICES.size);
  const iterator = CHOICES.keys();
  for (i = 0; i < randomChoice; i++) {
    iterator.next();
  }
  return iterator.next().value;
};

/* Plays one round of rps and returns string result */
const playRound = function (playerSelection, computerSelection) {
  const { RESULTS, CHOICES } = gameData;
  if (playerSelection === computerSelection) {
    return RESULTS.TIE;
  } else if (CHOICES.get(playerSelection) === computerSelection) {
    return RESULTS.PLAYER_WIN;
  } else {
    return RESULTS.COMPUTER_WIN;
  }
};

const addResultClasses = function (
  roundResult,
  playerButtonId,
  computerButtonId
) {
  const { RESULTS } = gameData;
  if (roundResult === RESULTS.PLAYER_WIN) {
    $(playerButtonId).classList.add("winner-btn");
    $(computerButtonId).classList.add("loser-btn");
  } else if (roundResult === RESULTS.COMPUTER_WIN) {
    $(playerButtonId).classList.add("loser-btn");
    $(computerButtonId).classList.add("winner-btn");
  } else if (roundResult === RESULTS.TIE) {
    $(playerButtonId).classList.add("tie-btn");
    $(computerButtonId).classList.add("tie-btn");
  }
};

const updateRoundLabel = function () {
  $("round").textContent = gameData.round;
};

const updateWinLabels = function () {
  $("player-wins").textContent = gameData.gameResult.playerWins;
  $("computer-wins").textContent = gameData.gameResult.computerWins;
};

const showGameResult = function () {
  if (gameData.getFinalResult() === gameData.RESULTS.PLAYER_WIN) {
    $("winner").classList.remove("hidden");
    $("winner").classList.add("result-player");
  } else if (gameData.getFinalResult() === gameData.RESULTS.COMPUTER_WIN) {
    $("winner").classList.remove("hidden");
    $("winner").classList.add("result-computer");
  } else if (gameData.getFinalResult() === gameData.RESULTS.TIE) {
    $("tie").classList.remove("hidden");
  }
};

const COMPUTER_CHOICE_ID_MAP = Object.freeze(
  new Map()
    .set("ROCK", "computer-rock-btn")
    .set("PAPER", "computer-paper-btn")
    .set("SCISSORS", "computer-scissors-btn")
);

const resolveRound = function (playerSelection, playerButtonId) {
  const computerSelection = computerPlay();
  const roundResult = playRound(playerSelection, computerSelection);
  gameData.updateResult(roundResult);
  updateRoundLabel();
  updateWinLabels();
  const computerButtonId = COMPUTER_CHOICE_ID_MAP.get(computerSelection);
  addResultClasses(roundResult, playerButtonId, computerButtonId);
  if (gameData.isGameOver()) {
    showGameResult();
  }
};

const playerClick = function (event) {
  if (gameData.isGameOver()) return;
  let userChoise = PLAYER_ID_CHOICE_MAP.get(event.currentTarget.id);
  if (userChoise) {
    resolveRound(userChoise, event.currentTarget.id);
  }
};

const startNewGame = function () {
  gameData.reset();
  updateRoundLabel();
  updateWinLabels();
  $("winner").classList.add("hidden");
  $("winner").classList.remove("result-player");
  $("winner").classList.remove("result-computer");
  $("tie").classList.add("hidden");
};

const PLAYER_ID_CHOICE_MAP = Object.freeze(
  new Map()
    .set("player-rock-btn", "ROCK")
    .set("player-paper-btn", "PAPER")
    .set("player-scissors-btn", "SCISSORS")
);

const playArea = $("play-area");
playArea.addEventListener("transitionend", (event) => {
  event.target.classList.remove("winner-btn", "loser-btn", "tie-btn");
});

$("player-rock-btn").addEventListener("click", playerClick);
$("player-paper-btn").addEventListener("click", playerClick);
$("player-scissors-btn").addEventListener("click", playerClick);
$("new-game-btn").addEventListener("click", startNewGame);

const gameData = new GameData();

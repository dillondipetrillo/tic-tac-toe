const Gameboard = () => {
  // create empty array for board
  const _gameboard = Array(9).fill("");

  const getGameboard = () => _gameboard;

  return { getGameboard };
};

const Player = (name) => {
  return { name };
};

const DisplayController = (() => {
  // cache DOM elements
  const _sqaures = document.querySelectorAll(".square");
  const _playerxInput = document.getElementById("playerx");
  const _playeryInput = document.getElementById("playery");
  const _startBtn = document.querySelector(".start");
  const _resetBtn = document.querySelector(".reset");
  const _gameStatus = document.querySelector("#game-info p");

  const _boardModule = Gameboard();
  const _board = _boardModule.getGameboard();

  // create players
  const _playerX = Player("X");
  const _playerO = Player("O");

  let activePlayer = _playerX;
  let nonActivePlayer = _playerO;
  let activeGame = false;
  _gameStatus.textContent = "Press start...";

  // render a gameboard on DOM and add click event listeners
  const _renderBoard = () => {
    _sqaures.forEach((square, idx) => {
      square.addEventListener("click", _fillSquare);
      square.classList.add("btn");
      square.textContent = _board[idx];
      if (!activeGame) {
        square.removeEventListener("click", _fillSquare);
        square.classList.remove("btn");
      }
    });
  };

  // check if there's a winner or tie
  const _checkGameStatus = (playerMark) => {
    _gameStatus.textContent = `Turn: ${nonActivePlayer.name}`;

    // check for row one matches
    if (
      _board[0] === playerMark &&
      _board[1] === playerMark &&
      _board[2] === playerMark
    ) {
      endGame(playerMark);
      return;
    }

    // check for row two matches
    if (
      _board[3] === playerMark &&
      _board[4] === playerMark &&
      _board[5] === playerMark
    ) {
      endGame(playerMark);
      return;
    }

    // check for row three matches
    if (
      _board[6] === playerMark &&
      _board[7] === playerMark &&
      _board[8] === playerMark
    ) {
      endGame(playerMark);
      return;
    }

    // check column one for matches
    if (
      _board[0] === playerMark &&
      _board[3] === playerMark &&
      _board[6] === playerMark
    ) {
      endGame(playerMark);
      return;
    }

    // check column two for matches
    if (
      _board[1] === playerMark &&
      _board[4] === playerMark &&
      _board[7] === playerMark
    ) {
      endGame(playerMark);
      return;
    }

    // check column three for matches
    if (
      _board[2] === playerMark &&
      _board[5] === playerMark &&
      _board[8] === playerMark
    ) {
      endGame(playerMark);
      return;
    }

    // check for diagonal matches
    if (
      _board[0] === playerMark &&
      _board[4] === playerMark &&
      _board[8] === playerMark
    ) {
      endGame(playerMark);
      return;
    }

    if (
      _board[2] === playerMark &&
      _board[4] === playerMark &&
      _board[6] === playerMark
    ) {
      endGame(playerMark);
      return;
    }

    // check if it's a tie
    let count = 0;
    for (let i = 0; i < _board.length; i++) {
      if (_board[i] === "") {
        count++;
      }
    }

    if (count === 0) {
      endGame("tie");
      return;
    }
  };

  // end the game
  const endGame = (result) => {
    if (result === "tie") {
      _gameStatus.textContent = "It's a tie!";
    } else {
      _gameStatus.textContent = `${result} is the winner!`;
    }
    activeGame = false;
    return;
  };

  // Fill in square when clicked
  const _fillSquare = (e) => {
    if (e.target.textContent !== "") {
      return;
    }
    const dataIndex = e.target.dataset.index;
    _board[dataIndex] = activePlayer.name;
    _checkGameStatus(activePlayer.name);
    activePlayer = activePlayer === _playerX ? _playerO : _playerX;
    nonActivePlayer = nonActivePlayer === _playerO ? _playerX : _playerO;
    _renderBoard();
  };

  const _startGame = () => {
    updateGameStatus(activePlayer.name);
    activeGame = true;
    _startBtn.disabled = true;
    _resetBtn.disabled = false;
    _renderBoard();
  };

  const _resetGame = () => {
    activePlayer = _playerX;
    nonActivePlayer = _playerO;
    activeGame = false;
    _gameStatus.textContent = "Press start...";
    _sqaures.forEach((square, idx) => {
      square.textContent = "";
      _board[idx] = "";
      square.removeEventListener("click", _fillSquare);
      square.classList.remove("btn");
    });
    _startBtn.disabled = false;
    _resetBtn.disabled = true;
  };

  const updateGameStatus = (playerMark) => {
    _gameStatus.textContent = `Turn: ${playerMark}`;
  };

  _resetBtn.disabled = true;

  _startBtn.addEventListener("click", _startGame);
  _resetBtn.addEventListener("click", _resetGame);
})();

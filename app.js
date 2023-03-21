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

  const _boardModule = Gameboard();
  const _board = _boardModule.getGameboard();

  // create players
  const _playerX = Player("X");
  const _playerO = Player("O");

  let activePlayer = _playerX;
  let activeGame = true;

  // render a gameboard on DOM and add click event listeners
  const _renderBoard = () => {
    _sqaures.forEach((square, idx) => {
      square.addEventListener("click", _fillSquare);
      square.textContent = _board[idx];
      if (!activeGame) {
        square.removeEventListener("click", _fillSquare);
        square.classList.remove("btn");
      }
    });
  };

  // check if there's a winner or tie
  const _checkGameStatus = (playerMark) => {
    // check for row one matches
    if (
      _board[0] === playerMark &&
      _board[1] === playerMark &&
      _board[2] === playerMark
    ) {
      endGame(playerMark);
    }

    // check for row two matches
    if (
      _board[3] === playerMark &&
      _board[4] === playerMark &&
      _board[5] === playerMark
    ) {
      endGame(playerMark);
    }

    // check for row three matches
    if (
      _board[6] === playerMark &&
      _board[7] === playerMark &&
      _board[8] === playerMark
    ) {
      endGame(playerMark);
    }

    // check column one for matches
    if (
      _board[0] === playerMark &&
      _board[3] === playerMark &&
      _board[6] === playerMark
    ) {
      endGame(playerMark);
    }

    // check column two for matches
    if (
      _board[1] === playerMark &&
      _board[4] === playerMark &&
      _board[7] === playerMark
    ) {
      endGame(playerMark);
    }

    // check column three for matches
    if (
      _board[2] === playerMark &&
      _board[5] === playerMark &&
      _board[8] === playerMark
    ) {
      endGame(playerMark);
    }

    // check for diagonal matches
    if (
      _board[0] === playerMark &&
      _board[4] === playerMark &&
      _board[8] === playerMark
    ) {
      endGame(playerMark);
    }

    if (
      _board[2] === playerMark &&
      _board[4] === playerMark &&
      _board[6] === playerMark
    ) {
      endGame(playerMark);
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
    }
  };

  // end the game
  const endGame = (result) => {
    if (result === "tie") {
      console.log("It's a tie!");
    } else {
      console.log(`${result} is the winner!`);
    }
    activeGame = false;
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
    _renderBoard();
  };

  _renderBoard();
})();

const Gameboard = () => {
  // create empty array for board
  const _gameboard = Array(9).fill("");

  const getGameboard = () => _gameboard;

  return { getGameboard };
};

const Player = (name, username) => {
  return { name, username };
};

const DisplayController = (() => {
  // cache DOM elements
  const _sqaures = document.querySelectorAll(".square");
  let _playerxInput = document.getElementById("playerx");
  let _playeroInput = document.getElementById("playero");
  const _startBtn = document.querySelector(".start");
  const _resetBtn = document.querySelector(".reset");
  const _gameStatus = document.querySelector("#game-info p");
  const _aiSelect = document.getElementById("opponent");

  const _boardModule = Gameboard();
  const _board = _boardModule.getGameboard();

  // create players
  let _playerX = Player("X", _playerxInput.value);
  let _playerO = Player("O", _playeroInput.value);
  let useAI = false;

  let activePlayer = _playerX;
  let nonActivePlayer = _playerO;
  let activeGame = false;
  _gameStatus.textContent = "Press start...";

  // render a gameboard on DOM and add click event listeners
  const _renderBoard = () => {
    // do easy AI move
    useAI &&
    activePlayer === _playerO &&
    activeGame &&
    _aiSelect.value.toLowerCase() === "easy"
      ? easyAIMove()
      : null;

    // do hard AI move
    useAI &&
    activePlayer === _playerO &&
    activeGame &&
    _aiSelect.value.toLowerCase() === "hard"
      ? hardAIMove()
      : null;

    _sqaures.forEach((square, idx) => {
      if (useAI && activePlayer === _playerO) {
        square.removeEventListener("click", _fillSquare);
      } else {
        square.addEventListener("click", _fillSquare);
      }
      square.classList.add("btn");
      square.textContent = _board[idx];
      if (!activeGame) {
        square.removeEventListener("click", _fillSquare);
        square.classList.remove("btn");
      }
    });
  };

  // get open spots for AI
  const getOpenSpots = () => {
    let openSpots = [];
    _board.forEach((square, idx) => {
      if (square === "") {
        openSpots.push(idx);
      }
    });
    return openSpots;
  };

  // random AI move
  const easyAIMove = () => {
    // get available spaces
    let openSpots = getOpenSpots();

    // pick random index of available spaces
    const randomIndex = Math.floor(Math.random() * openSpots.length);
    const randomElem = _sqaures[openSpots[randomIndex]];

    // make AI move
    setTimeout(() => _fillSquare(randomElem), 900);
  };

  // minimax AI move
  const hardAIMove = () => {
    //
  };

  // check if there's a winner or tie
  const _checkGameStatus = (playerMark) => {
    _gameStatus.textContent = `Turn: ${
      nonActivePlayer.username !== ""
        ? nonActivePlayer.username
        : nonActivePlayer.name
    }`;

    // check for row one matches
    if (
      _board[0] === playerMark.name &&
      _board[1] === playerMark.name &&
      _board[2] === playerMark.name
    ) {
      endGame(playerMark);
      return true;
    }

    // check for row two matches
    if (
      _board[3] === playerMark.name &&
      _board[4] === playerMark.name &&
      _board[5] === playerMark.name
    ) {
      endGame(playerMark);
      return true;
    }

    // check for row three matches
    if (
      _board[6] === playerMark.name &&
      _board[7] === playerMark.name &&
      _board[8] === playerMark.name
    ) {
      endGame(playerMark);
      return true;
    }

    // check column one for matches
    if (
      _board[0] === playerMark.name &&
      _board[3] === playerMark.name &&
      _board[6] === playerMark.name
    ) {
      endGame(playerMark);
      return true;
    }

    // check column two for matches
    if (
      _board[1] === playerMark.name &&
      _board[4] === playerMark.name &&
      _board[7] === playerMark.name
    ) {
      endGame(playerMark);
      return true;
    }

    // check column three for matches
    if (
      _board[2] === playerMark.name &&
      _board[5] === playerMark.name &&
      _board[8] === playerMark.name
    ) {
      endGame(playerMark);
      return true;
    }

    // check for diagonal matches
    if (
      _board[0] === playerMark.name &&
      _board[4] === playerMark.name &&
      _board[8] === playerMark.name
    ) {
      endGame(playerMark);
      return true;
    }

    if (
      _board[2] === playerMark.name &&
      _board[4] === playerMark.name &&
      _board[6] === playerMark.name
    ) {
      endGame(playerMark);
      return true;
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
      return true;
    }

    return false;
  };

  // end the game
  const endGame = (result) => {
    if (result === "tie") {
      _gameStatus.textContent = "It's a tie!";
    } else {
      _gameStatus.textContent = `${
        result.username !== "" ? result.username : result.name
      } is the winner!`;
    }
    activeGame = false;
    return;
  };

  // Fill in square when clicked
  const _fillSquare = (e) => {
    let dataIndex;
    if (useAI && activePlayer === _playerO) {
      dataIndex = e.dataset.index;
    } else {
      if (e.target.textContent !== "") {
        return;
      }
      dataIndex = e.target.dataset.index;
    }
    _board[dataIndex] = activePlayer.name;
    _checkGameStatus(activePlayer);
    activePlayer = activePlayer === _playerX ? _playerO : _playerX;
    nonActivePlayer = nonActivePlayer === _playerO ? _playerX : _playerO;
    _renderBoard();
  };

  const _startGame = () => {
    // check if AI player should be used
    if (
      _aiSelect.value.toLowerCase() === "easy" ||
      _aiSelect.value.toLowerCase() === "hard"
    ) {
      useAI = true;
    }

    if (_playerX.username !== "") {
      updateGameStatus(activePlayer.username);
    } else {
      updateGameStatus(activePlayer.name);
    }
    activeGame = true;
    _startBtn.disabled = true;
    _resetBtn.disabled = false;
    _playerxInput.readOnly = true;
    _playeroInput.readOnly = true;
    _aiSelect.disabled = true;
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
    _playerxInput.readOnly = false;
    _playeroInput.readOnly = false;
    _aiSelect.disabled = false;
  };

  const updateGameStatus = (playerMark) => {
    _gameStatus.textContent = `Turn: ${playerMark}`;
  };

  _resetBtn.disabled = true;

  _startBtn.addEventListener("click", _startGame);
  _resetBtn.addEventListener("click", _resetGame);
  _playerxInput.addEventListener(
    "input",
    (e) => (_playerX.username = e.target.value)
  );
  _playeroInput.addEventListener(
    "input",
    (e) => (_playerO.username = e.target.value)
  );
  _aiSelect.addEventListener("change", (e) =>
    e.target.value.toLowerCase() === "easy" ||
    e.target.value.toLowerCase() === "hard"
      ? (useAI = true)
      : (useAI = false)
  );
})();

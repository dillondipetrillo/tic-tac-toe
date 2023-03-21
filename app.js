const Gameboard = () => {
  // create empty array for board
  const _gameboard = Array(9).fill("");

  const getGameboard = () => _gameboard;

  return {
    getGameboard,
  };
};

const Player = (name) => {
  return { name };
};

const DisplayController = (() => {
  // cache DOM elements
  const _sqaures = document.querySelectorAll(".square");

  const board = Gameboard();

  // create players
  const playerX = Player("X");
  const playerO = Player("O");

  // render a gameboard on DOM and add click event listeners
  const _renderBoard = () => {
    _sqaures.forEach((square, idx) => {
      square.addEventListener("click", _fillSquare);
      square.textContent = board[idx];
    });
  };

  // Fill in square when clicked
  const _fillSquare = (e, player) => {
    if (e.target.textContent !== "") {
      return;
    }
    const dataIndex = e.target.dataset.index;
    board[dataIndex] = dataIndex;
    _renderBoard();
  };

  _renderBoard();
})();

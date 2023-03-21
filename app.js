const Gameboard = (() => {
  // cache DOM elements
  const _sqaures = document.querySelectorAll(".square");

  const _gameboard = Array(9).fill("");

  // render a gameboard on DOM and add click event listeners
  const _renderBoard = () => {
    _sqaures.forEach((square, idx) => {
      square.addEventListener("click", _fillSquare);
      square.textContent = _gameboard[idx];
    });
  };

  // Fill in square when clicked
  const _fillSquare = (e) => {
    if (e.target.textContent !== "") {
      return;
    }
    const dataIndex = e.target.dataset.index;
    _gameboard[dataIndex] = dataIndex;
    _renderBoard();
  };

  _renderBoard();
})();

var canvas = document.getElementById("tictactoeCanvas");
var ctx = canvas.getContext("2d");
var isPlayer1 = true;
var cells = [];
var cellWidth = canvas.width / 3;
var cellHeight = canvas.height / 3;

function drawBoard() {
  var currentRow = 0;
  var currentColumn = 0;

  for (let i = 0; i <= 8; i++) {
    ctx.rect(
      currentColumn * cellWidth,
      currentRow * cellHeight,
      cellWidth,
      cellHeight
    );
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
    cells.push({
      x: currentColumn * cellWidth,
      y: currentRow * cellHeight,
      player: 0
    });
    currentColumn += 1;
    if (currentColumn >= 3) {
      currentColumn = 0;
      currentRow++;
    }
  }
}

function doMove(cell) {
  if (cell.player === 0) {
    if (isPlayer1) {
      cell.player = 1;
      drawCircle(cell.x, cell.y);
      isPlayer1 = !isPlayer1;
    } else {
      cell.player = 2;
      drawRect(cell.x, cell.y);
      isPlayer1 = !isPlayer1;
    }
  }
}

function drawRect(x, y) {
  var width = cellWidth / 2;
  var height = cellHeight / 2;
  var relativeWidth = cellWidth / 2 - width / 2;
  var relativeHeight = cellHeight / 2 - height / 2;

  ctx.beginPath();
  ctx.rect(x + relativeWidth, y + relativeHeight, width, height);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawCircle(x, y) {
  var radius = cellWidth / 4;
  var circleCenterX = cellWidth / 2;
  var circleCenterY = cellHeight / 2;

  ctx.beginPath();
  ctx.arc(x + circleCenterX, y + circleCenterY, radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function checkWinner() {
  var winner;
  winner = checkRows();
  if (winner !== 0) {
    declareWinnerOrTie(false, winner);
  } else {
    winner = checkColumns();
    if (winner !== 0) {
      declareWinnerOrTie(false, winner);
    } else {
      winner = checkDiagonals();
      if (winner !== 0) {
        declareWinnerOrTie(false, winner);
      }
    }
  }
}

function checkColumns() {
  var winner = 0;
  for (var i = 0; i < 3; i++) {
    winner = checkColumn(i);
    if (winner !== 0) {
      break;
    }
  }
  console.log(winner);
  return winner;
}

function checkColumn(y) {
  var winner = 1;
  var trackbeforePlayer = cells[y].player;
  for (var i = y + 3; i < 9; i = i + 3) {
    if (cells[i].player !== trackbeforePlayer || trackbeforePlayer === 0) {
      winner = 0;
    }
  }
  if (winner !== 0) {
    return trackbeforePlayer;
  }
  return winner;
}

function checkRows() {
  var winner = 0;
  for (var i = 0; i < 3; i++) {
    winner = checkRow(i * 3, 3 + i * 3);
    if (winner !== 0) {
      break;
    }
  }
  console.log(winner);
  return winner;
}

function checkRow(x, y) {
  var winner = 1;
  var trackbeforePlayer = cells[x].player;
  for (var i = x + 1; i < y; i++) {
    if (cells[i].player !== trackbeforePlayer || trackbeforePlayer === 0) {
      winner = 0;
    }
  }
  if (winner !== 0) {
    return trackbeforePlayer;
  }
  return winner;
}

function checkDiagonals() {
  var winner = 0;
  if (
    (cells[0].player === cells[4].player &&
      cells[4].player === cells[8].player &&
      cells[0].player !== 0) ||
    (cells[2].player === cells[4].player &&
      cells[4].player === cells[6].player &&
      cells[2].player !== 0)
  ) {
    winner = 1;
  }
  return winner;
}

function declareWinnerOrTie(checkTie, winner) {
  ctx.font = "80px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";

  if (!checkTie && winner !== "none") {
    ctx.fillText(
      "Player" + winner + " wins",
      canvas.width / 2,
      canvas.height / 2
    );
  } else if (checkTie && winner === "none") {
    ctx.fillText("Game is tied", canvas.width / 2, canvas.height / 2);
    setTimeout(reloadGame, 3000);
  }
}

function reloadGame() {
  document.location.reload();
}

function checkDraw() {
  var checkTie = true;
  cells.forEach(c => {
    if (c.player === 0) {
      checkTie = false;
    }
  });
  declareWinnerOrTie(checkTie, "none");
}

canvas.addEventListener("mousedown", function(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  var relativeY = e.clientY - canvas.offsetTop;
  var cell = getCellPosition(relativeX, relativeY);

  doMove(cell);
  checkWinner();
  checkDraw();
});

function getCellPosition(x, y) {
  var cell = new Object();
  cells.forEach(c => {
    if (c.x + cellWidth >= x && c.x <= x && c.y + cellWidth >= y && c.y <= y) {
      cell = c;
    }
  });
  return cell;
}

drawBoard();

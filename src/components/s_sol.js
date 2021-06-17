let res = {
  a: [],
  time: null,
  msg: null,
};

let solveSudoku = function (board) {
  let time = Date.now();
  let sudoku = board.map((row) => {
    return row.slice();
  });
  res.a = [];
  res.time = null;
  res.msg = null;

  solve(sudoku, 0);
  res.time = Date.now() - time;
  if (res.a.length === 0) {
    res.msg = "Sudoku can't be solved !! Try changing the elements.";
    res.time = null;
    console.log("in");
  }
  return res;
};

function solve(board, row) {
  let obj = { m: -1, n: -1 };

  for (let i = row; i < 9; i++) {
    for (let j = 0; j < 9; j++)
      if (board[i][j] === ".") {
        obj.m = i;
        obj.n = j;

        break;
      }
    if (obj.m !== -1) break;
  }
  // answer found
  if (obj.m === -1) {
    let arr = board.map((row) => {
      return row.slice();
    });
    res.a.push(arr);
    return;
  }
  for (let i = 1; i <= 9; i++) {
    if (canplace(board, obj.m, obj.n, i)) {
      board[obj.m][obj.n] = i.toString();
      solve(board, obj.m);
      board[obj.m][obj.n] = ".";
    }
  }
}
function canplace(board, row, col, val) {
  let str = val.toString();
  for (let i = 0; i < 9; i++) if (board[row][i] === str) return false;
  for (let i = 0; i < 9; i++) if (board[i][col] === str) return false;
  let box1 = Math.floor(row / 3);
  let box2 = Math.floor(col / 3);
  let i = box1 * 3;
  let j = box2 * 3;
  for (; i < (box1 + 1) * 3; i++)
    for (j = box2 * 3; j < (box2 + 1) * 3; j++)
      if (board[i][j] === str) return false;

  return true;
}

// solveSudoku([
//   ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//   ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//   [".", "9", "8", ".", ".", ".", ".", "6", "."],
//   ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//   ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//   ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//   [".", "6", ".", ".", ".", ".", "2", "8", "."],
//   [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//   [".", ".", ".", ".", "8", ".", ".", "7", "9"],
// ]);
export default solveSudoku;

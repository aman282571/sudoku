let res = {
  msg: null,
  err: null,
  row: null,
  col: null,
};

var isValidSudoku = function (board) {
  res.err = null;
  res.msg = null;
  res.m = null;
  res.n = null;
  let set = new Set();
  let curRowElem;
  let curColElem;
  let curBoxElem;
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[0].length; j += 1) {
      if (board[i][j] !== ".")
        if (board[i][j] !== "1")
          if (board[i][j] !== "2")
            if (board[i][j] !== "3")
              if (board[i][j] !== "4")
                if (board[i][j] !== "5")
                  if (board[i][j] !== "6")
                    if (board[i][j] !== "7")
                      if (board[i][j] !== "8")
                        if (board[i][j] !== "9") {
                          res.msg = "Validation Failed";
                          res.err =
                            "Sudoku element's value can be '  .  ' or between 1 to 9 only";
                          res.row = i;
                          res.col = j;
                          return res;
                        }
    }
  }
  let cnt = {
    count: 0,
  };
  if (res.msg === null)
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[0].length; j += 1) {
        if (board[i][j] === ".") {
          cnt.count++;
          continue;
        }
        curRowElem = `${board[i][j]} @ ${i}r`;
        curColElem = `${board[i][j]} @ ${j} c`;
        curBoxElem = `${board[i][j]} @ ${Math.floor(i / 3)},${Math.floor(
          j / 3
        )} b`;
        if (set.has(curRowElem)) {
          res.msg = "Validation Failed";
          res.err = "Found duplicate element";
          res.row = i;
          res.col = j;
          return res;
        }
        set.add(curRowElem);

        if (set.has(curColElem)) {
          res.msg = "Validation Failed";
          res.err = "Found duplicate element";
          res.row = i;
          res.col = j;
          return res;
        }
        set.add(curColElem);

        if (set.has(curBoxElem)) {
          res.msg = "Validation Failed";
          res.err = "Found duplicate element";
          res.row = i;
          res.col = j;
          return res;
        }
        set.add(curBoxElem);
      }
    }
  if (81 - cnt.count < 17) {
    res.msg = "Sudoku can't be solved";
    res.err = "Minimum number of clues should be 17";
    return res;
  }
  set.clear();
  res.msg = "Validation Successful";
  return res;
};
export default isValidSudoku;

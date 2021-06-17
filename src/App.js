import React, { useState, useEffect } from "react";
import isValidSudoku from "./components/s_val.js";

import solvesudoku from "./components/s_sol.js";
import "./app.css";
function App() {
  const [input, changeinput] = useState([
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    // ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    // ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    // [".", "9", "8", ".", ".", ".", ".", "6", "."],
    // ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    // ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    // ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    // [".", "6", ".", ".", ".", ".", "2", "8", "."],
    // [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    // [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ]);
  const [validation, changeval] = useState({
    msg: null,
    err: null,
    row: null,
    col: null,
  });
  const [ans, changeans] = useState({
    a: [],
    time: null,
    msg: null,
  });
  //---------------------------------reset------------------------------
  function reset() {
    changeans((prev) => {
      return { ...prev, a: [], time: null, msg: null };
    });
    changeinput([
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
    ]);
    changeval({
      msg: null,
      err: null,
      row: null,
      col: null,
    });
  }
  //-----------------------------------takeinput--------------------------
  function takeinput(e, rowIndex, colIndex) {
    let temp = input.map((row) => {
      return row.slice();
    });
    temp[rowIndex][colIndex] = e.target.innerText;

    changeinput(temp);
  }
  //-----------------on submitting the sudoku----------------
  function onsubmit() {
    let res = isValidSudoku(input);

    changeval(res);

    if (res.err === null) {
      let newres = solvesudoku(input);
      changeans((prev) => {
        return { ...prev, ...newres };
      });
    } else changeans({ a: [], time: null, msg: null });
  }
  useEffect(
    () =>
      alert(
        "Click on the boxes to enter the value. Valid input is from 1to 9 and '.'"
      ),
    []
  );
  return (
    <div id="container">
      <h1>Sudoku Solver</h1>
      {/* -----------------------------printing the input box---------------------------------- */}
      <div id="input">
        {input.map((row, rowIndex) => {
          return row.map((ele, colIndex) => {
            return (
              <p
                id={
                  validation.err !== null &&
                  validation.row === rowIndex &&
                  validation.col === colIndex
                    ? "error"
                    : ""
                }
                key={`${rowIndex},${colIndex}`}
                contenteditable="true"
                onKeyUp={(e) => takeinput(e, rowIndex, colIndex)}
              >
                {ele}
              </p>
            );
          });
        })}
      </div>
      {/* //----------------------buttons --------------------------------------- */}
      <div id="buttons">
        <p onClick={onsubmit}>Solve</p>
        <p onClick={reset}>Reset</p>
      </div>
      {/* //------------------------------messages-------------------------- */}
      <div id="msgs">
        {validation.msg !== null ? <p>{validation.msg}. </p> : ""}
        {validation.err !== null ? <p id="error"> {validation.err}. </p> : ""}
        {ans.msg !== null ? <p> {ans.msg}. </p> : ""}
        {ans.time !== null ? (
          <p id="solved">
            {" "}
            Sudoku solved in {ans.time}ms and has {ans.a.length} solutions.
          </p>
        ) : (
          ""
        )}
      </div>
      {/* //--------------------------------------------output the
      answer------------------------------ */}
      <div id="output">
        {ans.a.length >= 1
          ? ans.a.map((ans1) => {
              return (
                <div id="input">
                  {ans1.map((row, rowindex) => {
                    return row.map((ele, colindex) => {
                      return (
                        <p
                          key={`${rowindex},${colindex}`}
                          id={
                            input[rowindex][colindex] === "."
                              ? "solved"
                              : "given"
                          }
                        >
                          {ele}
                        </p>
                      );
                    });
                  })}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default App;

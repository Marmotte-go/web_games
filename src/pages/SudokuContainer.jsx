import React, {useEffect} from "react";
import { SudokuContext, ACTION_TYPES } from "../contexts/SudokuContext";
import { useState, useContext } from "react";
import Dialogue from "../components/Dialogue";

const SudokuContainer = () => {
  const { game, dispatch } = useContext(SudokuContext);
  const [win, setWin] = useState(false);
  const [level, setLevel] = useState("easy");

  const [openDialogue, setOpenDialogue] = useState(false);

  const handleCellClick = (i, j) => {
    //reset the focused cell
    dispatch({ type: ACTION_TYPES.RESET_FOCUS });
    dispatch({ type: ACTION_TYPES.SET_FOCUS, payload: { row: i, col: j } });
  };

  const handleInput = (i, j, v) => {
    dispatch({
      type: ACTION_TYPES.SET_INPUT,
      payload: { row: i, col: j, value: v },
    });
    handleCellClick(i, j);
  };

  const handleClear = () => {
    dispatch({ type: ACTION_TYPES.RESET_PUZZLE });
    setWin(false);
  };

  const handleNewGame = () => {
    setOpenDialogue(true);
  };

  const handleCheck = () => {
    dispatch({ type: ACTION_TYPES.RESET_FOCUS });
    dispatch({ type: ACTION_TYPES.CHECK_PUZZLE });
    let answer = "";
    game.inputs.map((row) => {
      row.map((cell) => {
        answer += cell.value;
      });
    });
    const isCorrect = answer == game.solution;
    setWin(isCorrect);
  };

  const handleStart = () => {
    dispatch({ type: ACTION_TYPES.SET_PUZZLE, payload: level });
    setWin(false);
    setOpenDialogue(false);
  };

  const handleSelect = (e) => {
    setLevel(e.target.value);
  };

  const handleCancel = () => {
    setOpenDialogue(false);
  };

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.SET_PUZZLE, payload: 'easy' });
  }, []);

  return (
    <div className="sudoku-container">
      {openDialogue && (
        <Dialogue>
          <h1>Sudoku Levels</h1>
          <div className="options">
            <label
              htmlFor="easy"
              className={level === "easy" ? "selected" : ""}
            >
              <input
                type="radio"
                id="easy"
                name="option"
                value="easy"
                onChange={handleSelect}
              />
              Easy
            </label>

            <label
              htmlFor="medium"
              className={level === "medium" ? "selected" : ""}
            >
              <input
                type="radio"
                id="medium"
                name="option"
                value="medium"
                onChange={handleSelect}
              />
              Medium
            </label>

            <label
              htmlFor="hard"
              className={level === "hard" ? "selected" : ""}
            >
              <input
                type="radio"
                id="hard"
                name="option"
                value="hard"
                onChange={handleSelect}
              />
              Hard
            </label>

            <label
              htmlFor="expert"
              className={level === "expert" ? "selected" : ""}
            >
              <input
                type="radio"
                id="expert"
                name="option"
                value="expert"
                onChange={handleSelect}
              />
              Expert
            </label>
          </div>
          <div className="buttons">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleStart}>Start</button>
          </div>
        </Dialogue>
      )}
      <div className="sudoku-wrapper">
        {win && (
          <div className="win">
            <h1>You Win!🥳</h1>
          </div>
        )}
        <h1>Sudoku <span>{game.difficulty}</span></h1>
        <div className="sudoku-grid">
          {game.inputs.map((row, i) => {
            return (
              <div className="sudoku-row" key={i}>
                {row.map((cell, j) => {
                  return (
                    <div
                      className={`sudoku-cell 
                  ${cell.isFixed && "fixed"} 
                  ${cell.isHighlighted && "highlighted"} 
                  ${cell.isFocused && "focused"} 
                  ${cell.isSameNumber && "same-number"} 
                  ${cell.isRed && "red"}`}
                      key={`${i}-${j}`}
                      onClick={() => handleCellClick(i, j)}
                    >
                      <input
                        id={`input-${i}-${j}`}
                        type="text"
                        maxLength="1"
                        disabled={cell.isFixed}
                        value={cell.value || ""}
                        onChange={(e) => handleInput(i, j, e.target.value)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="buttons">
          <button className="btn" onClick={handleCheck}>
            Check
          </button>
          <button className="btn" onClick={handleClear}>
            Clear
          </button>
          <button className="btn" onClick={handleNewGame}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default SudokuContainer;

import React from "react";
import "./Sudoku.scss";
import { SudokuProvider } from "../contexts/SudokuContext";
import SudokuContainer from "./SudokuContainer";

const Sudoku = () => {
  return (
    <SudokuProvider>
      <div className="sudoku">
        <SudokuContainer />
      </div>
    </SudokuProvider>
  );
};

export default Sudoku;

import { createContext, useReducer } from "react";
import { getSudoku } from "sudoku-gen";

function str2arr(str) {
  const arr = str.split("");
  for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "-") {
          arr[i] = null;
      }
  }
  const newArr = [];
  for (let i = 0; i < arr.length; i += 9) {
      newArr.push(arr.slice(i, i + 9));
  }
  return newArr;
}

export const ACTION_TYPES = {
  SET_PUZZLE: "SET_PUZZLE",
  RESET_PUZZLE: "RESET_PUZZLE",
  SET_INPUT: "SET_INPUT",
  SET_FOCUS: "SET_FOCUS",
  RESET_FOCUS: "RESET_FOCUS",
  CHECK_PUZZLE: "CHECK_PUZZLE",
}

export const SudokuContext = createContext();

export const SudokuProvider = ({ children }) => {
    const initialState = {
        puzzle: Array.from({ length: 9 }, () =>
            Array.from({ length: 9 }, () => null)),
        solution: "",
        difficulty: "",
        inputs: Array.from({ length: 9 }, () =>
            Array.from({ length: 9 }, () => {
                return {
                    value: null,
                    isFixed: false,
                    isHighlighted: false,
                    isFocused: false,
                    isSameNumber: false,
                    isRed: false,
                }
            })
        ),
    }

    const generatePuzzle = (level) => {
        const sudoku = getSudoku(level); //get the puzzle as a string, length 81, hidden numbers are represented by "-"
        //convert the string to a 2d array
        const puzzle = str2arr(sudoku.puzzle);
        const difficulty = sudoku.difficulty;
        const newInput = str2arr(sudoku.puzzle);
        const inputs = Array.from({ length: 9 }, () =>
            Array.from({ length: 9 }, () => {
                return {
                    value: null,
                    isFixed: false,
                    isHighlighted: false,
                    isFocused: false,
                    isSameNumber: false,
                    isRed: false,
                };
            })
        );
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                inputs[i][j].value = newInput[i][j];
                if (puzzle[i][j]) {
                    inputs[i][j].isFixed = true;
                }
            }
        }

        return { puzzle, solution:sudoku.solution, inputs, difficulty };
    }

    const isSameNumberInRowColBox = (inputs, row, col, value) => {
        //check if there are two same numbers in the same row, col, or box
        for (let i = 0; i < 9; i++) {
            if (inputs[row][i].value === value && i !== col) {
                return true;
            }
            if (inputs[i][col].value === value && i !== row) {
                return true;
            }
        }
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (inputs[i][j].value === value && i !== row && j !== col) {
                    return true;
                }
            }
        }
        return false;
    }


    const sudokuReducer = (state, action) => {
        switch (action.type) {
            case ACTION_TYPES.SET_PUZZLE:
                return {
                    ...state,
                    ...generatePuzzle(action.payload),
                }

            case ACTION_TYPES.RESET_PUZZLE:
                return {
                    ...state,
                    inputs: state.inputs.map((row, i) =>
                        row.map((cell, j) => {
                            return {
                                ...cell,
                                value: state.puzzle[i][j],
                                isFixed: state.puzzle[i][j] !== null,
                                isHighlighted: false,
                                isFocused: false,
                                isSameNumber: false,
                                isRed: false,
                            }
                        })
                    ),
                }
            case ACTION_TYPES.SET_INPUT:
                return {
                    ...state,
                    inputs: state.inputs.map((row, i) =>
                        row.map((cell, j) => {
                            if (i === action.payload.row && j === action.payload.col) {
                                if (!/^[1-9]$/.test(action.payload.value)) {
                                    return {
                                        ...cell,
                                        value: null,
                                    };
                                }
                                return {
                                    ...cell,
                                    value: action.payload.value,
                                };
                            }
                            return cell;
                        })
                    ),
                }


            case ACTION_TYPES.SET_FOCUS:
                return {
                    ...state,
                    inputs: state.inputs.map((row, i) =>
                        row.map((cell, j) => {
                            return {
                                ...cell,
                                isHighlighted:
                                    action.payload.row === i ||
                                    action.payload.col === j ||
                                    (Math.floor(action.payload.row / 3) ===
                                        Math.floor(i / 3) &&
                                        Math.floor(action.payload.col / 3) ===
                                        Math.floor(j / 3)),
                                isFocused:
                                    action.payload.row === i &&
                                    action.payload.col === j,
                                isSameNumber:
                                    state.inputs[i][j].value ===
                                    state.inputs[action.payload.row][action.payload.col].value,
                            }
                        })
                    ),
                }

            case ACTION_TYPES.RESET_FOCUS:
                return {
                    ...state,
                    inputs: state.inputs.map((row) =>
                        row.map((cell) => {
                            return {
                                ...cell,
                                isHighlighted: false,
                                isFocused: false,
                                isSameNumber: false,
                                isRed: false,
                            }
                        })
                    ),
                }
            case ACTION_TYPES.CHECK_PUZZLE:
                return {
                    ...state,
                    inputs: state.inputs.map((row, i) =>
                        row.map((cell, j) => {
                            return {
                                ...cell,
                                //if the cell is empty, it is red
                                isRed: !Boolean(state.inputs[i][j].value) || isSameNumberInRowColBox(state.inputs, i, j, state.inputs[i][j].value),
                            }
                        })
                    ),
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(sudokuReducer, initialState)

    return (
        <SudokuContext.Provider value={{ game: state, dispatch }}>
            {children}
        </SudokuContext.Provider>
    )
}
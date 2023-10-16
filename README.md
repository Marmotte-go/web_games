# About this web games project

I am planning to build some simple webpage games, mainly the logical puzzles like sudoku, minesweeper. So I can use React only, no need for special game modules. I already finnished Sudoku, and Minesweeper is on the way.

## Sudoku

> I do not own the algorithm of sudoku generator, it is make by https://github.com/petewritescode.

This game is built by React.js, react-router-dom, and SCSS. It is running purely on client-side, so players can easily cheat by finding the solution using developer tool on some browsers. But since this game is only for fun, not for sudoku competation, so it is not a big problem.

### Features

The game control is very simple. When open the page, it will generate an easy level game automatically, players can change the level by creating a new game anytime. Then just fill in numbers, when user click on a cell, the cells in same row, column and box will highlight. If this cell has a number already, the same number on the whole game board will also highlight. 

There are 3 buttons to control the game, one is check, this function will check is the answer is true, if it is the solution, the game will end and show some ~~stupid~~ encouraging congratulations. If the answer is wrong, it will show the conflicting cells and incomplete cells.

Second buitton is clear. It will simply delete all the numbers user filled, reset the whole board. Third button is New Game, user can choose difficulties here.

### How I built

1. Creating the game board. It is a 9 by 9 2D array, then add styles for the cells in css.
2. Using Context and Reducer together to control the game. This part is the core of this project, I set 6 actions:
> **SET_PUZZLE**: this action will generate a new puzzle. I use it in two places, one is in useEffect, so when use open a new page and refresh the page, this action will be called. second one is the start button click, so user can manually start a new game.
> 
> **RESET_PUZZLE**: this action is the implementation of Clear button, it simply reset everything to the initial state.
> 
> **SET_INPUT**: this action will store the new input. This is a bit complicated because to change a certain value in the sate without changing other values, I have to deep copy everything. So for the 9 by 9 cells, I use Array.prototype.map() method to check every cell's indeices, if it equals to the input, I changed the value to payload value, then return the cell, otherwise (for other 80 cells) I simply return the cell. I am not sure if there is another faster way, because this way is for sure not the most efficient one. Because for every input, I have to do a 81 steps loop and 81 times if check.
> 
> **SET_FOCUS**: when user click any cell, this action will set the focus to that cell, and hightlight all the cells in the same row, col, box and same number.
> 
> **RESET_FOCUS**: this is used before calling SET_FOCUS or CHECK_PUZZLE, to clear the focus.
> 
> **CHECK_PUZZLE**: this action will call a function to check is there same number in the same row. col, box and if there is any empty cells. All those cells will be marked as red. 
3. To acheive all the actions above, each cell is also an object with many parameters.
> value: the numver of the cell
> 
> **isFixed**: if this cell is already filled by the puzzle, then it is fixed. This value cannot be changed during a game;
>
> **isHighlighted**: click any cell will cause some cells become hightlighted. SET_FOCUS action will changed this value;
>
> **isFocused**: this value is false by default. When a cell is clicked, this value will turn to true, and it will turn to false after action RESET_FOCUS;
>
> **isSameNumber**: SET_FOCUS action will also change this value.
>
> **isRed**: CHECK_PUZZLE action will change this value.

4. Add some other small UX features.
   After click the check button, if the solution is the same with answer, another state isWin will be set to true, a cute animation will be triggered.
   Click the start button, a basic dialog will show up to start a new game.

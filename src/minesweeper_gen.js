function generateMinesweeperMap(difficulty, firstClick) {
  // Define difficulty levels: rows, columns, and bomb count
  const difficulties = {
    easy: { rows: 8, columns: 8, bombs: 10 },
    medium: { rows: 12, columns: 12, bombs: 20 },
    hard: { rows: 16, columns: 16, bombs: 40 }
  };

  const { rows, columns, bombs } = difficulties[difficulty];
  
  // Create an empty 2D array representing the Minesweeper grid
  const grid = new Array(rows).fill(0).map(() => new Array(columns).fill(0));

  // Place bombs randomly
  for (let i = 0; i < bombs; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * rows);
      col = Math.floor(Math.random() * columns);
    } while (grid[row][col] === 0 || (row === firstClick[0] && col === firstClick[1]));
    grid[row][col] = 0; // Place bomb
  }

  // Calculate numbers for neighboring cells
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (grid[row][col] !== 0) {
        let bombCount = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns && grid[newRow][newCol] === 0) {
              bombCount++;
            }
          }
        }
        grid[row][col] = bombCount;
      }
    }
  }

  return grid;
}

// Example usage
const difficulty = 'medium';
const firstClickPosition = [5, 5];
const minesweeperMap = generateMinesweeperMap(difficulty, firstClickPosition);
console.log(minesweeperMap);

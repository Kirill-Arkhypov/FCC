function SudokuSolver() {
  let puzzleTable;

  function checkCandidate(num, row, col) {
    for (let i = 0; i < 9; i++) {
      const bIndex =
        (Math.floor(row / 3) * 3 + Math.floor(i / 3)) * 9 +
        Math.floor(col / 3) * 3 +
        (i % 3);
      if (
        num == puzzleTable[row * 9 + i] ||
        num == puzzleTable[col + i * 9] ||
        num == puzzleTable[bIndex]
      ) {
        return false;
      }
    }
    return true;
  }

  function getCandidate(index) {
    if (index >= puzzleTable.length) {
      return true;
    } else if (puzzleTable[index] != 0) {
      return getCandidate(index + 1);
    }

    for (let i = 1; i <= 9; i++) {
      if (checkCandidate(i, Math.floor(index / 9), index % 9)) {
        puzzleTable[index] = i;
        if (getCandidate(index + 1)) {
          return true;
        }
      }
    }

    puzzleTable[index] = 0;
    return false;
  }

  function chunkInGroups(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i += 9) {
      result.push(arr.slice(i, i + 9));
    }
    return result;
  }

  this.solve = (puzzle) => {
    puzzleTable = puzzle.split('').map((e) => (e === '.' ? 0 : +e));

    return getCandidate(0)
      ? chunkInGroups(puzzleTable).flat().join('')
      : 'No solution found';
  };
}

export default SudokuSolver;

import Tile from './tile';

class Grid {
  constructor(size, previousState) {
    this.size = size;
    this.cells = previousState ? this.fromState(previousState) : this.empty();
  }

  // Build a grid of the specified size
  empty() {
    const cells = [];

    for (let x = 0; x < this.size; x += 1) {
      cells[x] = [];
      for (let y = 0; y < this.size; y += 1) {
        cells[x].push(null);
      }
    }

    return cells;
  }

  fromState(state) {
    const cells = [];

    for (let x = 0; x < this.size; x += 1) {
      cells[x] = [];
      for (let y = 0; y < this.size; y += 1) {
        const tile = state[x][y];
        cells[x].push(tile ? new Tile(tile.position, tile.value) : null);
      }
    }

    return cells;
  }

  // Find the first available random position
  randomAvailableCell() {
    const cells = this.availableCells();
    return cells[Math.floor(Math.random() * cells.length)];
  }

  availableCells() {
    const cells = [];

    this.eachCell((x, y, tile) => {
      if (!tile) cells.push({ x, y });
    });

    return cells;
  }

  // Call callback for every cell
  eachCell(callback) {
    for (let x = 0; x < this.size; x += 1) {
      for (let y = 0; y < this.size; y += 1) {
        callback(x, y, this.cells[x][y]);
      }
    }
  }

  // Check if there are any cells available
  cellsAvailable() {
    return !!this.availableCells().length;
  }

  // Check if the specified cell is taken
  cellAvailable(cell) {
    return !this.cellOccupied(cell);
  }

  cellOccupied(cell) {
    return !!this.cellContent(cell);
  }

  cellContent(cell) {
    if (this.withinBounds(cell)) {
      return this.cells[cell.x][cell.y];
    }
    return null;
  }

  // Inserts a tile at its position
  insertTile(tile) {
    this.cells[tile.x][tile.y] = tile;
  }

  removeTile(tile) {
    this.cells[tile.x][tile.y] = null;
  }

  withinBounds(position) {
    return position.x >= 0 && position.x < this.size && position.y >= 0 && position.y < this.size;
  }

  serialize() {
    const cellState = [];

    for (let x = 0; x < this.size; x += 1) {
      cellState[x] = [];

      for (let y = 0; y < this.size; y += 1) {
        cellState[x].push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
      }
    }

    return {
      size: this.size,
      cells: cellState,
    };
  }
}

export default Grid;

import React from 'react';
import PropTypes from 'prop-types';

import { useGameData } from '../context/gameData';
import * as util from '../util';
import Grid from '../game/grid';
import Tile from '../game/tile';
import KeyboardInputManager from '../game/keyboardInputManager';
import Actuator from '../game/actuator';

class Game extends React.Component {
  componentDidMount() {
    window.requestAnimationFrame(() => this.initGame());
  }

  setupGame() {
    const { gameSize, updateGameData } = this.props;
    this.grid = new Grid(gameSize);
    updateGameData({
      score: 0,
      over: false,
      won: false,
      keepPlaying: false,
    });
    this.addStartTiles();
    this.actuate();
  }

  loadGame() {
    const { grid } = this.props;

    if (grid.size && grid.cells) {
      this.grid = new Grid(grid.size, grid.cells);
      this.actuate();
    } else {
      this.setupGame();
    }
  }

  initGame() {
    const { startType } = this.props;
    this.inputManager = new KeyboardInputManager(this.move.bind(this));
    this.actuator = new Actuator(this.tileContainer);

    switch (startType) {
      case 'load':
        this.loadGame();
        break;
      case 'new':
      default:
        this.setupGame();
        break;
    }
  }

  addStartTiles() {
    const { startTiles } = this.props;

    for (let i = 0; i < startTiles; i += 1) {
      this.addRandomTile();
    }
  }

  addRandomTile() {
    if (this.grid.cellsAvailable()) {
      const value = Math.random() < 0.9 ? 2 : 4;
      const tile = new Tile(this.grid.randomAvailableCell(), value);

      this.grid.insertTile(tile);
    }
  }

  actuate() {
    const {
      score, bestScore, over, won, keepPlaying, updateGameData,
    } = this.props;

    if (score > bestScore) updateGameData({ bestScore: score, grid: this.grid.serialize() });
    else updateGameData({ grid: this.grid.serialize() });
    this.actuator.actuate(this.grid, {
      score,
      over,
      won,
      keepPlaying,
    });
  }

  prepareTiles() {
    this.grid.eachCell((x, y, tile) => {
      if (tile) {
        tile.setMergedFrom(null);
        tile.savePosition();
      }
    });
  }

  moveTile(tile, cell) {
    this.grid.cells[tile.x][tile.y] = null;
    this.grid.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
  }

  move(direction) {
    // 0: up, 1: right, 2: down, 3: left
    const { score, terminated, updateGameData } = this.props;

    if (terminated) return; // Don't do anything if the game's over

    let cell;
    let tile;

    const vector = util.getVector(direction);
    const traversals = this.buildTraversals(vector);
    let moved = false;

    // Save the current tile positions and remove merger information
    this.prepareTiles();

    // Traverse the grid in the right direction and move tiles
    traversals.x.forEach((x) => {
      traversals.y.forEach((y) => {
        cell = { x, y };
        tile = this.grid.cellContent(cell);

        if (tile) {
          const positions = this.findFarthestPosition(cell, vector);
          const next = this.grid.cellContent(positions.next);

          // Only one merger per row traversal?
          if (next && next.value === tile.value && !next.mergedFrom) {
            const merged = new Tile(positions.next, tile.value * 2);
            merged.mergedFrom = [tile, next];

            this.grid.insertTile(merged);
            this.grid.removeTile(tile);

            // Converge the two tiles' positions
            tile.updatePosition(positions.next);

            // Update the score
            updateGameData({ score: score + merged.value });

            // The mighty 2048 tile
            if (merged.value === 2048) updateGameData({ won: true });
          } else {
            this.moveTile(tile, positions.farthest);
          }
          if (cell.x !== tile.x || cell.y !== tile.y) {
            moved = true; // The tile moved from its original cell!
          }
        }
      });
    });
    if (moved) {
      this.addRandomTile();
      if (!this.movesAvailable()) {
        updateGameData({ over: true }); // Game over!
      }
      this.actuate();
    }
  }

  buildTraversals(vector) {
    const { gameSize } = this.props;
    const traversals = { x: [], y: [] };

    for (let pos = 0; pos < gameSize; pos += 1) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
  }

  findFarthestPosition(cell, vector) {
    let farthest;
    let next = { ...cell };

    // Progress towards the vector direction until an obstacle is found
    do {
      farthest = { ...next };
      next = { x: farthest.x + vector.x, y: farthest.y + vector.y };
    } while (this.grid.withinBounds(next) && this.grid.cellAvailable(next));

    return { farthest, next };
  }

  movesAvailable() {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
  }

  tileMatchesAvailable() {
    const { gameSize } = this.props;
    let tile;

    for (let x = 0; x < gameSize; x += 1) {
      for (let y = 0; y < gameSize; y += 1) {
        tile = this.grid.cellContent({ x, y });

        if (tile) {
          for (let direction = 0; direction < 4; direction += 1) {
            const vector = util.getVector(direction);
            const cell = { x: x + vector.x, y: y + vector.y };

            const other = this.grid.cellContent(cell);

            if (other && other.value === tile.value) {
              return true; // These two tiles can be merged
            }
          }
        }
      }
    }

    return false;
  }

  makeGridContainer() {
    const { gameSize } = this.props;
    const row = [];
    const grid = [];
    for (let i = 0; i < gameSize; i += 1) {
      row.push(<div key={i} className="grid-cell" />);
    }
    for (let i = 0; i < gameSize; i += 1) {
      grid.push(
        <div key={i} className="grid-row">
          {row}
        </div>,
      );
    }
    return grid;
  }

  render() {
    return (
      <div className="game-container">
        <div className="grid-container">{this.makeGridContainer()}</div>
        <div
          className="tile-container"
          ref={(ref) => {
            this.tileContainer = ref;
          }}
        />
      </div>
    );
  }
}

Game.propTypes = {
  startType: PropTypes.string.isRequired,
  gameSize: PropTypes.number.isRequired,
  startTiles: PropTypes.number.isRequired,
  grid: PropTypes.objectOf(PropTypes.any).isRequired,
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
  over: PropTypes.bool.isRequired,
  won: PropTypes.bool.isRequired,
  terminated: PropTypes.bool.isRequired,
  keepPlaying: PropTypes.bool.isRequired,
  updateGameData: PropTypes.func.isRequired,
};

export default useGameData(({ state, actions }) => ({
  gameSize: state.gameSize,
  startTiles: state.startTiles,
  grid: state.grid,
  score: state.score,
  bestScore: state.bestScore,
  over: state.over,
  won: state.won,
  terminated: state.terminated,
  keepPlaying: state.keepPlaying,
  updateGameData: actions.updateGameData,
}))(Game);

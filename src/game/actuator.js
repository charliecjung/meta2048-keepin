class Actuator {
  constructor(tileContainer) {
    this.tileContainer = tileContainer;
    this.scoreContainer = document.querySelector('.score-container');
    this.score = 0;
  }

  actuate(grid, metadata) {
    window.requestAnimationFrame(() => {
      while (this.tileContainer.firstChild) {
        this.tileContainer.removeChild(this.tileContainer.firstChild);
      }

      grid.cells.forEach((column) => {
        column.forEach((cell) => {
          if (cell) {
            this.addTile(cell);
          }
        });
      });

      this.showGetScore(metadata.score);
    });
  }

  addTile(tile) {
    const wrapper = document.createElement('div');
    const inner = document.createElement('div');
    const position = tile.previousPosition || { x: tile.x, y: tile.y };
    const positionClass = `tile-position-${position.x + 1}-${position.y + 1}`;

    // We can't use classlist because it somehow glitches when replacing classes
    const classes = ['tile', `tile-${tile.value}`, positionClass];

    if (tile.value > 2048) classes.push('tile-super');

    wrapper.setAttribute('class', classes.join(' '));

    inner.classList.add('tile-inner');
    inner.textContent = tile.value;

    if (tile.previousPosition) {
      // Make sure that the tile gets rendered in the previous position first
      window.requestAnimationFrame(() => {
        classes[2] = `tile-position-${tile.x + 1}-${tile.y + 1}`;
        wrapper.setAttribute('class', classes.join(' ')); // Update the position
      });
    } else if (tile.mergedFrom) {
      classes.push('tile-merged');
      wrapper.setAttribute('class', classes.join(' '));

      // Render the tiles that merged
      tile.mergedFrom.forEach((merged) => {
        this.addTile(merged);
      });
    } else {
      classes.push('tile-new');
      wrapper.setAttribute('class', classes.join(' '));
    }

    // Add the inner part of the tile to the wrapper
    wrapper.appendChild(inner);

    // Put the tile on the board
    this.tileContainer.appendChild(wrapper);
  }

  showGetScore(score) {
    const scoreAddition = document.querySelector('.score-addition');
    if (scoreAddition) this.scoreContainer.removeChild(scoreAddition);

    const difference = score - this.score;
    this.score = score;

    if (difference > 0) {
      const addition = document.createElement('div');
      addition.classList.add('score-addition');
      addition.textContent = `+${difference}`;

      this.scoreContainer.appendChild(addition);
    }
  }
}

export default Actuator;

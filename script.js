class TicTacToe {
  constructor() {
    this.board = Array(9).fill("")
    this.currentPlayer = "X"
    this.gameActive = true
    this.cells = document.querySelectorAll(".cell")
    this.status = document.getElementById("status")
    this.resetBtn = document.getElementById("resetBtn")

    this.winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ]

    this.initializeGame()
  }

  initializeGame() {
    this.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => this.handleCellClick(index))
    })

    this.resetBtn.addEventListener("click", () => this.resetGame())
    this.updateStatus(`Player ${this.currentPlayer}'s turn`)
  }

  handleCellClick(index) {
    if (this.board[index] !== "" || !this.gameActive) {
      return
    }

    this.board[index] = this.currentPlayer
    this.cells[index].textContent = this.currentPlayer
    this.cells[index].classList.add(this.currentPlayer === "X" ? "player-x" : "player-o")

    if (this.checkWinner()) {
      this.gameActive = false
      this.updateStatus(`Player ${this.currentPlayer} wins! 🎉`)
      this.highlightWinningCells()
    } else if (this.board.every((cell) => cell !== "")) {
      this.gameActive = false
      this.updateStatus("It's a draw! 🤝")
    } else {
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X"
      this.updateStatus(`Player ${this.currentPlayer}'s turn`)
    }
  }

  checkWinner() {
    return this.winningConditions.some((condition) => {
      const [a, b, c] = condition
      return this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]
    })
  }

  highlightWinningCells() {
    this.winningConditions.forEach((condition) => {
      const [a, b, c] = condition
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.cells[a].classList.add("winning")
        this.cells[b].classList.add("winning")
        this.cells[c].classList.add("winning")
      }
    })
  }

  updateStatus(message) {
    this.status.textContent = message

    // Remove existing status classes
    this.status.classList.remove("winner", "draw")

    if (message.includes("wins")) {
      this.status.classList.add("winner")
    } else if (message.includes("draw")) {
      this.status.classList.add("draw")
    }
  }

  resetGame() {
    this.board = Array(9).fill("")
    this.currentPlayer = "X"
    this.gameActive = true

    this.cells.forEach((cell) => {
      cell.textContent = ""
      cell.classList.remove("player-x", "player-o", "winning")
    })

    this.updateStatus(`Player ${this.currentPlayer}'s turn`)
  }
}

// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new TicTacToe()
})
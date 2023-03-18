import { useState } from "react";
import { WINNER_COMBOS, TURNS } from "./constants";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);
// null no hay ganador, flase es un empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    // no actualiza esta posicion si ya tiene algo
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board]
    // ❌ POR QUE ESTO ESTA MAL
    // board[index] = turn --> no hay que mutar nunca las props ni el estado
    // setBoard(board)
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    console.log(newWinner)
    if (newWinner) {
      setWinner(newWinner) //Falla
      confetti()
      /* setWinner((prevWinner) => {
        console.log('updateBoard',winner)
        return newWinner
      }) */
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
    //console.log('updateBoard',winner)
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </section>

      <div className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </div>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App

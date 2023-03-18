import { useState } from "react";
import { WINNER_COMBOS, TURNS } from "./constants";

const Square = ({children, isSelected, updateBoard, index}) => {

  const className=`square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);
// null no hay ganador, flase es un empate
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        console.log('Winner',boardToCheck[a])
        return boardToCheck[a]
      }
    }
    return null
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
    const newWinner = checkWinner(newBoard)
    console.log(newWinner)
    if (newWinner) {
      setWinner(newWinner) //Falla
      /* setWinner((prevWinner) => {
        console.log('updateBoard',winner)
        return newWinner
      }) */
    }
    //console.log('updateBoard',winner)
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
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

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                  ? 'Empate'
                  : 'Gano:'
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App

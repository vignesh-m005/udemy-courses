import Player from "./Components/Player";
import Gameboard from "./Components/Gameboard";
import { useState } from "react";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from "./Components/GameOver.jsx";

const PLAYERS = {X: 'Player 1', O: 'Player 2'};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameboard(gameTurns) {
  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameboard(gameTurns);
  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length == 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex
          },
          player: currentPlayer
        },
        ...prevTurns];
      return updatedTurns;

    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handleNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player intialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handleNameChange} />
          <Player intialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handleNameChange} />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch} />}
        <Gameboard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  )
}

export default App

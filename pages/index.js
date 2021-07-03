import { useUser } from '../lib/hooks'
import React, { useState } from 'react';
import Layout from '../components/layout'
import PGNForm from '../components/pgnform'
import Chessground from '../components/chessground'
import Chess, { ChessInstance, ShortMove } from "../lib/chess.js";
import { Button, Container } from '@material-ui/core';
import 'react-chessground/dist/styles/chessground.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import Player from '../components/player';


const Home = () => {

  const [tree, setTree] = useState({});
 const [chess, setChess] = useState(new Chess())
  const [pendingMove, setPendingMove] = useState()
  const [selectVisible, setSelectVisible] = useState(false)
  const [fen, setFen] = useState("")
  const [lastMove, setLastMove] = useState()


  const [player, setPlayer] = useState();

  // player {
  //  running: true
  //}

  const undo = () => {
    console.log("undo")
    chess.undo()
    setFen(chess.fen())
  }

  const onMove = (from, to) => {
    const moves = chess.moves({ verbose: true })
    for (let i = 0, len = moves.length; i < len; i++) { /* eslint-disable-line */
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        setPendingMove([from, to])
        setSelectVisible(true)
        return
      }
    }
    if (chess.move({ from, to, promotion: "x" })) {
      setFen(chess.fen())
      setLastMove([from, to])
      setTimeout(randomMove, 500)
    }
  }

  const randomMove = () => {
    const moves = chess.moves({ verbose: true })
    const move = moves[Math.floor(Math.random() * moves.length)]
    if (moves.length > 0) {
      chess.move(move.san)
      setFen(chess.fen())
      setLastMove([move.from, move.to])
    }
  }

  const promotion = e => {
    const from = pendingMove[0]
    const to = pendingMove[1]
    chess.move({ from, to, promotion: e })
    setFen(chess.fen())
    setLastMove([from, to])
    setSelectVisible(false)
    setTimeout(randomMove, 500)
  }

  const turnColor = () => {
    return chess.turn() === "w" ? "white" : "black"
  }

  const calcMovable = () => {
    const dests = new Map()
    chess.SQUARES.forEach(s => {
      const ms = chess.moves({ square: s, verbose: true })
      if (ms.length) dests.set(s, ms.map(m => m.to))
    })
    return {
      free: false,
      dests,
      color: "white"
    }
  }

  async function uploadPGN(e) {

    console.log(e)
    e.preventDefault()

    // if (errorMsg) setErrorMsg('')

    const body = {
      pgn: e.currentTarget.pgn.value,
    }
      try {
      const res = await fetch("/api/pgn", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      console.log(res.json());

      setTree(res.json());
      
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    }
  }

  return (<>
    <CssBaseline/>
    <Container maxWidth="lg">
      <h1>PGN Juicer</h1>

    
      <PGNForm onSubmit={uploadPGN}/>

<Chessground
          width="38vw"
          height="38vw"
          turnColor={turnColor()}
          movable={calcMovable()}
          lastMove={lastMove}
          fen={fen}
          onMove={onMove}
          style={{ margin: "auto" }}
        />

        <Player/>


      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Container>  </>)
}

export default Home

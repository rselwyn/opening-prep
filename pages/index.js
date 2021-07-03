import { useUser } from "../lib/hooks";
import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/layout";
import PGNForm from "../components/pgnform";
import Chessground from "../components/chessground";
import Chess, { ChessInstance, ShortMove } from "../lib/chess.js";
import { Button, Container } from "@material-ui/core";
import "react-chessground/dist/styles/chessground.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Player from "../components/player";

const Home = () => {
  const [tree, setTree] = useState([]);
  const [chess, setChess] = useState(new Chess());
  const [pendingMove, setPendingMove] = useState();
  const [selectVisible, setSelectVisible] = useState(false);
  const [fen, setFen] = useState("");
  const [lastMove, setLastMove] = useState();
  const [pgn, setPgn] = useState(false);

  useInterval(() => {
    if (pgn) {
      move();
    }
  }, 500);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

  const undo = () => {
    console.log("undo");
    chess.undo();
    setFen(chess.fen());
  };

  const move = () => {
    let from = tree[0].substring(0, 2);
    let to = tree[0].substring(2);
    if (chess.move({ from, to, promotion: "x" })) {
      setFen(chess.fen());
      setLastMove([from, to]);
      setTree(tree.slice(1));
    }
  };

  const onMove = (from, to) => {
    console.log(from, to);
    const moves = chess.moves({ verbose: true });
    for (let i = 0, len = moves.length; i < len; i++) {
      /* eslint-disable-line */
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        setPendingMove([from, to]);
        setSelectVisible(true);
        return;
      }
    }
    if (chess.move({ from, to, promotion: "x" })) {
      setFen(chess.fen());
      setLastMove([from, to]);
      setTimeout(randomMove, 500);
    }
  };

  const randomMove = () => {
    const moves = chess.moves({ verbose: true });
    // const move = moves[Math.floor(Math.random() * moves.length)]
    // if (moves.length > 0) {
    //   chess.move(move.san)
    //   setFen(chess.fen())
    //   setLastMove([move.from, move.to])
    // }
    moves.forEach((move) => console.log(move.san));
    const result = moves.filter((move) => move.san == tree[0]);
    console.log(result);
    chess.move(result[0].san);
    setFen(chess.fen());
    setLastMove([result[0].from, result[0].to]);
  };

  const promotion = (e) => {
    const from = pendingMove[0];
    const to = pendingMove[1];
    chess.move({ from, to, promotion: e });
    setFen(chess.fen());
    setLastMove([from, to]);
    setSelectVisible(false);
    setTimeout(randomMove, 500);
  };

  const turnColor = () => {
    return chess.turn() === "w" ? "white" : "black";
  };

  const calcMovable = () => {
    const dests = new Map();
    chess.SQUARES.forEach((s) => {
      const ms = chess.moves({ square: s, verbose: true });
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to)
        );
    });
    return {
      free: false,
      dests,
      color: "white",
    };
  };

  async function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsText(file);
    });
  }

  async function uploadPGN(e) {
    let body = await readFileAsync(e[0]);

    console.log(body);

    let res = await fetch("https://opening-backend.herokuapp.com/pgns", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: body,
    });

    let data = await res.json();

    console.log(data.lines[0]);
    setTree(data.lines[0]);
    setPgn(true);
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <h1>PGN Juicer</h1>

        <PGNForm onSubmit={uploadPGN} />

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

        <Player />

        <style jsx>{`
          li {
            margin-bottom: 0.5rem;
          }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        `}</style>
      </Container>{" "}
    </>
  );
};

export default Home;

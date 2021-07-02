import { useUser } from '../lib/hooks'
import React, { useState } from 'react';
import Layout from '../components/layout'
import PGNForm from '../components/pgnform'
import Chessground from '../components/chessground'
import 'react-chessground/dist/styles/chessground.css'

const Home = () => {

    const [tree, setTree] = useState({});


  async function uploadPGN(e) {
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

  return (
    <Layout>
      <h1>PGN Juicer</h1>

    
      <PGNForm onSubmit={uploadPGN}/>

      <Chessground viewOnly={true}/>


      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Layout>  )
}

export default Home

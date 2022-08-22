import Head from "next/head";
import { useState } from "react";
import MintImage from '../components/MintImage'
import HistoryView from '../components/HistoryView'
import styles from "../styles/Home.module.css";
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'
import { useMutation } from "@tanstack/react-query";
import { Button, TextField } from "@mui/material";

export default function Home() {
  const [token, setToken] = useLocalStorage("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const  { mutate: callMint, isLoadingMint, error: mintError, data: { result: { data } = {}} = {}, isFetching } = useMutation(["mintNFT"], (args) =>
    axios
      .post(`/api/mint`, args)
      .then((res) => res.data),
      {
        refetchOnWindowFocus: false
      }
  );
  function getDalle2() {
    if (token != "" && query != "") {
      setError(false);
      setLoading(true);
      fetch(`/api/dalle2?k=${token}&q=${query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setResults(data.result);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    } else {
      setError(true);
    }
  }
  function logout () {
    setToken('')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create DALLE 2 NFTs</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create NFTs with <span className={styles.titleColor}>DALLE 2</span>
        </h1>
        <p className={styles.description}>
          {
            token ? null :
            <input
            id="token"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Bearer Token"
          />
          }
          <TextField
            id="query"
            type="text"
            rows={3}
            variant="outlined"
            style={{width: '100%'}}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Query"
          />
          <Button sx={{mt: 2}} fullWidth color='primary' variant="contained" onClick={getDalle2}>Get 4 Images</Button>
        </p>{" "}
        {error ? (
          <div className={styles.error}>Something went wrong. Try again.</div>
        ) : (
          <></>
        )}{" "}
        {loading && <p>Loading...</p>}
        <div className={styles.grid}>
          {results.map((result) => {
            return (
              <MintImage onClick={v => alert(JSON.stringify(v))} imgSrc={result.generation.image_path} />
            );
          })}
        </div>
        <HistoryView onClick={v => callMint(v)} k={token} />
      </main>
    </div>
  );
}

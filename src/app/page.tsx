"use client"

import Image from "next/image";
import Head from "next/head";
import styles from "./ui/home.module.css";
import { MeiliSearch } from "meilisearch";
import { ChangeEvent, useState } from "react";



export default function Home() {
  const [searchResults, setSearchResults] = useState<Record<string, any>[]>([]);
  const client = new MeiliSearch({
    host: "http://localhost:7700",
    // apiKey: 'aSampleMasterKey'
  });

  const searchMovies = async (e: ChangeEvent<HTMLInputElement>) => {
    client
      .index("movies1")
      .search(e.target.value)
      .then((results) => {
        setSearchResults(results.hits);
      });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Meiliesearch Demo</title>
        <meta name="description" content="Meilisearch pagination demo" />
        <link rel="icon" href="/mili.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Search your favorite movies</h1>
        <input
          className={styles.search}
          type="text"
          placeholder="Search for a movie..."
          onChange={(e) => searchMovies(e)}
        />
        <div className={styles.grid}>
          {searchResults.map((resource) => (
            <div key={resource.id} className={styles.card}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resource.poster}
                alt={resource.name}
                width={200}
                height={300}
              />
              <h3>{resource.title}</h3>
              <p>{resource.overview.substring(0, 50)}...</p>
            </div>
          ))}
        </div>
      </main>
      </div>
  );
}

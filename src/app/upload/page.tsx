"use client"

import { useState } from 'react';
import { MeiliSearch, EnqueuedTask } from 'meilisearch'; // Import EnqueuedTask

export default function Home() {
  const [indexResponse, setIndexResponse] = useState<EnqueuedTask | null>(null); // Set type to EnqueuedTask | null

  // Initialize the MeiliSearch client
  const client = new MeiliSearch({
    host: 'http://127.0.0.1:7700',
    apiKey: 'aSampleMasterKey',
  });

  // Sample documents to be indexed
  const documents = [
    { id: 1, title: 'Carol', genres: ['Romance', 'Drama'] },
    { id: 2, title: 'Wonder Woman', genres: ['Action', 'Adventure'] },
    { id: 3, title: 'Life of Pi', genres: ['Adventure', 'Drama'] },
    { id: 4, title: 'Mad Max: Fury Road', genres: ['Adventure', 'Science Fiction'] },
    { id: 5, title: 'Moana', genres: ['Fantasy', 'Action'] },
    { id: 6, title: 'Philadelphia', genres: ['Drama'] },
  ];

  // Function to handle document upload and indexing
  const handleUpload = async () => {
    try {
      const index = client.index('movies'); // Get or create the 'movies' index
      const response = await index.addDocuments(documents); // Add documents to MeiliSearch

      setIndexResponse(response); // Update state with the response
    } catch (error) {
      console.error('Error indexing documents:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Upload Documents to MeiliSearch</h1>
      <button onClick={handleUpload}>Upload Documents</button>

      {indexResponse && (
        <div style={{ marginTop: '20px' }}>
          <h2>Indexing Response</h2>
          <pre>{JSON.stringify(indexResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

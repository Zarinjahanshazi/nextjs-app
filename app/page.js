"use client";

import { useState } from "react";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5007";

export default function Home() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkBackend() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(backendUrl + "/");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "3rem",
        maxWidth: 640,
      }}
    >
      <h1>nextjs-app</h1>
      <p>Frontend for the GRAAHO Argo CD on EKS GitOps demo.</p>
      <p>
        Configured backend URL: <code>{backendUrl}</code>
      </p>

      <button
        onClick={checkBackend}
        disabled={loading}
        style={{
          padding: "0.6rem 1.2rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        {loading ? "Checking..." : "Check backend"}
      </button>

      {result && (
        <pre
          style={{
            marginTop: "1.5rem",
            background: "#f4f4f4",
            padding: "1rem",
            borderRadius: 6,
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

      {error && (
        <p style={{ color: "crimson", marginTop: "1.5rem" }}>
          Could not reach backend: {error}
        </p>
      )}
    </main>
  );
}

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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)",
        fontFamily:
          "'Inter', system-ui, -apple-system, sans-serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 20,
          padding: "2.5rem",
          maxWidth: 560,
          width: "100%",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(99, 102, 241, 0.15)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            borderRadius: 999,
            padding: "4px 14px",
            marginBottom: "1.25rem",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#818cf8",
            }}
          />
          <span style={{ color: "#c7d2fe", fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>
            GITOPS DEMO
          </span>
        </div>

        <h1
          style={{
            fontSize: "1.9rem",
            fontWeight: 700,
            color: "#f8fafc",
            margin: 0,
            letterSpacing: -0.5,
          }}
        >
          nextjs-app
        </h1>
        <p style={{ color: "#94a3b8", marginTop: 8, marginBottom: "1.5rem", lineHeight: 1.6 }}>
          Frontend for the GRAAHO Argo CD on EKS GitOps demo.
        </p>

        <div
          style={{
            background: "rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 10,
            padding: "0.9rem 1rem",
            marginBottom: "1.75rem",
          }}
        >
          <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, marginBottom: 4, letterSpacing: 0.5 }}>
            CONFIGURED BACKEND URL
          </div>
          <code
            style={{
              color: "#a5b4fc",
              fontSize: 13,
              wordBreak: "break-all",
            }}
          >
            {backendUrl}
          </code>
        </div>

        <button
          onClick={checkBackend}
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.85rem 1.2rem",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#fff",
            background: loading
              ? "#4338ca"
              : "linear-gradient(135deg, #6366f1, #4f46e5)",
            border: "none",
            borderRadius: 10,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {loading && (
            <span
              style={{
                width: 14,
                height: 14,
                border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
              }}
            />
          )}
          {loading ? "Checking..." : "Check backend"}
        </button>

        {result && (
          <div
            style={{
              marginTop: "1.5rem",
              animation: "fadeIn 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#34d399",
                  boxShadow: "0 0 8px #34d399",
                }}
              />
              <span style={{ color: "#6ee7b7", fontSize: 13, fontWeight: 600 }}>
                Connected
              </span>
            </div>
            <pre
              style={{
                background: "rgba(0, 0, 0, 0.35)",
                border: "1px solid rgba(52, 211, 153, 0.2)",
                color: "#d1fae5",
                padding: "1rem",
                borderRadius: 10,
                fontSize: 13,
                overflowX: "auto",
                margin: 0,
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {error && (
          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              background: "rgba(248, 113, 113, 0.1)",
              border: "1px solid rgba(248, 113, 113, 0.25)",
              borderRadius: 10,
              padding: "0.9rem 1rem",
              animation: "fadeIn 0.3s ease",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#f87171",
                marginTop: 5,
                flexShrink: 0,
              }}
            />
            <p style={{ color: "#fca5a5", fontSize: 13.5, margin: 0, lineHeight: 1.5 }}>
              Could not reach backend: {error}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
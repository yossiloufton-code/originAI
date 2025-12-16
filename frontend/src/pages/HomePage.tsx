import { useEffect } from "react";
import { useApp } from "../state/useApp";
import ImageGrid from "../components/ImageGrid";
import "./HomePage.scss";

export default function HomePage() {
  const { state, loadInitial, exportCsv } = useApp();

  useEffect(() => {
    void loadInitial();
  }, [loadInitial]);

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Random Pictures Voting</h1>
        <button className="page__export" onClick={exportCsv}>
          Export votes to CSV
        </button>
      </header>

      {state.loading && <p>Loading...</p>}
      {state.error && (
        <p style={{ whiteSpace: "pre-wrap" }}>Error: {state.error}</p>
      )}

      {!state.loading && state.images.length > 0 && <ImageGrid />}
    </div>
  );
}

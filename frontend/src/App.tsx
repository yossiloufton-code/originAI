import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <Outlet />
    </div>
  );
}

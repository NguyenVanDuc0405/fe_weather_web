import "@shopify/polaris/build/esm/styles.css";
import React, { Suspense } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useDocument } from "./hook/useDocument";
import "./App.css";
const HomePage = React.lazy(() => import("./views/home"));
const HoursPage = React.lazy(() => import("./views/hours"));
const DaysPage = React.lazy(() => import("./views/days"));

function App() {
  useDocument("Weather Web");
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/hours" element={<HoursPage />} />
          <Route path="/days" element={<DaysPage />} />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

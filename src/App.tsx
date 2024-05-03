import "@shopify/polaris/build/esm/styles.css";
import React, { Suspense } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import enTranslations from "@shopify/polaris/locales/en.json";
import CustomSkeletonPage from "./components/Skeleton/skeleton-page";
import { useDocument } from "./hook/useDocument";
import { AppProvider } from "@shopify/polaris";

const HomePage = React.lazy(
  () => import("./views/home")
);
const HoursPage = React.lazy(
  () => import("./views/hours")
);
const DaysPage = React.lazy(
  () => import("./views/days")
);

function App() {
  useDocument("Weather Web");
  return (
    <AppProvider i18n={enTranslations}>
      <Router>
        <div>
          {/* <HeaderBar /> */}
          <Suspense fallback={<CustomSkeletonPage />}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/home" />}
              />
              <Route
                path="/home"
                element={<HomePage />}
              />
              <Route
                path="/hours"
                element={<HoursPage />}
              />
              <Route
                path="/days"
                element={<DaysPage />}
              />

              <Route
                path="*"
                element={<Navigate to="/home" />}
              />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

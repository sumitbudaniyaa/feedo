import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/login";
import Kitchen from "./pages/kitchen/kitchen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/kitchen" element={<Kitchen />}/>
    </Routes>
  );
}

export default App;

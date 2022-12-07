import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GistDetail } from "./gist-detail";
import { GistList } from "./pages/gist-list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gist/:gistId" element={<GistDetail />} />
        <Route path="/" element={<GistList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

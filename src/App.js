import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CadastroPrato from "./pages/CadastroPrato";
import Cardapio from "./pages/Cardapio";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/cadastro" element={<Layout><CadastroPrato /></Layout>} />
        <Route path="/cardapio" element={<Layout><Cardapio /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.js";
import Productos from "./pages/Productos.js";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<Productos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

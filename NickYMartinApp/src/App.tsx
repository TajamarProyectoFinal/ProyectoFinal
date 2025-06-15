import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.js";
import Productos from "./pages/Productos.js";

function App() {
    return (
        <BrowserRouter>
            <MainLayout />        
        </BrowserRouter>
    );
}

export default App;

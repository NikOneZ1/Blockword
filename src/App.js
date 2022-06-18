import './App.css';
import Home from './screens/Home.js';
import BlockwordApp from './screens/BlockwordApp.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<BlockwordApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route, Link } from "react-router-dom";
import Car from "./components/Car.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-start h-16 space-x-8">
            <Link
              to="/register"
              className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Register
            </Link>

            <Link
              to="/"
              className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>

            <Link
              to="/cars"
              className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Car
            </Link>
          </ul>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cars" element={<Car />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Home from './Pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={'/home'} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;

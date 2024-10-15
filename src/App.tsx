import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Home from './Pages/Home';
import JobPage from './Pages/Job';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={'/home'} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/job/:id" element={<JobPage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;

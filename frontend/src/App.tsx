import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <Routes>
      <Route path="/game/:gameId" element={<GamePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;

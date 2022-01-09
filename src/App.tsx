import { Routes, Route } from 'react-router-dom';
import HeaderBar from '@containers/HeaderBar';
import Home from '@pages/Home';
import PassengerList from '@pages/PassengerList';
import ReportChart from '@pages/ReportChart';

function App() {
  return (
    <>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportChart />} />
        <Route path="/passenger" element={<PassengerList />} />
      </Routes>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Clients from './pages/Clients';
import CreateClient from './pages/CreateClient';
import ClientCreated from './pages/ClientCreated';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
	<Route path="/clients" element={<Clients />} />
	<Route path="/clients/create" element={<CreateClient />} />
	<Route path="/client-created" element={<ClientCreated />} />
      </Routes>
    </Router>
  );
}

export default App;

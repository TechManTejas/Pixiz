import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        }
      }}
    >
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App

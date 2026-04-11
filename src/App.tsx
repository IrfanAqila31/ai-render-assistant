import './App.css'
import HomePage from './pages/HomePage'
import WorkspacePage from './pages/WorkspacePage'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router'


function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/workspace" element={<WorkspacePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </>
  )
}

export default App

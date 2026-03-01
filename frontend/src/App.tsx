import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Public from './components/public'
import Protected from './components/protected'
import { AuthProvider } from './context/AuthProvider'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Assignments from './components/Assignments'
import Assignment from './components/Assignment'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Public />}>
            <Route path='/' element={<Login/>} />
          </Route>
          <Route element={<Public />}>
            <Route path='/register' element={<Register/>} />
          </Route>
          <Route element={<Protected />}>
            <Route path='/assignments' element={<Assignments/>} />
          </Route>
          <Route element={<Protected />}>
            <Route path='/assignment/:id' element={<Assignment/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

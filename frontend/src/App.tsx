import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Public from './components/public'
import Protected from './components/protected'
import { AuthProvider } from './context/AuthProvider'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Public />}>
            <Route path='/' element={<div>Login</div>} />
          </Route>
          <Route element={<Public />}>
            <Route path='/register' element={<div>Register</div>} />
          </Route>
          <Route element={<Protected />}>
            <Route path='/assignments' element={<div>Assignments</div>} />
          </Route>
          <Route element={<Protected />}>
            <Route path='/assignment/:id' element={<div>Assignment</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

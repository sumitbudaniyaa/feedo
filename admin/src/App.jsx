import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/register/register'
import LoginPage from './pages/login/login'
import Dashboard from './pages/dashboard/dashboard'
import Menu from './components/menu/menu'
import MyAcc from './components/myacc/myacc'
import QR from './components/qr/qr'

function App() {
 
  return (
<Routes >
  <Route path='/' element={  <LoginPage /> } />
  <Route path='/register' element={ <RegisterPage /> }/>
  <Route path="/dashboard" element={<Dashboard />}>
  <Route path="home" element = {<Menu />}/>
  <Route path='my-account' element={<MyAcc />}/>
  <Route path='qr-code' element={<QR />}/>
  </Route>

</Routes>
   
  )
}

export default App

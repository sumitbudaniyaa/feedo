import { Routes,Route } from 'react-router-dom'
import Order from './pages/order/order'
import Cart from './pages/cart/cart'
import TableNo from './pages/tableno/tableno'
import Progress from './pages/progress/progress'

function App() {


  return (

    <Routes>
      <Route path='/:restaurantId' element={<TableNo />}/>
      <Route path='/:restaurantId/:tableNo' element={<Order />}/>
      <Route path='/:restaurantId/:tableNo/cart' element={<Cart />}/>
      <Route path='/:restaurantId/:tableNo/progress' element={ <Progress />}/>
    </Routes>

  )
}

export default App

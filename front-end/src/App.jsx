import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import  Box from '@mui/material/Box'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <HeaderBar/>
      <Box sx={{ml:'25px', mr:'25px'}}>
        <Routes>
        <Route path ="/" element={<Home/>} />
        <Route path= "/login" element={<Login/>}/>
        </Routes>
      </Box>
    </BrowserRouter>
  )
} 

export default App

import './App.css'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';

function App() {
  return (
    <>
     <Header/>
     <div className='cozone'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
     </Routes>
     </div>
     <Footer/>
    </>
  )
}

export default App

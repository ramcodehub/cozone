import './App.css'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import DayPass from './pages/Services/DayPass/DayPass';
import Plans from './pages/Plans/Plans';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <>
     <ScrollToTop/>
     <Header/>
     <div className='cozone'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/plans' element={<Plans/>}/>
        <Route path='/day-pass' element={<DayPass/>}/>
     </Routes>
     </div>
     <Footer/>
    </>
  )
}

export default App

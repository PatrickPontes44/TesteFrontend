import Header from './components/Header/Header';
import Register from './pages/Register/Register';
import Users from './pages/Users/Users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes ,Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <ToastContainer style={{fontSize: "1.5rem"}}
        position= "bottom-right"
        autoClose={4000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
      <Header />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={<Register/>} />
          <Route path='/users' element={<Users/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

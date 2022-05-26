import './App.css';
import Home from './pages/Home';
import{ BrowserRouter ,Routes,Route} from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Detail from './components/Detail';
import Subcription from './components/Subcription';
function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route  exact path='/signin' element={<Signin />} />
        <Route  exact path='/signup' element={<Signup />} />
        <Route  exact path='/movie' element={<Main />} />
        <Route  exact path='/movie/:id' element={<Detail />} />
        <Route  exact path='/:id/subscription' element={<Subcription />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
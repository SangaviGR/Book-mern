import {BrowserRouter,Route,Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
// Change import to named import
import BooksPage from './pages/BooksPage';
import Login from './pages/login'
function App() {
  return (
    <>
      <NavBar/>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<BooksPage/>} />
        <Route path="/books" element={<BooksPage/>} />
        <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

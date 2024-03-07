import {BrowserRouter,Route,Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
// Change import to named import
import BooksPage from './pages/BooksPage';

function App() {
  return (
    <>
      <NavBar/>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<BooksPage/>} />
        <Route path="/books" element={<BooksPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

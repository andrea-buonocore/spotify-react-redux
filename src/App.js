import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NotFound from './components/NotFound';
import AlbumPage from './components/AlbumPage';
import ArtistPage from './components/ArtistPage';
import SidebarVertical from './components/SidebarVertical';
import Player from './components/Player';
import MainNavbar from './components/MainNavbar';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>

        
        

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/albumPage/:albumID' element={<AlbumPage />} />
          <Route path='/artistPage/:artistID' element={<ArtistPage />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;

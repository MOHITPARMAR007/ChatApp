
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
// import { Button, ButtonGroup } from '@chakra-ui/react'
import Chats from './Pages/Chats'
function App() {
  return (
    <div className="App">
     
      <Routes>
      <Route exact path='/' Component={Home} />
      <Route path='/Chats' Component={Chats} /></Routes>
    </div>
  );
}

export default App;

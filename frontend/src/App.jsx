import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import NewUser from './Pages/newUser';
import HomePage from './Pages/HomePage';
import AddFriend from './Pages/AddFriend';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<NewUser />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path='/AddFriend' element = {<AddFriend/ >} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


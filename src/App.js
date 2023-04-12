import { Routes, Route } from 'react-router-dom';
import SignIn from './Login/SignIn';
import Main from './Main/Main';
import SignUp from './SignUp/SignUp';
import Todo from './Todo/Todo';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/todo' element={<Todo/>}/>
    </Routes>
  );
}

export default App;

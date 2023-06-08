import { useReducer } from 'react';
import LoginPage from './components/LoginPage';
import InfoTable from './components/InfoTable';
import NewUser from './components/NewUser';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { initalState } from './store/initialState';
import { reducer } from './store/reducer';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<LoginPage state={state} dispatch={dispatch} />} />
          <Route path='/table' element={<InfoTable state={state} dispatch={dispatch} />} />
          <Route path='/new_user' element={<NewUser state={state} dispatch={dispatch} />} />
        </Routes>
      </BrowserRouter >
    </div>
  );
}

export default App;

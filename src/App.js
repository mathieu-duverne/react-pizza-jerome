import PersonList from './components/PersonList';
import './App.css';
import PersonAdd from './components/PersonAdd';
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <PersonList />
      <PersonAdd />
      <Login />
    </div>
  );
}

export default App;

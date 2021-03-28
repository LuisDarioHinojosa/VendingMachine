import logo from './logo.svg';
import './App.css';
import Main from './Components/Main';
import PRODUCTOS from './DB/Products';
import EMPLEADOS from './DB/Empleados'

function App() {
  return (
      <Main productos = {PRODUCTOS} empleados = {EMPLEADOS}/>
  );
}

export default App;

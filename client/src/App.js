import './App.css';
import { AppRoutes } from './pages/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.scss'
import { TravelsProvider } from './context/TravelsContext';

function App() {
  return (
    <>
    <TravelsProvider>
    <AppRoutes/>
    </TravelsProvider>
    </>
  );
}

export default App;

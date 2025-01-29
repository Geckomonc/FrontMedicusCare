import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from './pages/Contact';
import Login from './pages/Login';
import Medicamentos from './pages/Medicamentos';
import RegistrarMedicamentos from './pages/RegistrarMedicamentos';
import Register from './pages/Register';
import PaginaPrincipal from './pages/PaginaPrincipal';
import Notificaciones from './pages/Notificaciones';
import Recomendaciones from './pages/Recomendaciones';
import Usuario from './pages/Usuario';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const location = useLocation(); // Obtener la ruta actual

  return (
    <>
      {/* Mostrar Navbar solo si no estamos en las rutas protegidas */}
      {location.pathname !== '/pagina-principal' &&
       location.pathname !== '/medicamentos' &&
       location.pathname !== '/registrar-medicamentos' &&
       location.pathname !== '/notificaciones' &&
       location.pathname !== '/recomendations' &&
       location.pathname !== '/usuarios' && <Navbar />}
       
      <Routes>
        {/* Rutas públicas */}
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />

        {/* Rutas protegidas */}
        <Route 
          exact 
          path='/pagina-principal' 
          element={
            <ProtectedRoute>
              <PaginaPrincipal />
            </ProtectedRoute>
          } 
        />
        <Route 
          exact 
          path='/medicamentos' 
          element={
            <ProtectedRoute>
              <Medicamentos />
            </ProtectedRoute>
          } 
        />
        <Route 
          exact 
          path='/recomendations' 
          element={
            <ProtectedRoute>
              <Recomendaciones />
            </ProtectedRoute>
          } 
        />
        <Route 
          exact 
          path='/registrar-medicamentos' 
          element={
            <ProtectedRoute>
              <RegistrarMedicamentos />
            </ProtectedRoute>
          } 
        />
        <Route 
          exact 
          path='/notificaciones' 
          element={
            <ProtectedRoute>
              <Notificaciones />
            </ProtectedRoute>
          } 
        />
        <Route 
          exact 
          path='/usuarios' 
          element={
            <ProtectedRoute>
              <Usuario />
            </ProtectedRoute>
          } 
        />
      </Routes>
      
      {/* Mostrar Footer solo si no estamos en las rutas protegidas */}
      {location.pathname !== '/pagina-principal' &&
       location.pathname !== '/medicamentos' &&
       location.pathname !== '/registrar-medicamentos' &&
       location.pathname !== '/notificaciones' &&
       location.pathname !== '/recomendations' &&
       location.pathname !== '/usuarios' && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

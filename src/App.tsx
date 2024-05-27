import { AppContent } from './pages/AppContent';
import { NewRowForm } from './pages/NewRowForm';
import { Routes, Route } from 'react-router-dom';
import './styles/globals.scss';

function App() {
    return (
        <Routes>
            <Route path='/' element={<AppContent />} />
            <Route path='/add-row' element={<NewRowForm />} />
        </Routes>
    )
}

export default App;

import { AuthProvider } from './components/ui/AuthContext'
import AppNavigation from './navigation/AppNavigation'
import './global.css';
import './lib/colors';

export default function App() {
    return(
        <AuthProvider>
            <AppNavigation/>
        </AuthProvider>
    )
}

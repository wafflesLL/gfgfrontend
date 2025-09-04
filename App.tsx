import { ExpoRoot } from 'expo-router';
import { registerRootComponent } from 'expo';
import './global.css';
export default function App() {
  return <ExpoRoot context={require.context('./app')} />;
}

registerRootComponent(App);
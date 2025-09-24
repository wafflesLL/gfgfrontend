import { ExpoRoot } from "expo-router";
import { apiFetchJSON } from '@/lib/server';
import { useEffect } from 'react';

export default function App() {
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiFetchJSON("/checkhealth")
                .then(response => response.json())
                .catch(error => {
                    console.error(error);
                });
                console.log(response);
            }catch (error){
                console.error('Failed to fetch data:', error);
            }
        }
        fetchData();
    }, []);
    return <ExpoRoot context={require.context('./app')} />;
}

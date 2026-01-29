/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import Player from "@interfaces/player";

export default function usePlayers(storageKey = 'players') {
    const [players, setPlayers] = useState<Player[]>([]);

     useEffect(() => {
        try {
            const raw = localStorage.getItem('players')
            if (raw) setPlayers(JSON.parse(raw))
        } catch (e) {
            console.warn('Failed to load players from localStorage', e)
        }
    }, [])

    useEffect(() => {
        try {
            if (typeof window === 'undefined') return;
            localStorage.setItem(storageKey, JSON.stringify(players));
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('Failed to save players to localStorage', e);
        }
    }, [players, storageKey]);

    const addPlayer = useCallback((p: Player) => {
        setPlayers(prev => [...prev, p]);
    }, []);

    const removePlayer = useCallback((id: string) => {
        setPlayers(prev => prev.filter(p => p.id !== id));
    }, []);

    const updatePlayer = useCallback((id: string, changes: Partial<Player>) => {
        setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...changes } : p));
    }, []);

    const clearPlayers = useCallback(() => setPlayers([]), []);

    return { players, setPlayers, addPlayer, removePlayer, updatePlayer, clearPlayers } as const;
}

/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { ReactNode, useCallback } from "react";
import css from './player-setup.module.scss'
import AddPlayerButton from "./add-player-button/add-player-button";
import AddPlayerCard from "./player-card/add-player-card";
import { useRouter } from "next/navigation";
import usePlayers from "@hooks/usePlayers";


export default function PlayerSetup(): ReactNode{
    const { players, setPlayers } = usePlayers()
    const router = useRouter()

    const handleClick = useCallback(() => {
        router.push('/playerrolls');
    },[router])

    return (
    <div className={css.root}>
        <div className={css.playerContainer}>
            {players.map((player) => (<AddPlayerCard key={player.id} player={player} setPlayers={setPlayers} />))}
            <AddPlayerButton setPlayers={setPlayers} />
        </div>
        <button onClick={handleClick} className={css.startButton}>
            <h1>Start Game</h1>
        </button>
    </div>
    )
}
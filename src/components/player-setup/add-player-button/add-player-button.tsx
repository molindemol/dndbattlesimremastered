"use client"
import { Dispatch, ReactNode, SetStateAction, useCallback } from "react";
import css from './add-player-button.module.scss'
import Player from "@interfaces/player";
import DefaultUserImage from '@assets/user.png'

interface AddPlayerButtonProps {
    setPlayers: Dispatch<SetStateAction<Player[]>>
}

export default function AddPlayerButton(props : AddPlayerButtonProps): ReactNode{
    const {setPlayers} = props;
    

    const handleClick = useCallback(() => {
        setPlayers(prev => [...prev, { id: crypto.randomUUID(), name: "", image:  DefaultUserImage , initiativeRoll: 0, ally: true } as Player])
    },[setPlayers])
    return (
    <button onClick={handleClick} className={css.root}>
        <h1>+</h1>
    </button>
    )
}
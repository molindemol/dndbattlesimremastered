/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import css from './rolls.module.scss';
import useCharacters from "@hooks/use-characters";
import RollCharacterCard from "./roll-character-card/roll-character-card";
import { ReactNode } from 'react';


export default function Rolls(): ReactNode{
    const { characters: players } = useCharacters("players")

    return (
    <div className={css.root}>
        <div className={css.playerContainer}>
            {players.map((player) => (<RollCharacterCard key={player.id} player={player}  />))}
            
        </div>
        
    </div>
    )
}
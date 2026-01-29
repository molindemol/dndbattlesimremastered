'use client'
import { ReactNode, } from "react";
import css from './roll-character-card.module.scss'
import Player from "@interfaces/player";

import Image from 'next/image'

interface PlayerCardProps {
    player: Player;
}

export default function RollCharacterCard(props: PlayerCardProps): ReactNode{
    const {player} = props;
    const {name, image} = player
   

    return (
    <>
        <div className={css.root}>
            <div className={css.nameImgContainer}>
                <Image className={css.image} alt={`${name} image`} src={image} width={0} height={0} />
                <h1>{name}</h1>
            </div>
            <div className={css.numberInputContainer}>
                <input placeholder="Roll" />
                <input placeholder="Initiative"  />
            </div>
            
        </div>
     
    </>
    )
}
'use client'
import { ReactNode, useCallback, } from "react";
import css from './roll-character-card.module.scss'
import Image from 'next/image'
import Character from "@interfaces/character";
import trashBin from '@assets/bin.png'
interface RollCharacterCardProps {
    variant: "players" | "enemies";
    character: Character;
    updateCharacters: (id: string, changes: Partial<Character>) => void;
    removeCharacters: (id: string) => void;
}

export default function RollCharacterCard(props: RollCharacterCardProps): ReactNode{
    const {character, updateCharacters, variant, removeCharacters} = props;
    const {name, image, initiativeRoll, initiativeBonus , id} = character;

    const handleDelete = useCallback(() => {
           removeCharacters(character.id)
       },[removeCharacters, character.id])

    return (
        <div className={css.root}>
            <div className={css.nameImgContainer}>
                <Image className={css.image} alt={`${name} image`} src={image} width={0} height={0} />
                {name.length > 7 ? (<h2>{name}</h2>) : (<h1>{name}</h1>)}
            </div>
            <div className={css.numberInputContainer}>
                <div className={css.inputContainer}>
                    <label>Roll</label>
                    <input
                        type="number"
                        placeholder="Roll"
                        value={initiativeRoll ?? ''}
                        onChange={(e) => {
                            const v = e.target.value
                            updateCharacters(id, { initiativeRoll: v === '' ? null : Number(v) })
                        }}
                    />
                </div>
                {variant === 'players' ? (
                <div className={css.inputContainer}>
                    <label>Initiative</label>
                     <input
                        type="number"
                        placeholder="Initiative"
                        value={initiativeBonus ?? ''}
                        onChange={(e) => {
                            const v = e.target.value
                            updateCharacters(id, { initiativeBonus: v === '' ? null : Number(v) })
                        }}
                    /> 
                    
                </div>) : (
                <button onClick={handleDelete} className={css.remove}><Image className={css.imageBin} alt="remove button" src={trashBin} /></button>)}
            </div>
                
                
            
            
        </div>
    )
}
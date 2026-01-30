'use client'
import css from './rolls.module.scss';
import useCharacters, { UseCharactersHook } from "@hooks/use-characters";
import RollCharacterCard from "./roll-character-card/roll-character-card";
import { ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface RollsProps{
    variant: "players" | "enemies";
    useCharactersHook: UseCharactersHook; 
}

export default function Rolls(props : RollsProps): ReactNode{
    const {variant, useCharactersHook} = props
    const { characters, updateCharacters, removeCharacters } = useCharactersHook
    const router = useRouter()

    const handleRemoveAndRenumber = useCallback((id: string) => {
        const removedCharacter = characters.find(c => c.id === id)
        if (!removedCharacter) return
        removeCharacters(id)
        
        const baseNameMatch = removedCharacter.name.match(/^(.+?)\s*(\d+)?$/)
        const baseName = baseNameMatch ? baseNameMatch[1].trim() : removedCharacter.name

        const relatedCharacters = characters
            .filter(c => c.id !== id && c.name.startsWith(baseName))
            .sort((a, b) => a.name.localeCompare(b.name))

        relatedCharacters.forEach((char, index) => {
            const newName = index > 0 ? `${baseName} ${index + 1}` : baseName
            if (char.name !== newName) {
                updateCharacters(char.id, { name: newName })
            }
        })
    }, [characters, removeCharacters, updateCharacters])

    const handleClick = useCallback(() => {
        router.push(variant === 'enemies' ? '/battle' : '/enemyrolls');
    },[router, variant])
    
    return (
    <div className={css.root}>
        <div className={css.charactersContainer}>
            {characters.map((character) => (<RollCharacterCard key={character.id} character={character} updateCharacters={updateCharacters} removeCharacters={handleRemoveAndRenumber}  variant={variant} />))}
            
        </div>
        <div className={css.bottom}>
            {variant === 'players' && (
                <p>
                    Players with no rolls will not participate in this battle but can be added when needed
                </p>
            )}
            
            <button onClick={handleClick} className={css.startButton}>
                <h1>Confirm Rolls</h1>
            </button>
        </div>
    </div>
    )
}
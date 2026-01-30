'use client'
import { ReactNode, useCallback } from "react";
import css from './enemy-select-card.module.scss'
import EnemyJson from "@interfaces/enemy-json";
import Character from "@interfaces/character";

interface EnemySelectCardProps{
    enemy: EnemyJson;
    enemies: Character[];
    addEnemy: (c: Character) => void;
}

export default function EnemySelectCard(props: EnemySelectCardProps): ReactNode{
    const {enemy, enemies, addEnemy} = props
    const {race: name} = enemy

    const handleClick = useCallback(() => {
        let newName = enemy.race
        const existingCount = enemies.filter(e => e.name.startsWith(enemy.race)).length
        if (existingCount > 0) {
            newName = `${enemy.race} ${existingCount + 1}`
        }
        
        addEnemy({
            id: crypto.randomUUID(),
            name: newName,
            hp: enemy.hp,
            image: enemy.image,
            initiativeRoll: null,
            initiativeBonus: enemy.initiative,
            ally: false
        } as Character)
    }, [addEnemy, enemy, enemies])

    return (
        <button onClick={handleClick} className={css.root}>
            <h1>{name}</h1>
        </button>
    )
}
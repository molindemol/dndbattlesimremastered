'use client'
import { ReactNode, useState } from "react";
import css from './enemy-select.module.scss'

import { UseCharactersHook } from "@hooks/use-characters";

import enemyData from '@assets/enemyData.json'
import EnemyJson from "@interfaces/enemy-json";
import EnemySelectCard from "./enemy-select-card/enemy-select-card";

interface EnemySelectProps{
    useCharactersHook: UseCharactersHook; 
}

export default function EnemySelect(props :  EnemySelectProps): ReactNode{
    const {useCharactersHook} = props
    const { characters: enemies, addCharacters } = useCharactersHook
    const enemiesJson : EnemyJson[] = enemyData
    const [searchQuery, setSearchQuery] = useState('')

    const filteredEnemies = enemiesJson.filter(enemy =>
        enemy.race.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
    <div className={css.root}>
        <input
            type="text"
            placeholder="Search enemies by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={css.searchInput}
        />
        <div className={css.container}>
           {filteredEnemies.map(enemy => (<EnemySelectCard key={enemy.race} enemy={enemy} enemies={enemies} addEnemy={addCharacters} />))}
        </div>
    </div>
    )
}
/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { useCallback, useEffect, useState } from 'react';
import Character from '@interfaces/character';
import css from './battle-card.module.scss'
import Image from 'next/image';

interface BattleCardProps{
  character: Character;
  updateCharacters: (id: string, changes: Partial<Character>) => void;
  removeCharacters: (id: string) => void;
}

export default function BattleCard(props: BattleCardProps) {
  const {character, updateCharacters, removeCharacters } = props;
  const {id, name, image, ally, hp} = character

  const [currentHp, setCurrentHp] = useState<number>(hp ?? 0);

  useEffect(() => {
       setCurrentHp(hp ?? 0);
  }, [hp]);

  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(value)) return;
    setCurrentHp(value);
    updateCharacters(id, { hp: value });
  } 

  const handleDead = useCallback(() => {
    if (ally){
        updateCharacters(id, {initiativeRoll: null})
    } else{
      removeCharacters(id)
    }
          
  },[removeCharacters, id, ally, updateCharacters])
  

  return (
    <div className={css.root}>
      <div>
        <Image className={css.image} alt={`${name} image`} src={image} width={0} height={0} />
        <h3>{name}</h3>
      </div>
        
        <div className={css.bottom}>
            {!ally && (
              <div className={css.health}>
                <label>HP:</label>
                <input type="number" min={0} value={currentHp} onChange={handleHpChange} />
              </div>
            )}
            <button onClick={handleDead}>Dead</button>
        </div>
    </div>
  );
}

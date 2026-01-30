'use client'
import EnemySelect from '@components/enemy-select/enemy-select';
import css from './page.module.scss'
import Rolls from "@components/rolls/rolls";
import useCharacters from '@hooks/use-characters';

export default function EnemyRolls() {
  const useCharactersHook = useCharacters("enemies")
  return (
    <div className={css.root}>
        <EnemySelect useCharactersHook={useCharactersHook} />
        <Rolls variant="enemies" useCharactersHook={useCharactersHook} />
        
    </div>
  );
}

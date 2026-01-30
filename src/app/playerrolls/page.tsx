'use client'
import useCharacters from '@hooks/use-characters';
import css from './page.module.scss'
import Rolls from "@components/rolls/rolls";

export default function PlayerRolls() {
  const useCharactersHook = useCharacters("players")
  return (
    <div className={css.root}>
        <Rolls variant="players" useCharactersHook={useCharactersHook}/>
    </div>
  );
}

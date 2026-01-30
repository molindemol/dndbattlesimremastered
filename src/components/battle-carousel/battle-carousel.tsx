'use client'
import useCharacters from '@hooks/use-characters';
import css from './battle-carousel.module.scss'
import BattleCard from './battle-card/battle-card';

export default function BattleCarousel() {
  const {characters: players, updateCharacters: updatePlayers, removeCharacters: removePlayers} = useCharacters('players')
  const {characters : enemies, updateCharacters: updateEnemies, removeCharacters: removeEnemies} = useCharacters('enemies')

  const sortedListOfCharacters = players.filter(player => player.initiativeRoll !== null).concat(enemies).toSorted((a, b) => ( a.initiativeRoll! + a.initiativeBonus!) - ( b.initiativeRoll! + b.initiativeBonus!) )
  return (
    <div className={css.root}>
        {sortedListOfCharacters.map(character => (<BattleCard key={character.id} character={character} updateCharacters={character.ally ? updatePlayers : updateEnemies} removeCharacters={character.ally ? removePlayers : removeEnemies} />))}

    </div>
  );
}

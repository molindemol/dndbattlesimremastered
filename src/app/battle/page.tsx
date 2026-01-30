'use client'
import BattleCarousel from '@components/battle-carousel/battle-carousel';
import css from './page.module.scss'

export default function Battle() {
  return (
    <div className={css.root}>
        <BattleCarousel />
    </div>
  );
}

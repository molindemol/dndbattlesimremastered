import PlayerSetup from "@components/player-setup/player-setup";
import css from './page.module.scss'
import Rolls from "@components/rolls/rolls";

export default function Home() {
  return (
    <div className={css.root}>
        <Rolls />
    </div>
  );
}

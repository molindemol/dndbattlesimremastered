/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import css from './battle-controls.module.scss'

interface BattleControlProps{
    setIndex: Dispatch<SetStateAction<number>>;
    listLength: number;
    currentIndex: number;
}

export default function BattleControls(props: BattleControlProps) {
  const {setIndex, listLength, currentIndex} = props;
  const lastIndex = listLength - 1
  const handleNext = useCallback(() => {
      setIndex(prev => prev + 1);
  }, [setIndex])
  const handlePrevious = useCallback(() => {
      setIndex(prev => prev - 1);
  }, [setIndex]);

  useEffect(() => {
    if(currentIndex > lastIndex){
      setIndex(0)
    }

    if(currentIndex < 0){
      setIndex(lastIndex)
    }
  },[setIndex, lastIndex , currentIndex])


  return (
    <div className={css.root}>
        <button onClick={handlePrevious}>
            Previous
        </button>
        <button onClick={handleNext}>
            Next
        </button>
    </div>
  );
}

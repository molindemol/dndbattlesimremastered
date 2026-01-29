'use client'
import { Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";
import css from './add-player-card.module.scss'
import Player from "@interfaces/player";
import trashBin from '@assets/bin.png'
import Image from 'next/image'
import ImageModal from './image-modal/image-modal'

interface PlayerCardProps {
    player: Player;
    setPlayers: Dispatch<SetStateAction<Player[]>>;
}

export default function AddPlayerCard(props: PlayerCardProps): ReactNode{
    const {player, setPlayers} = props;
    const {name, image} = player
    const [showModal, setShowModal] = useState(false)

    const handleDelete = useCallback(() => {
        setPlayers(prev => prev.filter(p => p.id !== player.id))
    },[setPlayers, player.id])

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayers(prev => prev.map(p => p.id === player.id ? {...p, name: e.target.value} : p))
    },[setPlayers, player.id])

    const handleImageButtonClick = useCallback(() => {
        setShowModal(true)
    },[])

    const handleConfirmImage = useCallback((imageUrl: string) => {
        setPlayers(prev => prev.map(p => p.id === player.id ? {...p, image: imageUrl} : p))
        setShowModal(false)
    },[setPlayers, player.id])

    return (
    <>
        <div className={css.root}>
            <Image className={css.image} alt={`${name} image`} src={image} width={0} height={0} />
            <input type="text" placeholder="name" value={name} onChange={handleNameChange} />
            <button onClick={handleImageButtonClick} className={css.imageButton}>Change Image</button>
            <button onClick={handleDelete} className={css.remove}><Image className={css.imageBin} alt="remove button" src={trashBin} /></button>
        </div>
        <ImageModal 
            isOpen={showModal} 
            onClose={() => setShowModal(false)} 
            onConfirm={handleConfirmImage}
            initialImage={typeof image === 'string' ? image : ''}
        />
    </>
    )
}
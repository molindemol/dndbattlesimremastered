'use client'
import { ReactNode, useCallback, useState } from "react";
import css from './image-modal.module.scss'
import Image from 'next/image'

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (imageUrl: string) => void;
    initialImage?: string;
}

export default function ImageModal(props: ImageModalProps): ReactNode {
    const { isOpen, onClose, onConfirm, initialImage = '' } = props
    const [imageUrl, setImageUrl] = useState(initialImage)
    const [isDragOver, setIsDragOver] = useState(false)

    const handleFileConversion = useCallback((file: File) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            setImageUrl(e.target?.result as string)
        }
        reader.readAsDataURL(file)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
        const files = e.dataTransfer.files
        if (files.length > 0) {
            handleFileConversion(files[0])
        }
    }, [handleFileConversion])

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            handleFileConversion(e.target.files[0])
        }
    }, [handleFileConversion])

    const handleConfirm = useCallback(() => {
        onConfirm(imageUrl)
        setImageUrl('')
    }, [imageUrl, onConfirm])

    const handleClose = useCallback(() => {
        setImageUrl('')
        onClose()
    }, [onClose])

    if (!isOpen) return null

    return (
        <div className={css.modalOverlay} onClick={handleClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <h2>Change Player Image</h2>
                <div 
                    className={`${css.dropzone} ${isDragOver ? css.dragOver : ''}`}
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                    onDragLeave={() => setIsDragOver(false)}
                >
                    <p>Drag and drop an image here, or click to select</p>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileSelect}
                        className={css.fileInput}
                    />
                </div>
                {imageUrl && (
                    <div className={css.imagePreview}>
                        <Image src={imageUrl} alt="Preview" width={200} height={200} />
                    </div>
                )}
                <div className={css.modalButtons}>
                    <button onClick={handleConfirm} className={css.confirmButton} disabled={!imageUrl}>Confirm</button>
                    <button onClick={handleClose} className={css.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

import { ReactNode } from 'react';
import styles from './ModalWindow.module.scss';

interface IModalWindowProps {
    children: ReactNode;
}

export function ModalWindow({ children }: IModalWindowProps) {
    return (
        <div className={styles['modal-window']}>
            {children}
        </div>
    )
}
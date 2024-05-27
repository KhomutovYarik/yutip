import { IModalWindowProps, ModalWindow } from '../ModalWindow';
import styles from './ModalWindowWithContent.module.scss';

export function ModalWindowWithContent({ children }: IModalWindowProps) {
    return (
        <ModalWindow>
            <div className={styles['content-wrapper']}>
                {children}
            </div>
        </ModalWindow>
    )
}
import { ModalWindowWithContent } from '../../HOC/ModalWindowWithContent';
import { Button } from '../../UI/Button';
import styles from './ConfirmModal.module.scss';

interface IConfirmModalProps {
    label: string;
    confirmAction: () => void;
    closeModal: () => void;
}

export function ConfirmModal({ label, confirmAction, closeModal }: IConfirmModalProps) {
    return (
        <ModalWindowWithContent>
            <div>{label}</div>
            <div className={styles['control-buttons']}>
                <Button
                    label='Подтвердить'
                    onClick={() => {
                        confirmAction()
                        closeModal()
                    }}
                />
                <Button
                    label='Отмена'
                    onClick={closeModal}
                />
            </div>
        </ModalWindowWithContent>
    )
}
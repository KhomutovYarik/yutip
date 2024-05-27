import { ButtonHTMLAttributes } from "react";
import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
}

export function Button({ label, type, ...props }: IButtonProps) {
    return (
        <button
            className={styles['button']}
            type={type ?? 'button'}
            {...props}
        >
            {label}
        </button>
    )
}
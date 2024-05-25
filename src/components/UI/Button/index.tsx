import { ButtonHTMLAttributes } from "react";
import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
}

export function Button({ label, ...props }: IButtonProps) {
    return (
        <button
            className={styles['button']}
            {...props}
        >
            {label}
        </button>
    )
}
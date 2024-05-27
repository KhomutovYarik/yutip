import { InputHTMLAttributes } from "react";
import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Input({ label, ...props }: IInputProps) {
    let inputElement = <input className={styles['input']} {...props} />

    if (label) {
        inputElement =
            <label className={styles['input-with-label']}>
                {label}
                {inputElement}
            </label>
    }

    return (
        inputElement
    )
}
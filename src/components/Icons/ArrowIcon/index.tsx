import clsx from "clsx";
import { ArrowIconDirections } from "../../../enums/ArrowIconDirections"
import styles from './ArrowIcon.module.scss';

interface ArrowIconProps {
    direction?: ArrowIconDirections;
}

export function ArrowIcon({ direction }: ArrowIconProps) {
    return (
        <svg
            width="15"
            height="24"
            viewBox="0 0 15 24"
            xmlns="http://www.w3.org/2000/svg"
            className={
                clsx(styles['arrow-icon'], direction === ArrowIconDirections.RIGHT && styles['rotated-right-arrow'])
            }
        >
            <path d="M14.82 21.18L5.66 12L14.82 2.82L12 0L0 12L12 24L14.82 21.18Z" />
        </svg>
    )
}
import { Link } from "react-router-dom";
import { ModalWindowWithContent } from "../../HOC/ModalWindowWithContent";
import { Button } from "../../UI/Button";

interface ISuccesModalProps {
    successText: string;
    buttonLabel: string;
    href: string;
}

export function SuccessModal({ successText, buttonLabel, href }: ISuccesModalProps) {
    return (
        <ModalWindowWithContent>
            <div>{successText}</div>
            <Link to={href}>
                <Button
                    label={buttonLabel}
                />
            </Link>
        </ModalWindowWithContent>
    )
}
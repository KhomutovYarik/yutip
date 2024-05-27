import { observer } from 'mobx-react-lite';
import styles from './NewRowForm.module.scss';
import { appStore } from '../../stores/appStore';
import { FormEvent, useState } from 'react';
import { ICharacter } from '../../interfaces/ICharacter';
import { Button } from '../../components/UI/Button';
import { SuccessModal } from '../../components/Modals/SuccessModal';
import { Link } from 'react-router-dom';
import { Input } from '../../components/UI/Input';

interface FormCharacterElement extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    gender: HTMLInputElement;
    birth_year: HTMLInputElement;
    height: HTMLInputElement;
}

interface AddNewRowFormElement extends HTMLFormElement {
    readonly elements: FormCharacterElement
}

export const NewRowForm = observer(() => {
    const { addElement } = appStore;
    const [isSuccessModalOpened, setIsSuccessModalOpened] = useState(false);

    const handleSubmit = (e: FormEvent<AddNewRowFormElement>) => {
        e.preventDefault();
        const newTableRow: ICharacter = {
            name: e.currentTarget.elements.name.value,
            gender: e.currentTarget.elements.gender.value,
            birth_year: e.currentTarget.elements.birth_year.value,
            height: e.currentTarget.elements.height.value,
            url: Date.now().toLocaleString()
        };
        addElement(newTableRow);
        setIsSuccessModalOpened(true);
    }

    return (
        <div className={styles['page-wrapper']}>
            <div className={styles['page-content']}>
                <Link to='/'>← Назад</Link>
                <form className={styles['new-row-form']}
                    onSubmit={handleSubmit}
                >
                    <h1 className={styles['title']}>Добавление новой записи</h1>
                    <Input label='Имя:' name='name' required />
                    <Input label='Пол:' name='gender' required />
                    <Input label='Год рождения:' name='birth_year' required />
                    <Input label='Рост:' name='height' type='number' required />
                    <Button type='submit'
                        label='Добавить запись'
                        className={styles['submit-button']}
                    />
                    {isSuccessModalOpened &&
                        <SuccessModal
                            successText='Запись была успешно добавлена'
                            buttonLabel='Перейти к таблице'
                            href='/'
                        />
                    }
                </form>
            </div>
        </div>
    )
})
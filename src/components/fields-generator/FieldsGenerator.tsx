import React, { FC, useState } from "react"

import { IFieldsConfig, IFields } from "../../types/form"

interface IProps {
    fields: IFieldsConfig[]
    onFieldChange: (val: IFields) => void
}

/**
 * Компонент для универсальной генерации полей формы
 * @param fields - Массив с описанием конфигурации полей фромы
 * @param onFieldChange - Метод для обновления данных формы при изменении значения в одном из полей
 */
const FieldsGenerator: FC<IProps> = ({ fields, onFieldChange }) => {

    const [ formFields, setFormFields ] = useState<IFields>({})

    /**
    * Метод обработки изменения значения для поля формы
    * @param event - Обработчик типа React.ChangeEvent<HTMLInputElement>
    */
    const handleChangeFiledInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target

        setFormFields({ ...formFields, [id]: value })
        onFieldChange({ ...formFields, [id]: value })
    }

    return (
        <>
            {
                fields.map((field) => (
                    <div key={field.id}>
                        <label htmlFor={field.id}>
                            {field.label}
                        </label>

                        <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            defaultValue={field.defaultValue}
                            required={field.required}
                            onChange={handleChangeFiledInput}
                        />
                    </div>
                ))
            }
        </>
    )
}

export default FieldsGenerator

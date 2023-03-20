import React, { FC } from "react"

import "./styles/root.scss"

import UniversalForm from "./components/universal-form/UniversalForm"
import { IFields, IFieldsConfig } from "./types/form"

const App: FC = () => {

    const formConfig: IFieldsConfig[] = [
        {
            id: "first_name",
            type: "inputText",
            label: "Имя",
            defaultValue: "Ваше имя",
        },
        {
            id: "last_name",
            type: "inputText",
            label: "Фамилия",
        },
        {
            id: "email",
            type: "inputEmail",
            label: "Email",
            required: true,
        },
        {
            id: "password",
            type: "inputPassword",
            label: "Пароль",
            required: true,
        },
    ]

    /**
     * Form submit method
     */
    const submitForm = (values: IFields) => {
        console.log(values)
    }

    return (
        <div className="test-page">
            <div className="test-form">
                <UniversalForm
                    formTitle="Регистрация"
                    formDescription="Для доступа к сервису необходимо пройти регистрацию."
                    formConfig={formConfig}
                    onSubmit={submitForm}
                />
            </div>
        </div>
    )
}

export default App

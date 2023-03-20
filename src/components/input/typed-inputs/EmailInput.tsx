import React, { FC, useState } from "react"

import { IInputProps } from "../../../types/form"
import { isValidEmail } from "../../../utils/validation"

const EmailInput: FC<IInputProps> = ({ defaultValue, label, id, onFieldChange }) => {
    const [ validateError, setValidateError ] = useState<string>("")

    /**
     * Email field value validator
     * @param event - Handler type of React.ChangeEvent<HTMLInputElement>
     */
    const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target

        if (isValidEmail(value) || value === "") {
            setValidateError("")
            onFieldChange(id, value)
        } else {
            setValidateError("Проверьте правильность адреса электронной почты")
            onFieldChange(id, "")
        }
    }

    return (
        <>
            <input
                type={"email"}
                id={id}
                defaultValue={defaultValue}
                placeholder={label}
                onChange={validateEmail}
            />

            {
                validateError && (
                    <div className="un-form__error-wrapper un-form__error">
                        {validateError}
                    </div>
                )
            }
        </>
    )
}

export default EmailInput

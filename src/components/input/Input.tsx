import React, { FC } from "react"

import EmailInput from "./typed-inputs/EmailInput"
import PasswordInput from "./typed-inputs/PasswordInput"
import TextInput from "./typed-inputs/TextInput"

interface IProps {
    type: "inputText" | "inputEmail" | "inputPassword"
    id: string
    label: string
    defaultValue?: string
    onFieldChange: (id: string, value: string) => void
}

const Input: FC<IProps> = ({ type, defaultValue, label, id, onFieldChange }) => {

    switch (type) {
        case "inputText":
            return (
                <TextInput
                    id={id}
                    label={label}
                    defaultValue={defaultValue}
                    onFieldChange={onFieldChange}
                />
            )
        case "inputEmail":
            return (
                <EmailInput
                    id={id}
                    label={label}
                    defaultValue={defaultValue}
                    onFieldChange={onFieldChange}
                />
            )
        case "inputPassword":
            return (
                <PasswordInput
                    id={id}
                    label={label}
                    defaultValue={defaultValue}
                    onFieldChange={onFieldChange}
                />
            )

        default:
            return (
                <TextInput
                    id={id}
                    label={label}
                    defaultValue={defaultValue}
                    onFieldChange={onFieldChange}
                />
            )
    }
}

export default Input

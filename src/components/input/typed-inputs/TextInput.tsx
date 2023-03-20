import React, { FC } from "react"

import { IInputProps } from "../../../types/form"

const TextInput: FC<IInputProps> = ({ defaultValue, label, id, onFieldChange }) => {
    return (
        <input
            type={"text"}
            id={id}
            defaultValue={defaultValue}
            placeholder={label}
            onChange={(event) => onFieldChange(event.target.id, event.target.value)}
        />
    )
}

export default TextInput

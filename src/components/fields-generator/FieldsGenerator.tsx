import React, { FC, useEffect, useState } from "react"

import { IFieldsConfig, IFields } from "../../types/form"
import Input from "../input/Input"

interface IProps {
    fieldsConfig: IFieldsConfig[]
    setFormValid: (val: boolean) => void
    onFieldChange: (val: IFields) => void
}

/**
 * Universal form fields generator component
 * @param fieldsConfig - Array of fields configuration
 * @param setFormValid - Method for updating form validate state
 * @param onFieldChange - Method for fields value update
 */
const FieldsGenerator: FC<IProps> = ({ fieldsConfig, setFormValid, onFieldChange }) => {

    const [ values, setValues ] = useState<{ [id: string]: string }>(
        Object.fromEntries(fieldsConfig.map((field) => [ field.id, field.defaultValue || "" ]))
    )

    /**
    * Field value updater
    * @param id - Field ID
    * @param value - Field value
    */
    const handleChangeFiledInput = (id: string, value: string) => {
        setValues({ ...values, [id]: value })
        onFieldChange({ ...values, [id]: value })
    }

    /**
     * Validate form required fields method
     */
    const handleValidation = () => {
        const isAllFieldsValid = fieldsConfig.every(
            (field) => !field.required || (values[field.id] && values[field.id].trim() !== "")
        )
        setFormValid(isAllFieldsValid)
    }

    useEffect(() => {
        handleValidation()
    }, [ values ])

    return (
        <>
            {
                fieldsConfig.map((field) => (
                    <div key={field.id}>
                        {
                            field.required && !values[field.id] && (
                                <span className="un-form__error">
                                    *
                                </span>
                            )
                        }
                        <Input
                            type={field.type}
                            id={field.id}
                            defaultValue={values[field.id]}
                            label={field.label}
                            onFieldChange={handleChangeFiledInput}
                        />
                    </div>
                ))
            }
        </>
    )
}

export default FieldsGenerator

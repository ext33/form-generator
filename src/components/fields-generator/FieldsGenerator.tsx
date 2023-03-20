import React, { FC, useState } from "react"

import { IFieldsConfig, IFields } from "../../types/form"
import Input from "../input/Input"

interface IProps {
    fieldsConfig: IFieldsConfig[]
    formErrors: { [key: string]: string }
    onFieldChange: (val: IFields) => void
}

/**
 * Universal form fields generator component
 * @param fieldsConfig - Array of fields configuration
 * @param formErrors - Object of form errors (id : error message)
 * @param onFieldChange - Method for fields value update
 */
const FieldsGenerator: FC<IProps> = ({ fieldsConfig, formErrors, onFieldChange }) => {

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

    return (
        <>
            {
                fieldsConfig.map((field) => (
                    <div key={field.id}>
                        <Input
                            type={field.type}
                            id={field.id}
                            defaultValue={values[field.id]}
                            label={field.label}
                            onFieldChange={handleChangeFiledInput}
                        />
                        {
                            formErrors[field.id] && (
                                <span className="un-form__error un-form__error-wrapper">
                                    {formErrors[field.id]}
                                </span>
                            )
                        }
                    </div>
                ))
            }
        </>
    )
}

export default FieldsGenerator

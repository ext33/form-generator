import React, { FC, useState } from "react"

import { IFields, IFieldsConfig } from "../../types/form"
import FieldsGenerator from "../fields-generator/FieldsGenerator"

interface IProps {
    formTitle: string
    formDescription?: string
    formConfig: IFieldsConfig[]
    onSubmit: (values: IFields) => void
}

const UniversalForm: FC<IProps> = ({ formTitle, formDescription, formConfig, onSubmit }) => {

    const [ formValues, setFormValues ] = useState<IFields>({})
    const [ formIsValid, setFormIsValid ] = useState<boolean>(false)

    /**
     * Fields update handler
     * @param updateFields - object of fields values (key : value)
     */
    const updateFieldsHandler = (updateFields: IFields) => {
        setFormValues(updateFields)
    }

    return (
        <form className="un-form">
            <div className="un-form__head">
                <h3>
                    {formTitle}
                </h3>
                {
                    formDescription && (
                        <p>{formDescription}</p>
                    )
                }
            </div>

            <div className="un-form__fields">
                <FieldsGenerator
                    fieldsConfig={formConfig}
                    setFormValid={setFormIsValid}
                    onFieldChange={updateFieldsHandler}
                />
            </div>

            <div className="un-form__bottom">
                <button
                    className="un-form__submit-button"
                    disabled={!formIsValid}
                    onClick={() => onSubmit(formValues)}
                    type="button"
                >
                    Подтвердить
                </button>
            </div>
        </form>
    )
}

export default UniversalForm

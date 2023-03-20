import React, { FC, useEffect, useMemo, useState } from "react"

import { IFields, IFieldsConfig } from "../../types/form"
import {
    getEmailFieldsKeys,
    getRequiredFieldsKeys,
    validateEmailFields,
    validateReqFields
} from "../../utils/validation"
import FieldsGenerator from "../fields-generator/FieldsGenerator"

interface IProps {
    formTitle: string
    formDescription?: string
    formConfig: IFieldsConfig[]
    onSubmit: (values: IFields) => void
}

const UniversalForm: FC<IProps> = ({ formTitle, formDescription, formConfig, onSubmit }) => {

    const [ formValues, setFormValues ] = useState<IFields>({})
    const [ formErrors, setFormErrors ] = useState<{ [key: string]: string }>({})
    const [ isValidateStart, setIsValidateStart ] = useState<boolean>(false)
    const [ isButtonLocked, setIsButtonLocked ] = useState<boolean>(true)

    const requiredFields = useMemo(() => getRequiredFieldsKeys(formConfig), [ formConfig ])
    const emailFields = useMemo(() => getEmailFieldsKeys(formConfig), [ formConfig ])

    /**
     * Fields update handler
     * @param updateFields - object of fields values (key : value)
     */
    const updateFieldsHandler = (updateFields: IFields) => {
        setFormValues(updateFields)
    }

    /**
     * Fields validate handler
     */
    const validateFields = () => {
        validateReqFields(requiredFields, formValues, setFormErrors)
        validateEmailFields(emailFields, formValues, setFormErrors)
    }

    useEffect(() => {
        if (isValidateStart) {
            validateFields()
            setIsButtonLocked(false)
        } else {
            setIsValidateStart(true)
        }
    }, [ formValues ])

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
                    formErrors={formErrors}
                    onFieldChange={updateFieldsHandler}
                />
            </div>

            <div className="un-form__bottom">
                <button
                    className="un-form__submit-button"
                    disabled={isButtonLocked ? true : Object.keys(formErrors).length > 0}
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

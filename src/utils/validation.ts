import React from "react"

import { IFieldsConfig } from "../types/form"

/**
 * Method for generating keys array of required fields
 * @param config - Form fields config
 */
export const getRequiredFieldsKeys = (config: IFieldsConfig[]): string[] => {
    return config
        .filter((configItem) => configItem.required)
        .map((configItem) => configItem.id)
}

/**
 * Method for generating keys array of email fields
 * @param config - Form fields config
 */
export const getEmailFieldsKeys = (config: IFieldsConfig[]): string[] => {
    return config
        .filter((configItem) => configItem.type === "inputEmail")
        .map((configItem) => configItem.id)
}

/**
 * Email validation method
 * @param email - Email string
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailRegex.test(email)
}

/**
 * Required fields validation method with error setter
 * @param requiredFields - Array of required fields ids
 * @param formValues - Object of form values (id : value)
 * @param setFormErrors - Method for setting state form error
 */
export const validateReqFields = (requiredFields: string[], formValues: { [key: string]: string }, setFormErrors: React.Dispatch<React.SetStateAction<{[p: string]: string}>>) => {
    requiredFields.forEach((reqId) => {
        const value = formValues[reqId]

        if (!value) {
            setFormErrors((prevState) => ({
                ...prevState,
                [reqId]: "Поле обязательно"
            }))
        } else {
            setFormErrors((prevState) => {
                let cp = prevState
                delete cp[reqId]
                return cp
            })
        }
    })
}

/**
 * Required fields validation method with error setter
 * @param emailFields - Array of email fields ids
 * @param formValues - Object of form values (id : value)
 * @param setFormErrors - Method for setting state form error
 */
export const validateEmailFields = (emailFields: string[], formValues: { [key: string]: string }, setFormErrors: React.Dispatch<React.SetStateAction<{[p: string]: string}>>) => {
    emailFields.forEach((emailId) => {
        const value = formValues[emailId]

        if (!isValidEmail(value)) {
            setFormErrors((prevState) => ({
                ...prevState,
                [emailId]: "Проверьте правильность введенной почты"
            }))
        } else {
            setFormErrors((prevState) => {
                let cp = prevState
                delete cp[emailId]
                return cp
            })
        }
    })
}

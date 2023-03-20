
export interface IFieldsConfig {
    id: string
    type: "inputText" | "inputEmail" | "inputPassword"
    label: string
    defaultValue?: string
    required?: boolean
}

export interface IFields {
    [key: string]: string
}

export interface IInputProps {
    id: string
    label: string
    defaultValue?: string
    onFieldChange: (id: string, value: string) => void
}

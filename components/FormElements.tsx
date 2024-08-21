import React from "react";
import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField"

export type SubmitFunction =  (key:string, value: string) => void


export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementIstance

    designerBtnElement: {
        Icon: React.ElementType,
        label: string
    }

    designerComponent: React.FC<{
        elementInstance:FormElementIstance
    }>;
    formComponet: React.FC<{
        elementInstance:FormElementIstance,
        submitValue ?: SubmitFunction,
        isInvalid?: boolean,
        defaultValues?: string
    }>;
    propertiesComponent: React.FC<{
        elementInstance:FormElementIstance
    }>;

    validate: (FormElement: FormElementIstance, currentValue: string) => boolean
}



export type FormElementIstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>
}


export type FormElementsType = {
    [key in ElementsType]: FormElement;
}

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    
}
import React from "react";
import { TextFieldFormElement } from "./TextField";

export type ElementsType = "TextField"

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
        elementInstance:FormElementIstance
    }>;
    propertiesComponent: React.FC<{
        elementInstance:FormElementIstance
    }>;
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
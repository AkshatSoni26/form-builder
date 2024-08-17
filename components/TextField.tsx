"use client"

import { MdTextFields } from "react-icons/md"
import { ElementsType, FormElement } from "./FormElements"

const type:ElementsType = "TextField"

export const TextFieldFormElement: FormElement = {
    type, 

    construct: (id:string)=> ({
        id,
        type,
        extraAttributes: {
            label: "Text field",
            helperText: "Helper text",
            required: false,
            placeholder:'Value here...'
        }
    }),
    designerBtnElement: {
        Icon: MdTextFields,
        label: "Text  Field"
    },
    designerComponent: () => <div>Designer componet</div>, 
    formComponet: () => <div>Form componet</div>, 
    propertiesComponent: () => <div>Properties componet</div>, 
}
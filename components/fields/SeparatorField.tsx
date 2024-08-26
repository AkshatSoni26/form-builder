"use client"

import { MdTextFields } from "react-icons/md"
import { ElementsType, FormElement, FormElementIstance, FormElements, SubmitFunction } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import {RiSeparator} from 'react-icons/ri'
import { Separator } from "../ui/separator"

const type: ElementsType = "SeparatorField"

export const SeparatorFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
    }),
    designerBtnElement: {
        Icon: RiSeparator,
        label: "Separator Field"
    },
    designerComponent: DesignerComponent,
    formComponet: FormComponet,
    propertiesComponent: PropertiesComponent,

    validate: () => true
}


function PropertiesComponent({
    elementInstance
}: { elementInstance: FormElementIstance }) {
    return <p>No propperties for this element</p>
}



function DesignerComponent({
    elementInstance
}: { elementInstance: FormElementIstance }) {


    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">
                Separator field
            </Label>
            <Separator />
        </div>
    )
}

function FormComponet({
    elementInstance,
}: {
    elementInstance: FormElementIstance,
}) {
    return <Separator />
}
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
import { LuHeading1, LuSeparatorHorizontal } from "react-icons/lu"
import { Slider } from "../ui/slider"

const type: ElementsType = "SpacerField"

const extraAttributes = {
    height: 20 // px
}

const propertiesSchema = z.object({
    height: z.number().min(5).max(200)
})

export const SpacerFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        Icon: LuSeparatorHorizontal,
        label: "Spacer Field"
    },
    designerComponent: DesignerComponent,
    formComponet: FormComponet,
    propertiesComponent: PropertiesComponent,

    validate: () => true
}

type CustomeInstance = FormElementIstance & {
    extraAttributes: typeof extraAttributes
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

function PropertiesComponent({
    elementInstance
}: { elementInstance: FormElementIstance }) {

    const element = elementInstance as CustomeInstance

    const { updateElement } = useDesigner()

    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: 'onBlur',
        defaultValues: {
            height: element.extraAttributes.height,

        }
    })

    useEffect(
        () => {
            form.reset(element.extraAttributes)
        }, [element, form]
    )

    function applyChanges(values: propertiesFormSchemaType) {
        const { height } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                height
            }
        })
    }

    return (
        <Form {...form}>
            <form
                onBlur={form.handleSubmit(applyChanges)}
                className="space-y-3"
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Heigth (px): {form.watch("height")}</FormLabel>
                            <FormControl >
                                <Slider
                                defaultValue={[field.value]}
                                min={5}
                                max={200}
                                step={1}
                                onValueChange={
                                    (value) => {
                                        field.onChange(value[0])
                                    }
                                }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}



function DesignerComponent({
    elementInstance
}: { elementInstance: FormElementIstance }) {
    const element = elementInstance as CustomeInstance

    const { height } = element.extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full items-center">
            <Label className="text-muted-foreground">
                Spacer field: {height} px
            </Label>
            <LuSeparatorHorizontal className="h-8 w-8" />
        </div>
    )
}

function FormComponet({
    elementInstance,
}: {
    elementInstance: FormElementIstance,
}) {

    const element = elementInstance as CustomeInstance
    const { height } = element.extraAttributes

    return (
        <div style={{height, width:'100%'}}>
            {height}
        </div>
    )
}
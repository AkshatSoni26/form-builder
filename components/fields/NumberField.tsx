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
import { Switch } from "../ui/switch"
import { cn } from "@/lib/utils"
import { Bs123 } from "react-icons/bs"

const type: ElementsType = "NumberField"

const extraAttributes = {
    label: "Text field",
    helperText: "Helper text",
    required: false,
    placeholder: '0'
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeholder: z.string().max(50)
})

export const NumberFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        Icon: Bs123,
        label: "Number Field"
    },
    designerComponent: DesignerComponent,
    formComponet: FormComponet,
    propertiesComponent: PropertiesComponent,

    validate: (FormElement: FormElementIstance, currentValue: string): boolean => {
        const element = FormElement as CustomeInstance

        if (element.extraAttributes.required) {
            return currentValue.length > 0
        }

        return true
    }
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
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            placeholder: element.extraAttributes.placeholder,
            required: element.extraAttributes.required,
        }
    })

    useEffect(
        () => {
            form.reset(element.extraAttributes)
        }, [element, form]
    )

    function applyChanges(values: propertiesFormSchemaType) {
        const { label, helperText, placeholder, required } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeholder,
                required
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
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl >
                                <Input {...field} onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur()
                                }} />
                            </FormControl>
                            <FormDescription>
                                The label of the field. <br /> It will be displayed above the field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="placeholder"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Placeholder</FormLabel>
                            <FormControl >
                                <Input {...field} onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur()
                                }} />
                            </FormControl>
                            <FormDescription>
                                The placeholder of the field.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="helperText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>helperText</FormLabel>
                            <FormControl >
                                <Input {...field} onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur()
                                }} />
                            </FormControl>
                            <FormDescription>
                                The helper text of the field. <br />
                                It will be displayed below the field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Required</FormLabel>
                                <FormDescription>
                                    The helper text of the field. <br />
                                    It will be displayed below the field
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
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

    const { label, helperText, placeholder, required } = element.extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Input readOnly disabled type="number" placeholder={placeholder} />
            {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
        </div>
    )
}

function FormComponet({
    elementInstance, 
    submitValue, 
    isInvalid,
    defaultValues
}: { 
    elementInstance: FormElementIstance, 
    submitValue?: SubmitFunction, 
    isInvalid?: boolean,
    defaultValues?:string
 }) {

    const [value, setValue] = useState(defaultValues || "")
    const [error, setError] = useState(false)  

    useEffect(
        () => {
            setError(isInvalid === true)
        }, [isInvalid]
    )

    const element = elementInstance as CustomeInstance
    const { label, helperText, placeholder, required } = element.extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(error && "text-red-500")}>
                {label}
                {required && "*"}
            </Label>
            <Input
            type="number"
                className={cn(error && "border-red-500")}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                onBlur={(e) => {
                    if (!submitValue) return

                    const valid = NumberFieldFormElement.validate(element, e.target.value)
                    submitValue(element.id, e.target.value)
                }}
            />
            {helperText && <p className={cn("text-muted-foreground text-[0.8rem]",
                error && 'text-red-500'
            )}>{helperText}</p>}
        </div>
    )
}
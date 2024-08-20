"use client"

import { MdTextFields } from "react-icons/md"
import { ElementsType, FormElement, FormElementIstance } from "./FormElements"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "./hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Switch } from "./ui/switch"

const type: ElementsType = "TextField"

const extraAttributes = {
    label: "Text field",
    helperText: "Helper text",
    required: false,
    placeholder: 'Value here...'
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeholder: z.string().max(50)
})

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        Icon: MdTextFields,
        label: "Text  Field"
    },
    designerComponent: DesignerComponent,
    formComponet: FormComponet,
    propertiesComponent: PropertiesComponent,
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
            <Input readOnly disabled placeholder={placeholder} />
            {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
        </div>
    )
}

function FormComponet({
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
            <Input placeholder={placeholder} />
            {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
        </div>
    )
}
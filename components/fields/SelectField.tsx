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
import { RxDropdownMenu } from 'react-icons/rx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"

const type: ElementsType = "SelectField"

const extraAttributes = {
    label: "Select field",
    helperText: "Helper text",
    required: false,
    placeholder: 'Value here...',
    options: []
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeholder: z.string().max(50),
    options: z.array(z.string()).default([])
})

export const SelectFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        Icon: RxDropdownMenu,
        label: "Select Field"
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

    const { updateElement, setSelectedElement } = useDesigner()

    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: 'onSubmit',
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            placeholder: element.extraAttributes.placeholder,
            required: element.extraAttributes.required,
            options: element.extraAttributes.options
        }
    })

    useEffect(
        () => {
            form.reset(element.extraAttributes)
        }, [element, form]
    )

    function applyChanges(values: propertiesFormSchemaType) {
        const { label, helperText, placeholder, required, options } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeholder,
                required,
                options
            }
        })
        toast({
            title:"Success",
            description:"Properties saved successfully"
        })

        setSelectedElement(null )
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(applyChanges)}
                className="space-y-3"
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
                <Separator />
                <FormField
                    control={form.control}
                    name="options"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center">
                                <FormLabel>Options</FormLabel>
                                <Button
                                    variant={'outline'}
                                    className="gap-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        form.setValue("options", field.value.concat("New option"));
                                    }}
                                >
                                    <AiOutlinePlus />
                                    Add
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {
                                    form.watch("options").map(
                                        (option, index) => (
                                            <div key={index} className="flex items-center justify-between gap-1">
                                                <Input placeholder="" value={option} onChange={
                                                    e => {
                                                        field.value[index] = e.target.value
                                                        field.onChange(field.value)
                                                    }
                                                } />
                                                <Button
                                                variant={'ghost'} size={"icon"}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    const newOPtions = [...field.value]
                                                    newOPtions.splice(index, 1)
                                                    field.onChange(newOPtions)
                                                }}
                                                >
                                                    <AiOutlineClose />
                                                </Button>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                            <FormDescription>
                                The helper text of the field. <br />
                                It will be displayed below the field.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator />  
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
                <Separator /> 
                <Button className="w-full" type="submit" >Save</Button>
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
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
            </Select>
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
    defaultValues?: string
}) {

    const [value, setValue] = useState(defaultValues || "")
    const [error, setError] = useState(false)

    useEffect(
        () => {
            setError(isInvalid === true)
        }, [isInvalid]
    )

    const element = elementInstance as CustomeInstance
    const { label, helperText, placeholder, required, options } = element.extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(error && "text-red-500")}>
                {label}
                {required && "*"}
            </Label>
            <Select 
            defaultValue={value}
            onValueChange={
                value => {
                    setValue(value)
                    if (!submitValue) return
                    const valid = SelectFieldFormElement.validate(
                        element, value
                    )
                    setError(!valid)
                    submitValue(element.id, value)
                }
            }>
                <SelectTrigger className={cn("w-full", error && "border-red-500")}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {
                        options.map(
                            option => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            )
                        )
                    }
                </SelectContent>
            </Select>
            {helperText && <p className={cn("text-muted-foreground text-[0.8rem]",
                error && 'text-red-500'
            )}>{helperText}</p>}
        </div>
    )
}
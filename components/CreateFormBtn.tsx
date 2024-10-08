"use client"

import { formSchema, formSchemaType } from '@/schemas/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { ImSpinner2 } from 'react-icons/im'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'
import { CreateForm } from '@/action/form'
import { BsFileEarmarkPlus } from 'react-icons/bs'
import { useRouter } from 'next/navigation'




function CreateFormBtn() {

    const router = useRouter()

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: formSchemaType) {
        try {
            const formId = await CreateForm(values)
            toast({
                title: "Success",
                description: 'From created successfully.'
            })
            router.push(`/builder/${formId}`)
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: 'destructive'
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} className='group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-background'>
                    <BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
                    <p className='font-bold text-xl text-mutes-foreground group-hover:text-primary'>Create new form</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Form
                    </DialogTitle>
                    <DialogDescription>
                        Create a new form to start collecting responses
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button disabled={form.formState.isSubmitting} className='w-full mt-4'
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        {!form.formState.isSubmitting && <span>Save</span>}
                        {form.formState.isSubmitting && <ImSpinner2 className='animate-spin' />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default CreateFormBtn
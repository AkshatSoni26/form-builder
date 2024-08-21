import { GetFormContentByUrl } from '@/action/form'
import { FormElementIstance } from '@/components/FormElements'
import FormSubmitComponet from '@/components/FormSubmitComponet'
import React from 'react'

async function page({params}: {
    params: {
        formUrl:string
    }
}) {

    const form = await GetFormContentByUrl(params.formUrl)

    if (!form) {
        throw new Error("form not found.")
    }

    const formContent = JSON.parse(form.content) as FormElementIstance[]

  return <FormSubmitComponet formUrl={params.formUrl} content={formContent} />
}

export default page
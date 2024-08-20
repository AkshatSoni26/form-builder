import { GetFormById } from '@/action/form';
import FormBuilder from '@/components/FormBuilder';
import FormLinkShare from '@/components/FormLinkShare';
import VisitBtn from '@/components/VisitBtn';
import React from 'react'

async function FormDetailPage({ params }: {
  params: {
    id: string;
  }
}) {
  const { id } = params
  const form = await GetFormById(Number(id))

  if (!form) {
    throw new Error("form not found")
  }

  const { visits, submissions } = form

  let submissionRate = 0

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100
  }

  const bounceRate = 100 - submissionRate



  return (
    <>
      <div className="py-10 border-t border-muted">
        <div className='flex justify-between'>
          <h1 className='text-4xl font-bold truncate'>
            {form.name}
          </h1>
          <VisitBtn shareURL={form.shareURL} />
        </div>
        <div className='py-4 border-b border-muted'>
          <div className='container flex gap-2 items-center justify-between'>
            <div >
            <FormLinkShare shareURL={form?.shareURL}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormDetailPage
import { GetFormById, GetFormWithSubmissions } from '@/action/form';
import FormBuilder from '@/components/FormBuilder';
import { ElementsType, FormElementIstance } from '@/components/FormElements';
import FormLinkShare from '@/components/FormLinkShare';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import VisitBtn from '@/components/VisitBtn';
import { formatDistance } from 'date-fns';
import { Award } from 'lucide-react';
import React, { ReactNode } from 'react'

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
      <div className="py-10 border-muted">
        <div className='flex justify-between'>
          <h1 className='text-4xl font-bold truncate'>
            {form.name}
          </h1>
          <VisitBtn shareURL={form.shareURL} />
        </div>
        <div className='py-4 border-b border-t mt-2 border-muted'>
          <div className='container flex gap-2 items-center justify-between'>
            <FormLinkShare shareURL={form?.shareURL} />
          </div>
        </div>
        <SubmissionsTable id={form.id} />
      </div>
    </>
  )
}

export default FormDetailPage


type Row = {
  [key: string]: string
} & { submittedAt: Date }


async function SubmissionsTable({ id }: { id: number }) {

  const form = await GetFormWithSubmissions(id)

  if (!form) {
    throw new Error("form not found")
  }

  const formElement = JSON.parse(form.content) as FormElementIstance[]

  const columns: {
    id: string,
    label: string,
    required: string,
    type: ElementsType
  }[] = []


  formElement.forEach(
    element => {
      switch (element.type) {
        case "TextField":
          columns.push({
            id: element.id,
            label: element.extraAttributes?.label,
            required: element.extraAttributes?.required,
            type: element.type
          })
          break;
        default:
          break;
      }
    }
  )

  const rows: Row[] = []

  form.FormSubmissions.forEach(
    submission => {
      const content = JSON.parse(submission.content)
      rows.push({
        ...content,
        submittedAt: submission.createdAt
      })
    }
  )

  return (
    <>
      <h1 className='text-2xl font-bold my-4'>
        Submissions
      </h1>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {
                columns.map(
                  (column) =>
                    <TableHead key={column.id} className='uppercase'>
                      {column.label}
                    </TableHead>
                )
              }
              <TableHead className='text-muted-foreground text-right uppercase'>
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              rows.map(
                (row, index) => <TableRow key={index}>
                  {
                    columns.map(
                      column => (
                        <RowCell key={column.id} type={column.type} value={row[column.id]} />
                      )
                    )
                  }
                  <TableCell className='text-muted-foreground text-right'>
                    {formatDistance(row.submittedAt, new Date(), {
                      addSuffix: true
                    })}
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
    </>
  )
}


function RowCell ({type,value}:{type: ElementsType,value: string}){
  let node: ReactNode = value
  return <TableCell>{node}</TableCell>

}
import React, { startTransition, useTransition } from 'react'
import { Button } from './ui/button'
import { MdOutlinePublish } from 'react-icons/md'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { FaIcons } from 'react-icons/fa'
import { toast } from './ui/use-toast'
import { PublishForm } from '@/action/form'
import { useRouter } from 'next/navigation'


function PublishFormBtn({id}: {id: number}) {

  const [loading, startTransition] = useTransition()
  const router = useRouter()

  async function publishForm() {
    try {
      await PublishForm(id)
      toast({
        title: "Success",
        description:'Your form is now available to the public',
      })
      router.refresh()

    } catch (error) {
      toast({
        title: "Error",
        description:'Something went wrong',
        variant:'destructive'
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={'outline'} className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400 '>
          <MdOutlinePublish className='h-4 w-4' />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader> 
        <AlertDialogTitle> Are you absolutely sure? </AlertDialogTitle>
        <AlertDialogDescription>This action cannot be undone. After publishing
          will not be able to edit this form.
          <br />
          <span className="font-medium">
            By publishing this form you will make it availablee to the public and you will be able to collecy submissions.
          </span>
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={(e) => {
            e.preventDefault()
            startTransition(publishForm)
          }}> 
            Proceed {loading && <FaIcons className='animate-spin'/> }
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PublishFormBtn
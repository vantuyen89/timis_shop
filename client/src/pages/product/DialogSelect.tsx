import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import selectSize from '@/images/selectSize.webp'
import { Button } from '@/components/ui/button'

const DialogSelect = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='text-red-500'>
          Hướng dẫn chọn size
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Hướng dẫn chọn size</DialogTitle>
        </DialogHeader>
        <div className='py-4'>
          <img src={selectSize} alt='' />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogSelect

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
export interface Dialog {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  status: string
}
const DialogConfirm = ({ open, onClose, onSubmit, title, status }: Dialog) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{ title}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button type='submit' onClick={onClose}>Thoát</Button>
            <Button type='submit' onClick={onSubmit}>{status}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DialogConfirm

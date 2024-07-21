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
  status: 'success' | 'warning' | 'error' | 'info'
}
const DialogConfirm = ({ open, onClose, onSubmit, title, status }: Dialog) => {
  return (
    <div>
      <Dialog open={!!open}>
        <DialogTrigger asChild>
          <Button variant='outline'>Xác nhận</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{ title}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button type='submit' onClick={()=>onClose}>Hủy</Button>
            <Button type='submit' onClick={()=>onSubmit}>{status}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DialogConfirm

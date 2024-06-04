import { ReactNode, useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Loader from "./loader";
import { Button } from "./ui/button";

type Props = {
  title: ReactNode
  description?: ReactNode;
  confirmText?: ReactNode;
  open: boolean,
  onConfirm: (callback: () => void) => void
  onClose?: () => void;
}

export default function DialogAlert({ open, title, description, confirmText, onConfirm, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  function handleConfirm() {
    if (isLoading) return
    setIsLoading(true)
    onConfirm(() => setIsLoading(false))
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader >
          <AlertDialogTitle className="text-pretty">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="break-words">
            {description || "您想刪除它嗎？"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {onClose && <AlertDialogCancel
            onClick={onClose}
            disabled={isLoading}
            className="border-none"
          >
            取消
          </AlertDialogCancel>}
          <Button
            type='button'
            variant={confirmText ? "default" : "destructive"}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading && <Loader className="mr-1 text-neutral-50" />}
            {confirmText ?? "刪除"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

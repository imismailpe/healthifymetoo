"use client";
import { LoginForm } from "@/components/login-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          router.back();
        } else {
          setOpen(true);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}

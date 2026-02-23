"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth";

interface SignUpDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SignUpDialog({ open, onClose, onSuccess }: SignUpDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    signUp(name.trim(), email.trim());
    setName("");
    setEmail("");
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="light-content max-w-sm border-border bg-white text-foreground">
        <DialogHeader>
          <DialogTitle>Unete a Unaluka Deals</DialogTitle>
          <DialogDescription>
            Crea tu cuenta para dar likes y comentar en los deals.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full bg-deal-red text-white hover:bg-deal-red-hover"
          >
            Registrarse
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface MessageActionsProps {
  message: {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
  };
}

export function MessageActions({ message }: MessageActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">Leer</Button>
        </DialogTrigger>
        <DialogContent>
          <div className="space-y-2">
            <div className="text-xs text-gray-500">ID: {message.id}</div>
            <div><span className="font-semibold">Nombre:</span> {message.name}</div>
            <div><span className="font-semibold">Email:</span> {message.email}</div>
            <div><span className="font-semibold">Asunto:</span> {message.subject}</div>
            <div><span className="font-semibold">Mensaje:</span></div>
            <div className="p-2 bg-gray-100 rounded text-sm whitespace-pre-line max-h-56 overflow-auto">{message.message}</div>
            <div className="text-xs text-gray-500">Fecha: {new Date(message.createdAt).toLocaleString()}</div>
          </div>
        </DialogContent>
      </Dialog>
      <Button size="sm" variant="ghost" onClick={handleCopy} title="Copiar email">
        <Copy className="w-4 h-4" />
        {copied && <span className="ml-1 text-xs text-green-500">Copiado</span>}
      </Button>
    </div>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PencilIcon, Trash2Icon, PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2Icon, UserCheckIcon, UserXIcon, UserSearchIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useSocket } from "@/hooks/useSocket"

// type SearchState = 'idle','loading','success','error'
type SearchState = 'idle' | 'loading' | 'found' | 'not-found';


export default function EmergencyContactsPage() {
  const { data: session, status } = useSession();
  const [contacts, setContacts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [email, setEmail] = useState("");
  const [newContact, setNewContact] = useState<any>(null);
  const socket = useSocket();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      console.log('No hay sesión activa');
      return;
    }

    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/emergency-contacts", {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${session.accessToken}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Error al obtener los contactos de emergencia");
        }

        const data = await response.json();
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
      }
    };

    fetchContacts();
  }, [status]); // Añadimos status a las dependencias

  const searchUser = async () => {
    if (!email) return;

    setSearchState("loading");
    try {
      const response = await fetch(`/api/user/?email=${email}`);
      if (!response.ok) {
        setSearchState("not-found");
        throw new Error("Error al buscar el usuario");
      }
      setSearchState("found");
      const data = await response.json();
      setNewContact(data);
    } catch (error) {
      console.error("Error al buscar el usuario:", error);
      setSearchState("not-found");
    }
  }

  const addContact = async () => {
    if (!newContact) return;
    try {
      const response = await fetch("/api/emergency-contacts", {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ contactId: newContact.id })
      });
      if (!response.ok) {
        throw new Error("Error al agregar el contacto");
      }
      const data = await response.json();
      setContacts([...contacts, data]);
      setNewContact(null);
      setEmail("");
      setSearchState("idle");
    } catch (error) {
      console.error("Error al agregar el contacto:", error);
    }
  }

  const renderSearchIcon = () => {
    switch (searchState) {
      case 'loading':
        return <Loader2Icon className="animate-spin" />
      case 'found':
        return <UserCheckIcon />
      case 'not-found':
        return <UserXIcon />
      default:
        return <UserSearchIcon />
    }
  }

  return (
    <div className="flex flex-col gap-4 px-8 min-h-[100%]">
      <div className="flex justify-end items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="default" size="sm">
              <PlusIcon className="w-4 h-4" />
              Nuevo contacto
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Nuevo contacto</SheetTitle>
              <SheetDescription>
                Agrega un nuevo contacto de emergencia
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6">
              <div className="grid gap-3 align-center">
                <div>
                  <Label htmlFor="sheet-demo-username">Email</Label>
                </div>
                <div className="flex gap-3">
                  <Input id="sheet-demo-username"
                    placeholder="peduarte@example.com"
                    onChange={(e) => {
                      setEmail(e.target.value)
                      // if (searchState !== 'idle') setSearchState('idle');
                    }}
                    value={email} />
                  <Button onClick={searchUser}>
                    {renderSearchIcon()}
                  </Button>
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Nombre</Label>
                <Input id="sheet-demo-name" placeholder="Pedro Duarte" />
              </div>
            </div>
            <SheetFooter>
              <Button type="button" onClick={addContact}>Guardar</Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          cargando...
        </div>
      ) : <div className="">
        {contacts.length === 0 ? <div>
          <p className="text-muted-foreground">Aun no cuentas con contactos de emergencia, agrega uno</p>
        </div>: 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{contacts.map((contact: any) => (
          <Card key={contact.id} className="flex items-center px-4 py-3">
            <CardContent className="flex items-center w-full gap-4 p-0">
              <Avatar>
                <AvatarFallback>{contact?.name?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium text-lg">
                  {contact.name || <span className="text-muted-foreground">Sin nombre</span>}
                </div>
                <div className="text-muted-foreground">{contact.phone}</div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked={contact.notify} disabled />
                <span className="text-sm text-muted-foreground">Notif.</span>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button size="icon" variant="ghost">
                  <PencilIcon />
                </Button>
                <Button size="icon" variant="ghost">
                  <Trash2Icon />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}</div>
        }
      </div>
      }

    </div>
  )
}
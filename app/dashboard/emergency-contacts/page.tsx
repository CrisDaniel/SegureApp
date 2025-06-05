"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PencilIcon, Trash2Icon } from "lucide-react";

const contacts = [
  {
    id: 1,
    name: "Ana Torres",
    phone: "+51 987 654 321",
    notify: true,
    avatar: "🧑‍🦰",
  },
  {
    id: 2,
    name: "Luis Gamarra",
    phone: "+51 912 345 678",
    notify: false,
    avatar: "🧑‍🦱",
  },
  {
    id: 3,
    name: "Remy Guerrero",
    phone: "+51 900 111 222",
    notify: true,
    avatar: "🧑‍🦲",
  },
  {
    id: 4,
    name: "Luis Gamarra",
    phone: "+51 912 345 678",
    notify: false,
    avatar: "🧑‍🦱",
  },
  {
    id: 5,
    name: "Remy Guerrero",
    phone: "+51 900 111 222",
    notify: true,
    avatar: "🧑‍🦲",
  },
];

export default function EmergencyContactsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8">
      {contacts.map((contact) => (
        <Card key={contact.id} className="flex items-center px-4 py-3">
          <CardContent className="flex items-center w-full gap-4 p-0">
            <Avatar>
              <AvatarFallback>{contact.avatar}</AvatarFallback>
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
      ))}
    </div>
  );
}
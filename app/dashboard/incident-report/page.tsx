'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

import { MapPin, CameraIcon, VideoIcon, SendHorizonal, CalendarIcon } from "lucide-react"
import Image from 'next/image'

import DynamicMapWrapper from "@/components/dinamyc-map-wraper"
import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import NewIncidentForm from "@/components/incidents/new-incident-form"

export default function Page() {
    const { data: session } = useSession();


    return (
        <div className="container mx-auto px-6">
            <NewIncidentForm />
        </div>
    )
}
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
import { toast } from "sonner"


export default function NewIncidentForm() {
    const { data: session } = useSession();

    const [tipoIncidencia, setTipoIncidencia] = useState<string | null>(null)
    const [ubicacion, setUbicacion] = useState<{ lat: number, lng: number } | null>(null)
    const [descripcion, setDescripcion] = useState<string | null>(null)
    const [foto, setFoto] = useState<string | null>(null)
    const [video, setVideo] = useState<string | null>(null)
    const [direccion, setDireccion] = useState<string | null>(null)
    const [previews, setPreviews] = useState<string[]>([])

    const fotoRef = useRef<HTMLInputElement>(null)
    const videoRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            tipoIncidencia,
            ubicacion,
            descripcion,
            userId: session?.user?.id,
        }
        try {
            const res = await fetch("/api/incident", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) {
                throw new Error("Error al enviar el reporte");
            }
            const result = await res.json();
            toast.success("Reporte enviado exitosamente.")
            console.log(result);
        } catch (error) {
            console.error("Error al enviar el reporte:", error);
            toast.error("Error al enviar el reporte.")
        }
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescripcion(e.target.value)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const previews: string[] = [];
            files.forEach((file) => {
                if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        if (reader.result) {
                            previews.push(reader.result as string);
                            setPreviews((prev) => [...prev, reader.result as string]);
                        }
                    }
                    reader.readAsDataURL(file)
                }
            })
        }
    }

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleVideoChange', e.target.files)
    }
    const handleFotoClick = () => {
        fotoRef.current?.click()
    }
    const handleVideoClick = () => {
        videoRef.current?.click()
    }

    useEffect(() => {
        if (!ubicacion) {
            console.log("first render")
            return
        }
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${ubicacion?.lat}&lon=${ubicacion?.lng}&format=json`)
            .then(response => response.json())
            .then(data => {
                const address = data.address
                let direccion = address?.country + ", " + address?.state + ", " + address?.city + ", " + address?.village
                setDireccion(direccion)
            })
            .catch(error => {
                console.error(error)
            })

    }, [ubicacion])

    return (
        <div className="max-w-4xl mx-auto rounded-lg shadow-sm">
            <Card>
                <CardHeader>
                    {/* <CardTitle>Reportar Incidente</CardTitle> */}
                    <CardDescription>
                        Reporta un incidente para que pueda ser atendido por los servicios correspondientes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Columna Izquierda */}
                        <div className="space-y-6">
                            {/* Tipo de Incidencia */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Tipo de Incidencia</label>
                                <Select value={tipoIncidencia || ""} onValueChange={setTipoIncidencia}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona el tipo de incidencia" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="robo">Robo</SelectItem>
                                        <SelectItem value="accidente">Accidente</SelectItem>
                                        <SelectItem value="violencia">Violencia</SelectItem>
                                        <SelectItem value="emergencia">Emergencia Médica</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Ubicación</label>
                                <div className="flex gap-2">
                                    <Input placeholder="Seleccionar ubicación" className="flex-1" value={direccion || ""} onChange={() => {
                                        console.log("test",)
                                    }} />
                                    {/* <Button variant="outline" type="button">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            Mapa
                                        </Button> */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" type="button">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                Mapa
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Seleccionar ubicación</DialogTitle>
                                                <DialogDescription>
                                                    Selecciona la ubicación en el mapa
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex items-center gap-2">
                                                <div className="grid flex-1 gap-2 h-[400px]">
                                                    <DynamicMapWrapper
                                                        incidents={[]}
                                                        initialPosition={[-9.2970, -76.0079]}
                                                        zoom={13}
                                                        setLocation={setUbicacion}
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter className="sm:justify-start">
                                                <DialogClose asChild>
                                                    <Button type="button" variant="secondary">
                                                        Close
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            {/* Adjuntar Foto/Video */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Adjuntar Fotos o Videos<span className="text-muted-foreground text-xs ml-1">(Opcional)</span>
                                </label>
                                <div className="flex gap-4">
                                    <Button variant="outline" type="button" className="flex flex-1  items-center py-4 px-2 gap-2" onClick={handleFotoClick}>
                                        <CameraIcon className="w-6 h-6" />
                                        <span>Subir Foto</span>
                                    </Button>
                                    <Input type="file" accept="image/*" className="hidden" ref={fotoRef} onChange={handleFileChange} />
                                    <Button variant="outline" type="button" className="flex flex-1 items-center py-4 px-2 gap-2" onClick={handleVideoClick}>
                                        <VideoIcon className="w-6 h-6" />
                                        <span>Subir Video</span>
                                    </Button>
                                    <Input type="file" accept="video/*" className="hidden" ref={videoRef} onChange={handleFileChange} />
                                </div>
                                <div className="flex gap-4 py-4">
                                    <div>
                                        {previews.map((previewUrl, index) => (
                                            <Image
                                                key={index}
                                                src={previewUrl}
                                                alt={`preview-${index}`}
                                                width={80}
                                                height={80}

                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Descripción<span className="text-muted-foreground text-xs ml-1">(Opcional)</span>
                                </label>
                                <Textarea
                                    placeholder="Agrega detalles adicionales..."
                                    className="w-full min-h-32"
                                    onChange={handleDescriptionChange}
                                    value={descripcion || ""}
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-6">
                                <Checkbox id="anonimo" />
                                <label htmlFor="anonimo" className="text-sm">Enviar como reporte anónimo</label>
                            </div>

                        </div>

                        {/* Columna Derecha */}
                        <div className="space-y-6">
                            {/* Descripción */}




                            {/* Reporte Anónimo */}

                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="px-8 py-2" size="lg" onClick={handleSubmit}>
                        <SendHorizonal className="w-5 h-5 mr-2" />
                        Enviar Reporte
                    </Button>
                </CardFooter>
            </Card>

        </div>
    )
}
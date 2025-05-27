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
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { MapPin, CameraIcon, VideoIcon, SendHorizonal, CalendarIcon } from "lucide-react"
import Image from 'next/image'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import DynamicMapWrapper from "@/components/dinamyc-map-wraper"
import { useState, useEffect, useRef } from "react"

// const FormSchema = z.object({
//     bio: z
//         .string()
//         .min(10, {
//             message: "Bio must be at least 10 characters.",
//         })
//         .max(160, {
//             message: "Bio must not be longer than 30 characters.",
//         }),
//     dob: z.date({
//         required_error: "A date of birth is required.",
//     }),
//     horaIncidencia: z.string().optional(),
// })

export default function Page() {
    // const form = useForm<z.infer<typeof FormSchema>>({
    //     resolver: zodResolver(FormSchema),
    // })
    const [tipoIncidencia, setTipoIncidencia] = useState<string | null>(null)
    const [fecha, setFecha] = useState<string | null>(null)
    const [hora, setHora] = useState<string | null>(null)
    const [ubicacion, setUbicacion] = useState<{ lat: number, lng: number } | null>(null)
    const [descripcion, setDescripcion] = useState<string | null>(null)
    const [foto, setFoto] = useState<string | null>(null)
    const [video, setVideo] = useState<string | null>(null)
    const [direccion, setDireccion] = useState<string | null>(null)
    const [previews, setPreviews] = useState<string[]>([])

    const fotoRef = useRef<HTMLInputElement>(null)
    const videoRef = useRef<HTMLInputElement>(null)

    const test = () => {
        console.log(tipoIncidencia, "solo prueba")
        console.log(fecha, "solo prueba")
        console.log(hora, "solo prueba")
        console.log(ubicacion, "solo prueba")
        console.log(descripcion, "solo prueba")
    }
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFecha(e.target.value)
    }
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHora(e.target.value)
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
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
                <Card>
                    <CardHeader>
                        {/* <CardTitle>Reportar Incidente</CardTitle> */}
                        <CardDescription>
                            Reporta un incidente para que pueda ser atendido por los servicios correspondientes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                {/* Fecha y Hora */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Fecha</label>
                                        <Input type="date" className="w-full" onChange={handleDateChange} value={fecha || ""} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Hora</label>
                                        <Input type="time" className="w-full" onChange={handleTimeChange} value={hora || ""} />
                                    </div>
                                </div>

                                {/* Ubicación */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Ubicación</label>
                                    <div className="flex gap-2">
                                        <Input placeholder="Seleccionar ubicación" className="flex-1" value={direccion || ""} onChange={() => {
                                            console.log("test",)
                                        }} />
                                        <Button variant="outline" type="button">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            Mapa
                                        </Button>
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
                                    {/* <div className="flex gap-4 py-4">
                                        <div className="border border-muted rounded-md p-2">
                                            <Image src="/asalto-peru.jpg" alt="Placeholder" width={100} height={100} />
                                        </div>
                                        <div className="border border-muted rounded-md p-2">
                                            <Image src="/asalto-peru.jpg" alt="Placeholder" width={100} height={100} />
                                        </div>
                                    </div> */}
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

                            </div>

                            {/* Columna Derecha */}
                            <div className="space-y-6">
                                {/* Mini Mapa */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Vista previa de ubicación</label>
                                    <div className="bg-muted flex flex-col items-center justify-center rounded-md h-48">
                                        {/* <MapPin className="w-10 h-10 opacity-50 mb-2" />
                                        <span className="text-muted-foreground text-sm">Mini Mapa de Ubicación</span> */}
                                        <DynamicMapWrapper
                                            incidents={[]}
                                            initialPosition={[-9.2970, -76.0079]}
                                            zoom={13}
                                            setLocation={setUbicacion}
                                        />
                                    </div>
                                </div>

                                {/* Descripción */}
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



                                {/* Reporte Anónimo */}
                                <div className="flex items-center gap-2 mt-6">
                                    <Checkbox id="anonimo" />
                                    <label htmlFor="anonimo" className="text-sm">Enviar como reporte anónimo</label>
                                </div>
                            </div>
                        </div>
                        {/* <Form {...form}>
                            <form className="w-2/3 space-y-6">
                                <FormField name="tipo" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de Incidente</FormLabel>
                                        <FormControl>
                                            <Select {...field}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona el tipo de incidente" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="robo">Robo</SelectItem>
                                                    <SelectItem value="accidente">Accidente</SelectItem>
                                                    <SelectItem value="violencia">Violencia</SelectItem>
                                                    <SelectItem value="emergencia">Emergencia Médica</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            Tambien puedes crear un tipo de incidente personalizado
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Date of birth</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[240px] pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormDescription>
                                                    Your date of birth is used to calculate your age.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control} 
                                        name="horaIncidencia" 
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Hora de la Incidencia</FormLabel> 
                                                <FormControl>                                                    
                                                    <Input
                                                        type="time" 
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                
                                                <FormDescription>Selecciona la hora del incidente.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Adjuntar fotos/videos (opcional)</FormLabel>
                                                <FormControl>
                                                    <Input type="file" />
                                                </FormControl>
                                                <FormDescription>
                                                    Your date of birth is used to calculate your age.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a little bit about yourself"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                You can <span>@mention</span> other users and organizations.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form> */}

                    </CardContent>
                    <CardFooter>
                        <Button className="px-8 py-2" size="lg" onClick={test}>
                            <SendHorizonal className="w-5 h-5 mr-2" />
                            Enviar Reporte
                        </Button>
                    </CardFooter>
                </Card>

            </div>
        </div>
    )
}
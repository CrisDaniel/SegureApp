import { IncidentMap } from "@/components/incident-map"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"

export default function Page() {
    return (
        <div className="px-4 py-6">
            <div className="flex justify-between mb-6">
                <Input type="text" placeholder="Buscar incidente" />
            </div>
            <div className="mb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-8">
                    {/* Tipo de Incidente */}
                    <div>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Tipo de Incidente" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="robo">Robo</SelectItem>
                                <SelectItem value="accidente">Accidente de Tráfico</SelectItem>
                                <SelectItem value="violencia">Violencia</SelectItem>
                                <SelectItem value="emergencia">Emergencia Médica</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Estado */}
                    <div>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Rango de tiempo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pendiente">Pendiente</SelectItem>
                                <SelectItem value="en_proceso">En Proceso</SelectItem>
                                <SelectItem value="resuelto">Resuelto</SelectItem>
                                <SelectItem value="cancelado">Cancelado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Rango de visualización" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pendiente">Pendiente</SelectItem>
                                <SelectItem value="en_proceso">En Proceso</SelectItem>
                                <SelectItem value="resuelto">Resuelto</SelectItem>
                                <SelectItem value="cancelado">Cancelado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Fecha */}
                    <div className="flex flex-row items-center gap-2">
                        <label className="block text-sm font-medium mb-1">Fecha</label>
                        <div className="relative">
                            <Input type="date" className="w-full pl-10" />
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </div>

            <IncidentMap haveTitle={false} />
        </div>
    )
}
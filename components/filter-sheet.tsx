import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRightIcon } from "lucide-react"
import { ListFilterIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"


export default function FilterSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="secondary" size="icon"><ListFilterIcon className="size-6" /></Button>
            </SheetTrigger>
            <SheetContent className="h-full flex flex-col">
                <SheetHeader>
                    <SheetTitle>Filtrar por</SheetTitle>
                    <SheetDescription>
                        Filtra los incidentes por tipo, estado, fecha y rango de visualización.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col px-4 py-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                Tipo de incidente
                                <Button variant="secondary" size="sm" className="text-xs">limpiar filtro</Button>
                            </div>
                            <div>
                                <div className="section-filter flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="terms" />
                                        <Label htmlFor="terms">robo</Label>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Checkbox id="terms-2" defaultChecked />
                                        <div className="grid gap-2">
                                            <Label htmlFor="terms-2">accidente de tránsito</Label>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Checkbox id="toggle" disabled />
                                        <Label htmlFor="toggle">violencia</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                Rango de tiempo
                                <Button variant="secondary" size="sm" className="text-xs">limpiar filtro</Button>
                            </div>
                            <div>
                                <div className="section-filter flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="terms" />
                                        <Label htmlFor="terms">últimos 7 días</Label>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Checkbox id="terms-2" defaultChecked />
                                        <div className="grid gap-2">
                                            <Label htmlFor="terms-2">últimos 30 días</Label>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Checkbox id="toggle" disabled />
                                        <Label htmlFor="toggle">últimos 60 días</Label>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Checkbox id="toggle" disabled />
                                        <Label htmlFor="toggle">últimos 60 días</Label>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Checkbox id="toggle" disabled />
                                        <Label htmlFor="toggle">fecha personalizada</Label>
                                        <div className="relative">
                                            <Input type="date" className="w-full pl-10" />
                                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                Rango de visualización
                                <Button variant="secondary" size="sm" className="text-xs">limpiar filtro</Button>
                            </div>
                            <div>
                                <div className="section-filter flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="terms" />
                                        <Label htmlFor="terms">1 km</Label>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Checkbox id="terms-2" defaultChecked />
                                        <div className="grid gap-2">
                                            <Label htmlFor="terms-2">5 km</Label>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Checkbox id="toggle" disabled />
                                        <Label htmlFor="toggle">10 km</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <SheetFooter>
                    <Button type="submit">Aplicar filtros</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
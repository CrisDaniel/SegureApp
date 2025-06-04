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
import FilterSheet from "@/components/filter-sheet"

export default function Page() {
    return (
        <div className="px-4 h-full flex flex-col">
            <div className="mapa grow">
                <IncidentMap haveTitle={false} />
            </div>
        </div>
    )
}
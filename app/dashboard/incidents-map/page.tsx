import { IncidentMap } from "@/components/incident-map"

export default function Page() {
    return (
        <div className="px-4 py-6">
            <IncidentMap haveTitle={false} />
        </div>
    )
}
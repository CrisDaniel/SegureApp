import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import {
  AlertCircleIcon,
  FlameIcon,
  PhoneCallIcon,
  AlertTriangleIcon,
  CarIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";

const reports = [
  {
    id: 1,
    type: "Robo",
    icon: AlertCircleIcon,
    date: "12 May 2025, 21:15",
    address: "Av. Arequipa 1030, Lima",
    status: "Recibido",
  },
  {
    id: 2,
    type: "Incendio",
    icon: FlameIcon,
    date: "09 May 2025, 17:52",
    address: "Calle Las Flores 202, Surco",
    status: "En Revisión",
  },
  {
    id: 3,
    type: "Extorsión",
    icon: PhoneCallIcon,
    date: "04 May 2025, 11:40",
    address: "Av. Grau 150, Barranco",
    status: "Recibido",
  },
  {
    id: 4,
    type: "Riesgo Sospechoso",
    icon: AlertTriangleIcon,
    date: "01 May 2025, 08:25",
    address: "Jr. Progreso 12, Miraflores",
    status: "Recibido",
  },
  {
    id: 5,
    type: "Accidente",
    icon: CarIcon,
    date: "27 Abr 2025, 13:00",
    address: "Panamericana Sur Km 12",
    status: "En Revisión",
  },
];

export default function ReportsPage() {
  return (
    <div className="report-page container mx-auto px-6 flex flex-col gap-4">
      <div className="flex justify-end">
        <Link href="/dashboard/incident-report">
          <Button type="button" className="">
            <PlusIcon className="w-4 h-4 mr-2" />
            Nuevo Reporte
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="flex flex-col w-full">
              <CardContent className="flex flex-col gap-2 p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-muted rounded-lg p-2">
                    <Icon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-md">{report.type}</div>
                    <div className="text-xs text-muted-foreground">{report.date}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-2">{report.address}</div>
                <div className="mt-2">
                  <Badge variant={report.status === 'Recibido' ? 'secondary' : 'outline'}>
                    {report.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 
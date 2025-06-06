import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SectionMapsChards } from "@/components/section-maps-chards"

const data = [
  {
    id: 1,
    header: "Cover page",
    type: "Cover page",
    status: "In Process",
    target: "18",
    limit: "5",
    reviewer: "Eddie Lake"
  },
  {
    id: 2,
    header: "Table of contents",
    type: "Table of contents",
    status: "Done",
    target: "29",
    limit: "24",
    reviewer: "Eddie Lake"
  },
  {
    id: 3,
    header: "Executive summary",
    type: "Narrative",
    status: "Done",
    target: "10",
    limit: "13",
    reviewer: "Eddie Lake"
  },
  {
    id: 4,
    header: "Technical approach",
    type: "Narrative",
    status: "Done",
    target: "27",
    limit: "23",
    reviewer: "Jamik Tashpulatov"
  },
  // ... (resto de los datos)
  {
    id: 68,
    header: "Service Level Agreements",
    type: "Legal",
    status: "Done",
    target: "26",
    limit: "29",
    reviewer: "Assign reviewer"
  }
];

export default function Page() {
  return (
    <>
      <SectionCards />
      <SectionMapsChards />
      {/* <ChartAreaInteractive /> */}
      {/* <DataTable data={data} /> */}
    </>
  )
}

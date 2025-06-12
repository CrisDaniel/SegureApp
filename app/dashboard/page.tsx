import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SectionMapsChards } from "@/components/section-maps-chards"

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

"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
export const description = "A bar chart with a label"
const chartData = [
    { month: "Robo", desktop: 136 },
    { month: "Sospechoso", desktop: 256 },
    { month: "Emergencia", desktop: 186 },
    { month: "Incendio", desktop: 40 },
    { month: "Bandalismo", desktop: 150 },
    { month: "Otros", desktop: 164 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

import DynamicMapWrapper from "./dinamyc-map-wraper"

export function SectionMapsChards() {
    const incidents: any[] = [];
    const tingoMariaPosition: [number, number] = [-16.4292, -68.1365];
    return (
        <div className="*:data-[slot=card]:shadow-xs xl:grid-cols-2 min-[1920px]:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            <Card>
                <CardHeader>
                    <CardTitle>Mapa de incidencias</CardTitle>
                    <CardDescription>Mapa de incidencias</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px] overflow-hidden">
                    <DynamicMapWrapper incidents={incidents} initialPosition={tingoMariaPosition} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Tipos de incidencias</CardTitle>
                    <CardDescription>Enero - Junio 2025</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                top: 20,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 leading-none font-medium">
                    Tendencia al alza del 5.2% este mes <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="text-muted-foreground leading-none">
                    Datos totales entre enero y junio 2025
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export function SectionOther() {
    const incidents: any[] = [];
    const tingoMariaPosition: [number, number] = [-16.4292, -68.1365];
    return (
        <div className="*:data-[slot=card]:shadow-xs xl:grid-cols-2 min-[1920px]:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            <Card>
                <CardHeader>
                    <CardTitle>Tus incidencias</CardTitle>
                    <CardDescription>Tus incidencias</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] overflow-hidden">
                    
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Tipos de incidencias</CardTitle>
                    <CardDescription>Tipos de incidencias</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
            </Card>
        </div>
    )
}
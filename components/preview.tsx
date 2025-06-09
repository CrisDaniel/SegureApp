import Image from "next/image"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { useState } from "react"

export default function Preview({previewUrl, index, onDelete}: {previewUrl: string, index: number, onDelete: (index: number) => void}) {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div key={index} className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Image
                src={previewUrl}
                alt={`preview-${index}`}
                width={80}
                height={80}
                className="opacity-40 hover:opacity-100 transition-all rounded-md object-cover h-full max-h-[80px]"
            />
            {isHovered && (
                <Button  type="button" size="icon" className="absolute top-[-8px] right-[-8px] rounded-full h-6 w-6" onClick={() => onDelete(index)}>
                    <XIcon className="w-4 h-4" />
                </Button>
            )}
        </div>
    )
}
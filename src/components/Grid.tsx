import { cn } from "@utils/cn"

export const Grid = ({ className }: { className?: string }) => {
    return (
        <svg className={cn("absolute -z-10 h-full w-full", className)} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="url(#smallGrid)" />
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
            </defs>
            <rect className="h-full w-full" fill="url(#grid)" />
        </svg>
    )
}
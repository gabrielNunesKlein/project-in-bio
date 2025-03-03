import { TrendingUp } from "lucide-react";


export default function TotalVisit({ totalVisit = 0 }: { totalVisit: number}) {
    return (
        <div className="w-min whitespace-nowrap flex items-center gap-5 bg-background-secondary border border-border-primary px-8 py-3 rounded-xl shadow-lg">
            <span className="font-bold text-white">Total de visitas</span>
            <div className="flex item-centar gap-2 text-accent-green">
                <span className="text-3xl font-bold">{totalVisit}</span>
                <TrendingUp />
            </div>
            {/* <div className="flex items-center gap-2">
                <button>Portal</button>
                <button>Sair</button>
            </div> */}
        </div>
    )
}
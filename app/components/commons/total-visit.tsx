import { manageAuth } from "@/app/actions/manage-auth";
import { auth } from "@/app/lib/auth";
import { TrendingUp } from "lucide-react";
import PortalButton from "./porta-button";


export default async function TotalVisit({ totalVisit = 0, showBar = false }: { totalVisit?: number, showBar?: boolean}) {
    const seesion = await auth()
    return (
        <div className="w-min whitespace-nowrap flex items-center gap-5 bg-background-secondary border border-border-primary px-8 py-3 rounded-xl shadow-lg">
            <span className="font-bold text-white">Total de visitas</span>
            <div className="flex item-centar gap-2 text-accent-green">
                <span className="text-3xl font-bold">{totalVisit}</span>
                <TrendingUp />
            </div>
            {showBar && (
                <div className="flex items-center gap-2">
                    {seesion?.user?.isSubscribed && <PortalButton />}
                    <form action={manageAuth}>
                        <button>
                            Sair
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}
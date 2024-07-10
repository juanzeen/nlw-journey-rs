import { MapPin, Calendar, Settings2 } from "lucide-react"
import { Button } from "../../components/button"

export function DestinationAndDateHeader(){
    return(
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="text-zinc-400 size-5" />
          <span className="text-zinc-100">Local da viagem</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Calendar className="text-zinc-400 size-5" />
            <span className="text-zinc-100">Data da viagem</span>
          </div>
          <div className="w-px h-6 bg-zinc-800"></div>
           <Button 
           variant="secondary"
           >
            Alterar local/data
            <Settings2/>
           </Button>
        </div>
      </div>
    )
}
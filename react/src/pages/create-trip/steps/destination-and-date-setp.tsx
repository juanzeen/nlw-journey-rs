import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";

interface DestinationAndDateStepProps{
    isGuestsInputOpen: boolean
    closesGuestsInput: ()=> void
    openGuestsInput: ()=> void
    
}

export function DestinationAndDateStep({isGuestsInputOpen, closesGuestsInput, openGuestsInput}: DestinationAndDateStepProps){
    return(
        <div className="w-full h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Para onde você vai?"
                className=" bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                disabled={isGuestsInputOpen}
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Quando?"
                className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
                disabled={isGuestsInputOpen}
              />
            </div>

            <div className="w-px h-6 bg-zinc-800"></div>

            {isGuestsInputOpen ? (
              <Button
                variant="secondary"
                onClick={closesGuestsInput}
              >
                Alterar local e data
                <Settings2 className="size-5" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={openGuestsInput}
              >
                Continuar
                <ArrowRight className="size-5" />
              </Button>
            )}
          </div>
    )
}
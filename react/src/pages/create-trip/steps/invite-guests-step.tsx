import { ArrowRight, UserRoundPlus } from "lucide-react"
import { Button } from "../../../components/button"

interface InviteGuestsStepProps{
    openGuestsModal: () => void
    emailsToInvite: string[]
    openConfirmTripModal: () => void
}

export function InviteGuestsStep({openGuestsModal, emailsToInvite, openConfirmTripModal}: InviteGuestsStepProps){
    return(
        <div className="w-full h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button
                onClick={openGuestsModal}
                type="button"
                className="flex items-center gap-2 flex-1 text-left"
              >
                <UserRoundPlus className="size-5 text-zinc-400" />
                {emailsToInvite.length > 0 ? (
                  <span className=" text-lg text-zinc-100 flex-1">
                    {emailsToInvite.length} pessoa(s) convidadas
                  </span>
                ) : (
                  <span className=" text-lg text-zinc-400 flex-1">
                    Quem vai com você?
                  </span>
                )}
              </button>
              <Button
                onClick={openConfirmTripModal}
                
              >
                Confirmar viagem
                <ArrowRight className="size-5" />
              </Button>
            </div>
    )
}
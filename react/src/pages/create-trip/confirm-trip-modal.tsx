import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface ConfirmTripmodalProps {
    closeConfirmTripModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
    setOwnerName: (ownerName: string) => void
    setOwnerEmail: (ownerEmail: string) => void
}

export function ConfirmTripModal ({closeConfirmTripModal, createTrip, setOwnerName, setOwnerEmail}: ConfirmTripmodalProps){
  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Confirmar criação de viagem
                </h2>
                <button onClick={closeConfirmTripModal}>
                  <X className="size-5" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Para concluir a criação de viagem para{" "}
                <span className="text-zinc-100 font-semibold"> local</span> na
                data <span className="text-zinc-100 font-semibold">data</span>
              </p>
            </div>

            <form className="space-y-3" onSubmit={createTrip}>
              <div className="py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="size-5 text-zinc-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Digite seu nome"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  onChange={event => setOwnerName(event.target.value)}
                />
              </div>
              <div className="py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="size-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  onChange={event => setOwnerEmail(event.target.value)}
                />
              </div>
              <Button
                type="submit"
                size="full"
              >
                Confirmar criação de viagem
              </Button>
            </form>
          </div>
        </div>
  )
}
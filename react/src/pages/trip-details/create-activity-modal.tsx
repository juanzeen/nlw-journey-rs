import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}
export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  //pega da url o ID
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //resgata o evento de submissão do formulário
    const data = new FormData(event.currentTarget);
    //por ser um formulário simples resgatamos os dados com o get
    //sem a necessidade de fazer um useState

    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    });

    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Criando atividade</h2>
            <button onClick={closeCreateActivityModal}>
              <X className="size-5" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            <span>
              Preencha os campos para que seja criada uma nova atividade!
            </span>
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              placeholder="Atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="gap-8 flex items-center">
            <div className="flex-1 py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="datetime-local"
                name="occurs_at"
                placeholder="Data e horário da atividade"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
          </div>
          <Button type="submit" variant="primary" size="full">
            Criar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}

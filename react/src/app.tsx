//sempre optar por colocar o export na funcao para evitar que tenha
//problemas na hora de importar
import {
  MapPin,
  Calendar,
  ArrowRight,
  UserRoundPlus,
  Settings2,
  X,
  AtSign,
  Plus
} from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {
  //useState é literalmente utilizar o estado da nossa aplicação
  //o estado é nada mais nada menos do que um conjunto de dados específicos e de exibições específicas na nossa tela
  //até o momento vimos que temos o estado utilizando booleanos, em situações de mostras diferentes coisas na tela
  //como também utilizamos um array no estado, que foi o nosso caso com os emails
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(
    [
      'juan@gmail.com'
    ]
  );

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closesGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  //usamos o <HTMLFormElement> justamente para resolver o problema de FormData
  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    //FormData é um tipo de dado que pode ser disparado por qualquer tipo de form, o proprio form, inputs, buttons, etc
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();
    if(!email){
      return; 
    }

    if(emailsToInvite.includes(email)){
      return;
    }

    setEmailsToInvite([
      ...emailsToInvite, 
      email
    ]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(email: string){
    const newEmailsList = emailsToInvite.filter(emails => emails != email)

   setEmailsToInvite(newEmailsList);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col gap-3">
          <img src="/logo.svg" alt="Logo do plann.er" />
          <p className="zinc-300 text-lg">
            Convide seus amigos e planeje sua viagem
          </p>
        </div>

        <div className="space-y-4">
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
              <button
                className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
                onClick={closesGuestsInput}
              >
                Alterar local e data
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
                onClick={openGuestsInput}
              >
                Continuar
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          {
            //o && é uma espécie de if especial, onde nao tem else
            isGuestsInputOpen && (
              <div className="w-full h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
                <button
                  onClick={openGuestsModal}
                  type="button"
                  className="flex items-center gap-2 flex-1 text-left"
                >
                  <UserRoundPlus className="size-5 text-zinc-400" />
                  <span className=" text-lg text-zinc-400 flex-1">
                    Quem vai com você?
                  </span>
                </button>
                <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Confirmar viagem
                  <ArrowRight className="size-5" />
                </button>
              </div>
            )
          }
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br /> com nossos <a href="#" className="text-zinc-300 text-sm underline hover:text-lime-300">termos de uso</a> e <a href="#" className="text-zinc-300 text-sm underline hover:text-lime-300"> políticas de privacidade.</a>
        </p>
      </div>

      {isGuestsModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                <button onClick={closeGuestsModal}>
                  <X className="size-5" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Os convidados receberão emails para confirmar a participação na
                viagem.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
            {emailsToInvite.map(email =>{
              return (
                //sempre que tiver map, o primeiro elemento html no map precisa ter uma key com um valor unico contido no array
                //se passarmos uma função sem a arrow function, parece que estamos simplesmente executando uma função dentro do onClick, mas quremos invocá-la
                //por isso sempre que fomos utilizar uma função que possui argumentos, usamos a arrow function
                <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{email}</span>
                <button onClick={() => removeEmailFromInvites(email)}>
                  <X className="size-4 text-zinc-400"/>
                </button>
              </div>
              )
            })}
            </div>
            <div className="w-full h-px bg-zinc-800"/>
            <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <div className="flex items-center flex-1 gap-2">
              <AtSign className="size-5 text-zinc-400"/>
              <input type="email" name="email" placeholder="Digite o email do convidado" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
              </div>
              <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Convidar
                  <Plus className="size-5" />
                </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

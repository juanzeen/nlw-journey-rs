import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-setp";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate()
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(['juanhygino@gmail.com']);
  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()



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

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(email: string) {
    const newEmailsList = emailsToInvite.filter((emails) => emails != email);

    setEmailsToInvite(newEmailsList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!ownerName || !ownerEmail) {
      return
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
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
          <DestinationAndDateStep
          openGuestsInput={openGuestsInput}
          closesGuestsInput={closesGuestsInput}
          isGuestsInputOpen={isGuestsInputOpen}
          setDestination={setDestination}
          setEventStartAndEndDates={setEventStartAndEndDates}
          eventStartAndEndDates={eventStartAndEndDates}
          />
          {isGuestsInputOpen && (
            <InviteGuestsStep
            openGuestsModal={openGuestsModal}
            emailsToInvite={emailsToInvite}
            openConfirmTripModal={openConfirmTripModal}/>
          )}
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br /> com nossos{" "}
          <a
            href="#"
            className="text-zinc-300 text-sm underline hover:text-lime-300"
          >
            termos de uso
          </a>{" "}
          e{" "}
          <a
            href="#"
            className="text-zinc-300 text-sm underline hover:text-lime-300"
          >
            {" "}
            políticas de privacidade.
          </a>
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
        emailsToInvite={emailsToInvite}
        addNewEmailToInvite={addNewEmailToInvite}
        closeGuestsModal={closeGuestsModal}
        removeEmailFromInvites={removeEmailFromInvites}
        />
      )}
      {isConfirmTripModalOpen && (
      <ConfirmTripModal
      closeConfirmTripModal={closeConfirmTripModal}
      createTrip={createTrip}
      setOwnerName={setOwnerName}
      setOwnerEmail={setOwnerEmail}
      />
      )}
    </div>
  );
}

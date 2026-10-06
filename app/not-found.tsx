import { ButtonLink, StatusShell } from "@/components/StatusShell";
import { AlertIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <StatusShell tone="pending" icon={<AlertIcon className="h-10 w-10" />} title="Pagina niet gevonden">
      <p>Deze pagina bestaat niet (meer). Misschien vind je wat je zoekt op de homepage.</p>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/">Naar de homepage</ButtonLink>
      </div>
    </StatusShell>
  );
}

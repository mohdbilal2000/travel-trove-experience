import LocalizedTickets, { esTickets, ticketsMetadata } from "@/components/landing/LocalizedTickets";

export const metadata = ticketsMetadata(esTickets);

export default function Page() {
    return <LocalizedTickets t={esTickets} />;
}

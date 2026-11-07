import LocalizedTickets, { deTickets, ticketsMetadata } from "@/components/landing/LocalizedTickets";

export const metadata = ticketsMetadata(deTickets);

export default function Page() {
    return <LocalizedTickets t={deTickets} />;
}

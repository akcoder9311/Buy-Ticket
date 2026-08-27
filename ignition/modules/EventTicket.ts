import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EventTicketModule  = buildModule('EventTicketModule', (m)=>{
    const ticketPrice = m.getParameter('TicketPrice',1_000_000_000_000_000_000n)

    const eventTicket = m.contract('EventTicket',[ticketPrice]);

    return { eventTicket };
});

export default EventTicketModule;
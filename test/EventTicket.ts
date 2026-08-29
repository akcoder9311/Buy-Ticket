import { expect } from "chai";
import { network } from "hardhat";

describe("EventTicket", () => {
  async function deployEventTicket() {
    const { ethers } = await network.connect();

    const [owner, user1, user2] = await ethers.getSigners();

    const ticketPrice = ethers.parseEther("1");

    const EventTicket =
      await ethers.getContractFactory("EventTicket");

    const eventTicket =
      await EventTicket.deploy(ticketPrice);

    await eventTicket.waitForDeployment();

    return {
      eventTicket,
      owner,
      user1,
      user2,
      ticketPrice,
    };
  }

//   test 1
  it("should set the deployer as owner", async () => {
    const { eventTicket, owner } =
      await deployEventTicket();

    expect(await eventTicket.owner())
      .to.equal(owner.address);
  });

//  test 2 
  it('should set the ticket price',async ()=>{
    const {ticketPrice, eventTicket} = await deployEventTicket();

    expect(await eventTicket.ticketPrice()).to.equal(ticketPrice);
  });

//   test 3
  it('should allow a user to buy a ticket', async ()=>{
    const {eventTicket, user1, ticketPrice} = await deployEventTicket();

    await eventTicket.connect(user1).buyTicket({value:ticketPrice});

    expect(await eventTicket.ticketsSold()).to.equal(1);
  })

//   test 4
  it('should assign ticket to the buyer',async ()=>{
      const {
    eventTicket,
    user1,
    ticketPrice
  } = await deployEventTicket();

  await eventTicket
  .connect(user1)
  .buyTicket({
      value: ticketPrice
    });

     const tickets =
    await eventTicket.ticketsOwned(user1.address, 0);

    expect(tickets).to.equal(1);
  });


//  test 5 
  it('should record the ticket owner',async()=>{
    const {eventTicket, user1, ticketPrice} = await deployEventTicket();

    await eventTicket.connect(user1).buyTicket({
      value: ticketPrice
    });

    expect(await eventTicket.ticketOwner(1)).to.equal(user1.address)
  });

  it('should reject incorrect payment',async ()=>{
    const {eventTicket, user1} = await deployEventTicket();

    await expect(
        eventTicket
        .connect(user1)
        .buyTicket({value:0})
    ).to.be.revertedWith("Wrong ticket price");
  } );

});
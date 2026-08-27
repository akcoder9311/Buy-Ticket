import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    // 1. Get a Signer (account) from the local node to sign & fund transactions
    const signer = await provider.getSigner(0);

    // 2. Define the ABI (mark buyTicket as payable, not returns)
    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        [
            "function owner() view returns (address)",
            "function ticketPrice() view returns (uint256)",
            "function ticketsSold() view returns (uint256)",
            "function buyTicket() payable"
        ],
        signer // Pass the signer here so state write operations work
    );

    // Read initial contract state
    const owner = await contract.owner();
    const ticketPrice = await contract.ticketPrice();
    const ticketsSoldBefore = await contract.ticketsSold();

    console.log("Owner:", owner);
    console.log("Ticket Price:", ethers.formatEther(ticketPrice), "ETH");
    console.log("Tickets Sold (Before):", ticketsSoldBefore.toString());

    // 3. Execute state-changing transaction with ETH value attached
    console.log("Purchasing ticket...");
    const tx = await contract.buyTicket({ value: ticketPrice });
    
    // Wait for the block confirmation
    const receipt = await tx.wait();
    console.log("Ticket purchased! Tx Hash:", receipt.hash);

    // Verify updated tickets sold count
    const ticketsSoldAfter = await contract.ticketsSold();
    console.log("Tickets Sold (After):", ticketsSoldAfter.toString());
}

main().catch(console.error);
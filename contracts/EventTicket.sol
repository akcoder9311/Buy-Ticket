// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EventTicket {
    address public owner;
    uint256 public ticketPrice;
    uint256 public ticketsSold;

    constructor(uint256 _ticketPrice) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
    }

    mapping(address => uint256[]) public ticketsOwned;
    mapping(uint256 => address) public ticketOwner;

    function buyTicket() external payable {
        require(msg.value == ticketPrice, "Wrong ticket price");

        ticketsSold++;
        ticketsOwned[msg.sender].push(ticketsSold);
        ticketOwner[ticketsSold] = msg.sender;
    }
}
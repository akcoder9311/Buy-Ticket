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

    function buyTicket() external payable {
        require(msg.value == ticketPrice, "Wrong ticket price");

        ticketsSold++;
    }
}
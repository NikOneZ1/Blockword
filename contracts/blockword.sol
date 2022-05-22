// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract Blockword {
    address owner;
    uint price = 0.00001 ether;

    constructor(uint _price) {
        owner = msg.sender;
        price = _price;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStore {
    uint256 number;

    function setNumber(uint256 _number) public { // <-- PERBAIKAN DI SINI
        number = _number;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}
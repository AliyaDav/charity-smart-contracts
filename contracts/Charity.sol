// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Charity {
    
    address payable public contractOwner;
    address[] public donators;
    
    mapping(address => uint) public donatorAmounts;
    mapping (address => uint) public donatorIDs;

    constructor () payable {
        contractOwner = payable(msg.sender);
    }
    
    uint donator_id = 1;

    modifier ownerOnly {
      require(msg.sender == contractOwner, "Action resricted to owner only");
      _;
    }

    function receiveDonation() public payable {
        if (donatorIDs[msg.sender] != 0){
            donatorAmounts[msg.sender] += msg.value;
        } else {
            donatorIDs[msg.sender] = donator_id;
            donators.push(msg.sender);
            donatorAmounts[msg.sender] += msg.value;
            donator_id++;
        }
        console.log("Received a donation");
    }

    function transferToBeneficiary(address payable beneficiary, uint amount) public ownerOnly {
        require(amount< address(this).balance, "Not enough balance");
        beneficiary.transfer(amount);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
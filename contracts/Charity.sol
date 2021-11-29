pragma solidity >=0.7.0 <0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract Charity {
    
    address payable public owner;
    address[] public donators;
    
    mapping(address => uint) donatorAmounts;

    using SafeMath for unit;

    constructor () public {
        owner = msg.sender;
    }

    struct donor {
        uint donationAmount;
    }

    function receiveDonation() public payable {
        donators.push(msg.sender);
        donatorAmounts[msg.sender] = donor(msg.value);
    }

    function getDonators() public view returns (address[] memory) {
        return donators;
    }

    function getDonatorSum(address donator) public view returns (uint) {
        return donatorAmounts[donator].donationAmount;
    }

    function transferToOwner(uint donationAmount) external {
        require(msg.sender == owner, "Only owner can transfer donations");
        require(donationAmount <= address(this).balance, "Not enough balance");
        owner.transfer(donationAmount);
    }
}
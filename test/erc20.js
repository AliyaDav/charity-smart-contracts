const { expect } = require("chai");
const { BigNumber } = require('ethers');

describe("ERC20", () => {

    let Charity;
    let charity;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {

        ERC20 = await ethers.getContractFactory("ERC20");
        [owner, _] = await ethers.getSigners();
        erc20 = await Charity.deploy();

    });

    describe("Deployment", function () {

        it('Should set the right owner', async function () {
            expect(await erc20.contractOwner()).to.equal(owner.address);
        })
    });

    describe("ReceiveDonations", function () {

        it('Should receive donations from donors',  async function () {
        
           await charity.connect(addr1).receiveDonation({value: 30, from: addr1.address});
           const contractBalance = await charity.getBalance();
           expect(contractBalance.toString()).to.equal(BigNumber.from(30).toString());

        })
    });

    describe("Funds withdrawal", function () {

        it('Should withdraw funds to a particular address', async function () {

            await charity.connect(addr2).receiveDonation({value: 30, from: addr2.address});
            await charity.connect(owner).transferToBeneficiary(addr1.address, 20);
            const contractBalance = await charity.getBalance();
            expect(contractBalance.toString()).to.equal(BigNumber.from(10).toString());
        });

        it('Should revert transaction called by someone who is not the owner', async function () {

            await charity.connect(addr1).receiveDonation({value: 30, from: addr1.address});
            expect(charity.connect(addr2).transferToBeneficiary(addr2.address, 20))
			.to
            .be
            .revertedWith("Action resricted to owner only");

        });

    });

})
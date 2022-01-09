require("@nomiclabs/hardhat-web3");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.4",
  networks: {
    // rinkeby: {
    //   url: "https://rinkeby.infura.io/v3/60fe9eb3071f4bdebda810cf8a730baf", 
    //   accounts: [`${ROPSTEN_PRIVATE_KEY}`] 
    //  },

    ropsten: {
      url: "https://ropsten.infura.io/v3/60fe9eb3071f4bdebda810cf8a730baf",
      accounts: [ROPSTEN_PRIVATE_KEY]
    }
   }
};

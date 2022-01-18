const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

// Provide secret phrase to Metamask account
// Also provide the Infura API endpoint (infura.io)
const provider = new HDWalletProvider(
  "know emerge piano inner fun scene summer sustain during sense category roast",
  "https://rinkeby.infura.io/v3/239f02068b234dc5b70e4430477577c5"
);

const web3 = new Web3(provider);

// Create a function in order to be able to use async/await
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account: ", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to: ", result.options.address);

  provider.engine.stop(); // this prevents a hanging deployment
};

deploy();

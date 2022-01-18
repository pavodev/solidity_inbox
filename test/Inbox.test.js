const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); // Uppercase because it's a constructor
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider()); // Tell web3 to connect to the local test network

// TESTS

let accounts, inbox;
const INITIAL_STRING = "Hi there!";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts(); // We use the ethereum (eth) module

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface)) // ABI interface
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] }) // Initial message for our contract
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has correct initial message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it("can update the message", async () => {
    await inbox.methods
      .setMessage("I have been updated!")
      .send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "I have been updated!");
  });
});

/*
// Mocha tutorial

class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}

let car;

beforeEach(() => {
  car = new Car();
});

describe('Car', () => {
  it('can park', () => {
    assert(car.park(), 'stopped');
  });

  it('can drive', () => {
    assert(car.drive(), 'vroom');
  });
})

*/

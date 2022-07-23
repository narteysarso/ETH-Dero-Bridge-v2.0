const {expect} = require("chai");
const { ethers } = require("hardhat");

require("dotenv").config({path: ".env"});

describe("Eth bridge", function(){

    let bridgeContract;
    let fakeDTTContract;
    let owner;
    let acc1; 
    let acc2;

    this.beforeEach( async ()=> {
        const dtContract = await ethers.getContractFactory("FakeDTTToken");
        fakeDTTContract = await dtContract.deploy()
        const bcontract = await ethers.getContractFactory("EthBridge");
        bridgeContract = await bcontract.deploy(fakeDTTContract.address);

        [owner, acc1, acc2] = await ethers.getSigners();

        await fakeDTTContract.deployed();
        await  bridgeContract.deployed();
    });

    it("Should work", async function(){
        await fakeDTTContract.connect(owner).mint(acc1.address, 100000);
        await fakeDTTContract.connect(acc1).approve(bridgeContract.address, 100000);

        await bridgeContract.connect(acc1).deposit(100000, process.env.DERO_DEFAULT_WALLET2 );

        console.log(acc1.address);

        expect(await fakeDTTContract.balanceOf(bridgeContract.address)).to.equal(100000);

        await bridgeContract.withdraw(100000, process.env.DERO_DEFAULT_WALLET2);

        expect(await fakeDTTContract.balanceOf(bridgeContract.address)).to.equal(0);
        expect(await fakeDTTContract.balanceOf(acc1.address)).to.equal(100000);

    })

});
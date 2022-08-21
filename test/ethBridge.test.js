const {expect} = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

require("dotenv").config({path: ".env"});

describe("Eth bridge", function(){


    async function loadFakeDTTContract() {
        const dtContract = await ethers.getContractFactory("FakeDTTToken");
        const testContract = await dtContract.deploy()
        const bcontract = await ethers.getContractFactory("EthBridge");
        const bridgeContract = await bcontract.deploy();

        const [owner, acc1] = await ethers.getSigners();

        await testContract.deployed();
        await  bridgeContract.deployed();
        return { bridgeContract, testContract, owner, acc1}
    };
    
    async function loadFakeUSDCContract() {
        const dtContract = await ethers.getContractFactory("FakeUSDC");
        const testContract = await dtContract.deploy()
        const bcontract = await ethers.getContractFactory("EthBridge");
        const bridgeContract = await bcontract.deploy();

        const [owner, acc1] = await ethers.getSigners();

        await testContract.deployed();
        await  bridgeContract.deployed();

        return { bridgeContract, testContract, owner, acc1 }
    };

    async function loadFakeWETHContract() {
        const dtContract = await ethers.getContractFactory("FakeWETH");
        const testContract = await dtContract.deploy()
        const bcontract = await ethers.getContractFactory("EthBridge");
        const bridgeContract = await bcontract.deploy();

        const [owner, acc1] = await ethers.getSigners();

        await testContract.deployed();
        await  bridgeContract.deployed();

        return {bridgeContract, testContract,owner, acc1 }
    };

    it("Should correctly handle 0 decimal token conversion", async function(){
        const {testContract, bridgeContract, owner, acc1 } = await loadFixture(loadFakeDTTContract);

        await testContract.connect(owner).mint(acc1.address, 100000);

        await testContract.connect(acc1).approve(bridgeContract.address, 100000);
        
        
        await bridgeContract.connect(acc1).lockTokens(testContract.address, 100000, process.env.DERO_DEFAULT_WALLET2 );


        expect(await testContract.balanceOf(bridgeContract.address)).to.equal(100000);

        await bridgeContract.releaseTokens(testContract.address,100000, process.env.DERO_DEFAULT_WALLET2);

        expect(await testContract.balanceOf(bridgeContract.address)).to.equal(0);
        expect(await testContract.balanceOf(acc1.address)).to.equal(100000);

    })

    it("Should correctly handle 6 decimal token conversion", async function(){
        const {bridgeContract, testContract, owner, acc1} = await loadFixture(loadFakeUSDCContract);

        await testContract.connect(owner).mint(acc1.address, 100000);

        await testContract.connect(acc1).approve(bridgeContract.address, 100000);
        
        
        await bridgeContract.connect(acc1).lockTokens(testContract.address, 100000, process.env.DERO_DEFAULT_WALLET2 );


        expect(await testContract.balanceOf(bridgeContract.address)).to.equal(100000);

        await bridgeContract.releaseTokens(testContract.address,100000, process.env.DERO_DEFAULT_WALLET2);

        expect(await testContract.balanceOf(bridgeContract.address)).to.equal(0);
        expect(await testContract.balanceOf(acc1.address)).to.equal(100000);

    });

    it("Should correctly handle 18 decimal token conversion", async function(){
        const {bridgeContract, testContract, owner, acc1} = await loadFixture(loadFakeWETHContract);
        const tokenAmount = 10n * 10n ** 18n;
        const checkAmount = 10n * 10n ** 10n;

        await testContract.connect(owner).mint(acc1.address, tokenAmount);
        
        await testContract.connect(acc1).approve(bridgeContract.address, tokenAmount);
        
        expect(await testContract.allowance(acc1.address, bridgeContract.address)).to.equal(tokenAmount);
        
        await bridgeContract.connect(acc1).lockTokens(testContract.address, tokenAmount, process.env.DERO_DEFAULT_WALLET2 );
        
        expect(await testContract.balanceOf(bridgeContract.address)).to.equal(tokenAmount);

        await bridgeContract.releaseTokens(testContract.address, checkAmount, process.env.DERO_DEFAULT_WALLET2);

        expect(await testContract.balanceOf(bridgeContract.address)).to.equal(0);
        expect(await testContract.balanceOf(acc1.address)).to.equal(tokenAmount);

    });

    

    

});
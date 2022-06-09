## ERC721 Factory Clone Contract

A implementation using minimal proxy with clone: https://docs.openzeppelin.com/contracts/4.x/api/proxy#Clones

1. install the packages.
`yarn install`

2. install the types.
`yarn hardhat compile`

## Deploy Phases

1. setup your infura/alchemy provider and private key to deploy the contract.

2. setup your etherscan api key to verify the contract.

command to compile the contract and get api:
`npx hardhat compile`;

command to run the tests:
`npx hardhat test`;

List of contracts that can be deployed can be found in scripts folder. to genesis and mythical works you ened to deploy all from the phase-one folder.

command to deploy the contracts to rinkeby:
`npx hardhat run scripts/${scriptName}.js --network`;

command to verify the contract:
`npx hardhat verify --network rinkeby YOUR_CONTRACT_ADDRESS`;

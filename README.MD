## Mythical Mallards

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

## Sync Phase
After deploy the contracts you need to sync it, so see the functions that you need to run.

### Mythical Mallards Genesis
Mallards genesis is a big contract because have link with calculation, staking and $QUAK. (you can see these steps in the test folder too).

1. **MALLARDS CALCULATION CONTRACT** - run `setMythicalMallards` passing the **Mythical Mallards Genesis Address**;

2. **MALLARDS STAKING CONTRACT** - run `setMallardsQuak` passing the **Mythical Mallards QUAK Address**;

3. **MALLARDS STAKING CONTRACT** - run `setMythicalGenesis` passing the **Mythical Mallards Genesis Address**;

4. **MALLARDS STAKING CONTRACT** - run `setCalculationContract` passing the **Mythical Mallards Calculation Address**;

5. **MALLARDS GENESIS CONTRACT** - run `setMythicalMallardsStaking` passing the **Mythical Mallards Staking Address**;
 
### Mythical Mallards Clones
Simple clones contract just need integration with $QUAK contract

1. **MALLARDS CLONES CONTRACT** - run `setMythicalMallardsQuak` passing the **Mythical Mallards QUAK Address**;

### Mythical Mallards Vials
Vials contract need to integrate with Clones to burn it and Quak to pay 100 QUAK.

1. **MALLARDS CLONES CONTRACT** - run `setMythicalVials` passing the **Mythical Mallards Vials Address** to be able to use burned clones;

2. **MALLARDS CLONES CONTRACT** - already linked with QUAKS in the past phase.

3. **MALLARDS VIALS CONTRACT** - run `setMythicalMallardsQuak` passing the **Mythical Mallards QUAK Address**;

4. **MALLARDS VIALS CONTRACT** - run `setMythicalMallardsClones` passing the **Mythical Mallards Clones Address**; 

### Mythical Mallards Mutants
Mutants needs to integrate with vials and clones to do and check the burns.

1. **MALLARDS CLONES CONTRACT** - run `setMythicalMutants` passing the **Mythical Mallards Mutants Address** to be able to use burned clones.

2. **MALLARDS CLONES CONTRACT** - already linked with QUAKS in the past phase.

3. **MALLARDS VIALS CONTRACT** - run `setMythicalMallardsMutants` passing the **Mythical Mallards Mutants** to be able to use burned vials.

4. **MALLARDS VIALS CONTRACT** - already linked with QUAKS in the past phase.

5. **MALLARDS VIALS CONTRACT** - already linked with CLONES in the past phase.

6. **MALLARDS MUTANTS CONTRACT** - run `setMythicalMallardsQuak` passing the **Mythical Mallards QUAK Address**;

7. **MALLARDS MUTANTS CONTRACT** - run `setMythicalMallardsClones` passing the **Mythical Mallards Clones Address**;

8. **MALLARDS MUTANTS CONTRACT** - run `setMythicalMallardsVials` passing the **Mythical Mallards Vials Address**;

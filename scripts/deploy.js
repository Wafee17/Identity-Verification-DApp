async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  
  const IdentityVerification = await ethers.getContractFactory("SimpleIdentityVerification");
  const identityVerification = await IdentityVerification.deploy();
  
  await identityVerification.deployed();
  
  console.log("SimpleIdentityVerification deployed to:", identityVerification.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
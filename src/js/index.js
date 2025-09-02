// Simple frontend application for Identity Verification DApp
// This would be part of a web application using ethers.js to interact with Ethereum

// Check if ethers is loaded properly
if (typeof ethers === 'undefined') {
  console.error("Ethers.js library not loaded! Please check your internet connection or the script tag in HTML.");
  alert("Failed to load Ethereum library. Please refresh the page or check console for details.");
}

// Contract address (after deployment) - you'll need to replace this with your actual deployed contract address
let CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Example address - replace with yours!

// Console log for debugging
console.log("Script loaded. Ethers version:", ethers ? ethers.version : "not loaded");

// Connect to Ethereum network (using MetaMask or other provider)
async function connectWallet() {
  try {
    if (!window.ethereum) {
      throw new Error("No Ethereum wallet detected! Please install MetaMask.");
    }

    console.log("Requesting accounts...");
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    
    console.log('Connected to wallet: ' + account);
    document.getElementById('walletAddress').textContent = account;
    document.getElementById('connectionStatus').textContent = 'Connected';
    return account;
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    document.getElementById('connectionStatus').textContent = error.message || 'Connection Failed';
    return null;
  }
}

// Initialize contract
async function initContract() {
  try {
    if (!window.ethereum) {
      throw new Error("No Ethereum wallet detected!");
    }
    
    // Check if ethers is available
    if (typeof ethers === 'undefined') {
      throw new Error("Ethers.js library not loaded!");
    }

    console.log("Initializing contract at:", CONTRACT_ADDRESS);
    
    // Contract ABI (from compilation)
    const contractABI = [
      // This is a simplified ABI - you'll need to replace this with your actual contract ABI
      "function createIdentity(bytes32 _dataHash)",
      "function updateIdentity(bytes32 _newDataHash)",
      "function verifyAttribute(address _user, string memory _attributeName)",
      "function isAttributeVerified(address _user, string memory _attributeName) view returns (bool)",
      "function getAttributeVerifier(address _user, string memory _attributeName) view returns (address)"
    ];
    
    // Create contract instance
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    
    console.log("Contract initialized successfully");
    return contract;
  } catch (error) {
    console.error("Error initializing contract:", error);
    alert("Failed to initialize contract: " + (error.message || error));
    return null;
  }
}

// Create a new identity
async function createIdentity() {
  try {
    const contract = await initContract();
    if (!contract) return;
    
    const userDataInput = document.getElementById('userData').value;
    if (!userDataInput.trim()) {
      throw new Error("Please enter some data for your identity");
    }
    
    // Create a hash of the user data
    const dataHash = ethers.utils.id(userDataInput);
    console.log("Data hash:", dataHash);
    
    // Call contract method
    console.log("Sending transaction to create identity...");
    const tx = await contract.createIdentity(dataHash);
    document.getElementById('createStatus').textContent = 'Transaction sent! Waiting for confirmation...';
    
    // Wait for transaction confirmation
    await tx.wait();
    
    console.log('Identity created successfully!');
    document.getElementById('createStatus').textContent = 'Identity Created Successfully!';
  } catch (error) {
    console.error('Error creating identity:', error);
    document.getElementById('createStatus').textContent = 'Error: ' + (error.message || error);
  }
}

// Verify an attribute (for verifiers only)
async function verifyAttribute() {
  try {
    const contract = await initContract();
    if (!contract) return;
    
    const userAddress = document.getElementById('userToVerify').value;
    const attributeName = document.getElementById('attributeName').value;
    
    if (!ethers.utils.isAddress(userAddress)) {
      throw new Error("Invalid Ethereum address");
    }
    
    if (!attributeName.trim()) {
      throw new Error("Attribute name cannot be empty");
    }
    
    // Call contract method
    console.log(`Verifying attribute "${attributeName}" for user ${userAddress}...`);
    const tx = await contract.verifyAttribute(userAddress, attributeName);
    document.getElementById('verifyStatus').textContent = 'Transaction sent! Waiting for confirmation...';
    
    // Wait for transaction confirmation
    await tx.wait();
    
    console.log('Attribute verified successfully!');
    document.getElementById('verifyStatus').textContent = 'Attribute Verified Successfully!';
  } catch (error) {
    console.error('Error verifying attribute:', error);
    document.getElementById('verifyStatus').textContent = 'Error: ' + (error.message || error);
  }
}

// Check if an attribute is verified
async function checkAttribute() {
  try {
    const contract = await initContract();
    if (!contract) return;
    
    const userAddress = document.getElementById('userToCheck').value;
    const attributeName = document.getElementById('attributeToCheck').value;
    
    if (!ethers.utils.isAddress(userAddress)) {
      throw new Error("Invalid Ethereum address");
    }
    
    if (!attributeName.trim()) {
      throw new Error("Attribute name cannot be empty");
    }
    
    // Call contract methods
    console.log(`Checking attribute "${attributeName}" for user ${userAddress}...`);
    const isVerified = await contract.isAttributeVerified(userAddress, attributeName);
    
    let resultText = `Attribute "${attributeName}" verified: ${isVerified}`;
    
    // Only get verifier if attribute is verified
    if (isVerified) {
      const verifier = await contract.getAttributeVerifier(userAddress, attributeName);
      resultText += `, Verifier: ${verifier}`;
    }
    
    console.log(resultText);
    document.getElementById('checkResult').textContent = resultText;
  } catch (error) {
    console.error('Error checking attribute:', error);
    document.getElementById('checkResult').textContent = 'Error: ' + (error.message || error);
  }
}

// Update contract address (useful during development)
function updateContractAddress(address) {
  if (ethers.utils.isAddress(address)) {
    CONTRACT_ADDRESS = address;
    console.log("Contract address updated to:", CONTRACT_ADDRESS);
    return true;
  } else {
    console.error("Invalid contract address:", address);
    return false;
  }
}

// Initialize the application when the page loads
window.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, setting up event listeners");
  
  // Set up event listeners
  document.getElementById('connectButton').addEventListener('click', connectWallet);
  document.getElementById('createIdentityButton').addEventListener('click', createIdentity);
  document.getElementById('verifyAttributeButton').addEventListener('click', verifyAttribute);
  document.getElementById('checkAttributeButton').addEventListener('click', checkAttribute);
  
  // Check if contract address is in localStorage (useful for development)
  const savedAddress = localStorage.getItem('contractAddress');
  if (savedAddress && ethers.utils.isAddress(savedAddress)) {
    CONTRACT_ADDRESS = savedAddress;
    console.log("Loaded contract address from storage:", CONTRACT_ADDRESS);
  }
});
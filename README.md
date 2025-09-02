# 🆔 Decentralized Identity Verification DApp

A beginner-friendly decentralized application (DApp) that enables users to create and manage their digital identity on the Ethereum blockchain. This project demonstrates core blockchain concepts including smart contracts, wallet integration, and decentralized data storage.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Smart Contract Details](#smart-contract-details)
- [Contributing](#contributing)
- [License](#license)


Follow the installation instructions to run locally.

The Identity Verification DApp addresses the growing need for decentralized identity management. Instead of relying on centralized authorities, users can:

- **Own their digital identity** - Complete control over personal data
- **Selective information sharing** - Share only necessary information with verifiers
- **Cryptographic proof** - Secure, tamper-proof identity verification
- **Privacy preservation** - Personal data remains private while establishing trust
- **Eliminate intermediaries** - Direct peer-to-peer verification without third parties

### Real-World Applications

- **KYC/AML Compliance** - Financial institutions verifying customer identity
- **Educational Credentials** - Universities verifying student degrees
- **Professional Certifications** - Employers verifying employee qualifications
- **Age Verification** - Online services confirming user age without exposing exact birthdate
- **Access Control** - Secure building or system access based on verified attributes

### For Identity Owners
- ✅ Create a unique blockchain-based digital identity
- ✅ Update identity information while maintaining verification history
- ✅ Control who can access specific personal attributes
- ✅ View verification status of personal attributes

### For Verifiers
- ✅ Verify specific user attributes (email, age, credentials, etc.)
- ✅ Issue cryptographically signed verifications
- ✅ Track verification history and authenticity

### For Third Parties
- ✅ Check if user attributes are verified without accessing personal data
- ✅ Identify who performed the verification
- ✅ Trust in tamper-proof blockchain records

## 🛠 Technology Stack

### Blockchain & Smart Contracts
- **Solidity** ^0.8.0 - Smart contract development
- **Hardhat** - Ethereum development environment
- **Ethers.js** 5.7.2 - Blockchain interaction library

### Frontend
- **HTML5** - Structure and layout
- **CSS3** - Styling and responsive design
- **Vanilla JavaScript** - Client-side logic and wallet integration
- **MetaMask** - Ethereum wallet integration

### Development Tools
- **Node.js** - Runtime environment
- **NPM** - Package management
- **Lite-server** - Local development server

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download here](https://nodejs.org/)
- **NPM** (comes with Node.js)
- **MetaMask** browser extension - [Install here](https://metamask.io/download.html)
- **Git** - [Download here](https://git-scm.com/)
- Basic knowledge of:
  - JavaScript
  - Blockchain concepts
  - Ethereum and smart contracts

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/identity-verification-dapp.git
cd identity-verification-dapp
```

> **Note:** Replace `your-username` with your actual GitHub username

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Hardhat and related plugins
- Ethers.js for blockchain interaction
- Development server and tools

### 3. Install Additional Development Dependencies

```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai
npm install --save-dev dotenv lite-server
```

### 4. Project Structure Setup

Ensure your project has this structure:

```
identity-verification-dapp/
├── contracts/
│   └── SimpleIdentityVerification.sol
├── scripts/
│   └── deploy.js
├── src/
│   ├── index.html
│   └── js/
│       └── index.js
├── bs-config.json
├── hardhat.config.js
├── package.json
└── README.md
```

## 🎮 Usage

### Step 1: Start the Local Blockchain

Open a terminal and start Hardhat's local Ethereum network:

```bash
npx hardhat node
```

**Keep this terminal running!** You'll see:
- 10 test accounts with 10,000 ETH each
- Private keys for importing into MetaMask
- Local blockchain running on `http://127.0.0.1:8545`

### Step 2: Deploy the Smart Contract

In a new terminal window:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

**Important:** Copy the contract address from the output! You'll need it for the frontend.

Example output:
```
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
SimpleIdentityVerification deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Step 3: Update Contract Address

Open `src/js/index.js` and update the contract address:

```javascript
let CONTRACT_ADDRESS = "0x... your deployed contract address ...";
```

### Step 4: Configure MetaMask

1. **Add Local Network to MetaMask:**
   - Open MetaMask extension
   - Click network dropdown (top center)
   - Select "Add Network" or "Add a network manually"
   - Fill in these details:
     - **Network Name:** Localhost 8545
     - **New RPC URL:** http://127.0.0.1:8545
     - **Chain ID:** 1337
     - **Currency Symbol:** ETH

2. **Import Test Account:**
   - Copy one of the private keys from your Hardhat node terminal
   - In MetaMask: Account menu → Import Account
   - Paste the private key
   - You should now have ~10,000 ETH for testing

### Step 5: Start the Frontend

```bash
npm run dev
```

Your DApp will open at `http://localhost:3000`

### Step 6: Test the Application

1. **Connect Wallet:**
   - Click "Connect Wallet" button
   - Approve connection in MetaMask
   - Verify connection status shows "Connected"

2. **Create Identity:**
   - Enter some test information (name, email, etc.)
   - Click "Create Identity"
   - Confirm transaction in MetaMask
   - Wait for confirmation

3. **Verify Attributes (Advanced):**
   - As a verifier, you can approve attributes for other users
   - Use different MetaMask accounts to test verification workflow

4. **Check Verifications:**
   - Enter a user address and attribute name
   - Click "Check Verification"
   - See verification status and verifier information

## 📁 Project Structure

```
identity-verification-dapp/
├── contracts/                    # Smart contract files
│   └── SimpleIdentityVerification.sol
├── scripts/                      # Deployment scripts
│   └── deploy.js
├── src/                         # Frontend application
│   ├── index.html              # Main HTML file
│   └── js/
│       └── index.js            # Frontend JavaScript logic
├── artifacts/                   # Compiled contract artifacts (auto-generated)
├── cache/                       # Hardhat cache (auto-generated)
├── node_modules/               # NPM dependencies
├── bs-config.json              # Browser-sync configuration
├── hardhat.config.js           # Hardhat configuration
├── package.json                # Project configuration and dependencies
└── README.md                   # This file
```

## 🔧 Smart Contract Details

### Core Functions

#### `createIdentity(bytes32 _dataHash)`
- Creates a new identity for the caller
- Stores a hash of personal data (not the data itself)
- One identity per Ethereum address

#### `verifyAttribute(address _user, string _attributeName)`
- Allows approved verifiers to verify user attributes
- Records who verified what and when
- Only callable by approved verifiers

#### `isAttributeVerified(address _user, string _attributeName)`
- Checks if a specific attribute is verified for a user
- Returns boolean (true/false)
- Publicly callable for transparency

#### `getAttributeVerifier(address _user, string _attributeName)`
- Returns the address of who verified a specific attribute
- Enables verification of verifier authenticity
- Publicly callable

### Security Features

- **Access Control:** Only approved verifiers can verify attributes
- **Data Privacy:** Personal data stored off-chain, only hashes on-chain
- **Immutable Records:** Verifications cannot be tampered with
- **Transparent Verification:** Anyone can check verification status

## 🔍 Troubleshooting

### Common Issues

#### "ethers is not defined"
**Solution:** Check that ethers.js is loading properly in your HTML file

#### "Cannot connect to localhost:8545"
**Solution:** Ensure Hardhat node is running (`npx hardhat node`)

#### "Transaction failed"
**Solutions:**
- Check you have enough ETH for gas fees
- Verify you're connected to the correct network (localhost:8545)
- Make sure contract is deployed and address is correct

#### "Contract address not found"
**Solutions:**
- Redeploy the contract: `npx hardhat run scripts/deploy.js --network localhost`
- Update the contract address in `src/js/index.js`
- Check MetaMask is connected to localhost network

### Getting Help

1. Check browser console (F12) for detailed error messages
2. Verify Hardhat node is running and showing activity
3. Confirm MetaMask is connected to the correct network
4. Make sure contract address matches deployment output

### Beginner Improvements
- Add more user-friendly error messages
- Implement input validation and sanitization
- Create a better UI/UX design
- Add loading states and progress indicators

### Intermediate Features
- Deploy to Ethereum testnet (Sepolia, Goerli)
- Implement off-chain data storage (IPFS)
- Add attribute expiration dates
- Create verifier management system

### Advanced Features
- Zero-knowledge proof integration for enhanced privacy
- DID (Decentralized Identifier) standard compliance
- Multi-signature verification requirements
- Mobile app development
- Integration with existing identity systems

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/AmazingFeature`
3. **Commit your changes:** `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch:** `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ethereum Foundation** - For the robust blockchain platform
- **Hardhat Team** - For excellent development tools
- **MetaMask Team** - For seamless wallet integration
- **OpenZeppelin** - For smart contract security patterns
- **Blockchain Community** - For continuous learning and support

## 📞 Contact & Support

- 👨‍💻 **Developer:** [Wafiq](https://github.com/Wafee17)
- 📧 **Email:** mohammadwafiq58@gmail.com
- 🐛 **Issues:** [Report bugs here](https://github.com/Wafee17/identity-verification-dapp/issues)
- 💬 **Discussions:** [Join the conversation](https://github.com/Wafee17/identity-verification-dapp/discussions)

### Connect with me:
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mohammad-wafiq/)

If you found this project helpful:
- ⭐ **Star this repository**
- 🐛 **Report issues** you encounter
- 💡 **Suggest improvements** or new features
- 📢 **Share** with others learning blockchain development
- 🤝 **Contribute** to make it even better

---

**Happy Blockchain Development!** 🚀

*This project is designed for educational purposes and learning blockchain development. For production use, additional security audits and features would be required.*

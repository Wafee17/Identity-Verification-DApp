// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SimpleIdentityVerification
 * @dev A basic identity verification system for beginners
 */
contract SimpleIdentityVerification {
    // Struct to store user identity information
    struct Identity {
        address owner;
        bytes32 dataHash;        // Hash of the user's personal data
        mapping(string => bool) verifiedAttributes;  // e.g., "email", "age18Plus"
        mapping(string => address) attributeVerifiers; // Who verified each attribute
    }
    
    // Mapping of user addresses to their identity
    mapping(address => Identity) public identities;
    
    // List of approved verifiers (in a real system, this would be more sophisticated)
    mapping(address => bool) public approvedVerifiers;
    
    // Events
    event IdentityCreated(address indexed owner);
    event AttributeVerified(address indexed owner, string attributeName);
    
    // Modifiers
    modifier onlyVerifier() {
        require(approvedVerifiers[msg.sender], "Not an approved verifier");
        _;
    }
    
    modifier onlyIdentityOwner() {
        require(identities[msg.sender].owner == msg.sender, "Not the identity owner");
        _;
    }
    
    // Constructor
    constructor() {
        // Set the contract deployer as the first approved verifier
        approvedVerifiers[msg.sender] = true;
    }
    
    /**
     * @dev Create a new identity for the sender
     * @param _dataHash Hash of the user's personal data stored off-chain
     */
    function createIdentity(bytes32 _dataHash) public {
        require(identities[msg.sender].owner == address(0), "Identity already exists");
        
        Identity storage newIdentity = identities[msg.sender];
        newIdentity.owner = msg.sender;
        newIdentity.dataHash = _dataHash;
        
        emit IdentityCreated(msg.sender);
    }
    
    /**
     * @dev Update identity data hash
     * @param _newDataHash New hash of the user's personal data
     */
    function updateIdentity(bytes32 _newDataHash) public onlyIdentityOwner {
        identities[msg.sender].dataHash = _newDataHash;
    }
    
    /**
     * @dev Verify an attribute for a user (only by approved verifiers)
     * @param _user Address of the user
     * @param _attributeName Name of the attribute being verified (e.g., "email")
     */
    function verifyAttribute(address _user, string memory _attributeName) public onlyVerifier {
        require(identities[_user].owner == _user, "Identity does not exist");
        
        identities[_user].verifiedAttributes[_attributeName] = true;
        identities[_user].attributeVerifiers[_attributeName] = msg.sender;
        
        emit AttributeVerified(_user, _attributeName);
    }
    
    /**
     * @dev Check if an attribute is verified for a user
     * @param _user Address of the user
     * @param _attributeName Name of the attribute to check
     * @return bool True if the attribute is verified
     */
    function isAttributeVerified(address _user, string memory _attributeName) public view returns (bool) {
        return identities[_user].verifiedAttributes[_attributeName];
    }
    
    /**
     * @dev Get the verifier of an attribute
     * @param _user Address of the user
     * @param _attributeName Name of the attribute
     * @return address The address of the verifier
     */
    function getAttributeVerifier(address _user, string memory _attributeName) public view returns (address) {
        return identities[_user].attributeVerifiers[_attributeName];
    }
    
    /**
     * @dev Add a new approved verifier (only by existing verifiers)
     * @param _verifier Address of the new verifier
     */
    function addVerifier(address _verifier) public onlyVerifier {
        approvedVerifiers[_verifier] = true;
    }
}
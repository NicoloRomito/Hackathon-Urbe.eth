// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "contracts/ProofOfDegree.sol";
import "contracts/ProofOfWork.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
* A smart contract that allows changing a state variable of the contract and tracking the changes
* It also allows the owner to withdraw the Ether in the contract
* @author BuidlGuidl
*/

contract Manager is Ownable {
	// * state variables
	uint256 private				_tokenId; // the token id
	mapping (address => bool)	companies; // a map of the companies, verified or not
	mapping (address => uint256[]) _registry; // a map of the adresses and NFTs
	ProofOfDegree		public	degreeNFT; // Prof of Degree NFT
	ProofOfWork	 		public	workNFT; // Proof of Work Experience

    event NFTCreated(address minter, address receiver, address addressNFT, uint256 tokenId);

	event NFTBurned(address burner, uint256 tokenId);

	event TryToBurn(address sender, uint256 tokenId);

	constructor(address owner) Ownable(owner) {
		degreeNFT = new ProofOfDegree(owner);
		workNFT = new ProofOfWork(owner);
		companies[owner] = true;
		_tokenId = 0;
	}

	function _ownerOf(uint256 tokenId, address owner) public view returns (uint256) {
		uint256[] storage tokenArray = _registry[owner];
		uint256 length = tokenArray.length;

		// Find the token ID in the user's array
		for (uint256 i = 0; i < length; i++) {
			if (tokenArray[i] == tokenId) {
				return tokenId;
			}
		}
		revert("Token ID not found in the user's registry");
	}

	// * Mint Function for Work Experience.
	function	mintWorkExperience(
		address to,
		uint256 dateFrom,
		uint256 dateTo,
		string memory role,
		string memory description,
		string memory companyName
	) public {
        require(companies[msg.sender], "Only a verified company can mint");

		_tokenId++;
		workNFT.setDescription(description);
		workNFT.setCompanyName(companyName);
		workNFT.setRole(role);
		workNFT.setDateFrom(dateFrom);
		workNFT.setDateTo(dateTo);
		workNFT.mint(to, _tokenId);
		emit NFTCreated(msg.sender, to, address(workNFT), _tokenId);
	}

	// * Mint Function for Degree.
	function mintDegree(
		address to,
		uint256 dateFrom,
		uint256 dateTo,
		string memory degree,
		string memory description,
		string memory trainingInstitution
	) external {
        require(companies[msg.sender], "Only a verified company can mint");

		_tokenId++;
		degreeNFT.setDateFrom(dateFrom);
		degreeNFT.setDateTo(dateTo);
		degreeNFT.setDegree(degree);
		degreeNFT.setDescription(description);
		degreeNFT.setTrainingInstitution(trainingInstitution);

		degreeNFT.safeMint(to, _tokenId);
		
		emit NFTCreated(msg.sender, to, address(degreeNFT), _tokenId);
	}

	// * Burn Function for Degree.
	function burnDegree(uint256 tokenId) external {
		emit TryToBurn(msg.sender, tokenId);

		require(companies[msg.sender], "Only a verified company can burn");

		degreeNFT.burn(msg.sender, tokenId);

		emit NFTBurned(msg.sender, tokenId);

		removeTokenFromRegistry(msg.sender, tokenId);
	}

	function removeTokenFromRegistry(address user, uint256 tokenId) public {
		// Ensure the user has tokens registered
		require(_registry[user].length > 0, "No tokens found for the user");

		uint256[] storage tokenArray = _registry[user];
		uint256 length = tokenArray.length;

		// Find the token ID in the user's array
		for (uint256 i = 0; i < length; i++) {
			if (tokenArray[i] == tokenId) {
				// Replace the current element with the last element
				tokenArray[i] = tokenArray[length - 1];
				// Remove the last element (shorten the array)
				tokenArray.pop();
				return;
			}
		}

		// If token ID was not found
		revert("Token ID not found in the user's registry");
	}


	// * SETTERS //

    function setMinter(address minter, bool status) external {
        companies[minter] = status;
    }

	// * GETTERS //
	// getVerified
	// @param address -> the address of the company to look for;
	function getVerified(address company) public view returns (bool) {
        return companies[company];
    }

	function getTokenId() public view returns (uint256) {
		return _tokenId;
	}

	function getAddressNFT() public view returns (address) {
		return address(this);
	}

}
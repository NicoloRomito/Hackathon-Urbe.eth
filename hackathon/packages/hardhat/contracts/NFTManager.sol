// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "contracts/ProofOfDegree.sol";
import "contracts/ProofOfWork.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// /**
//  * A smart contract that allows changing a state variable of the contract and tracking the changes
//  * It also allows the owner to withdraw the Ether in the contract
//  * @author BuidlGuidl
//  */

// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract YourContract is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
//     // Required override methods for multiple inheritance
//     function _increaseBalance(address account, uint128 amount) internal virtual override(ERC721, ERC721Enumerable) {
//         super._increaseBalance(account, amount);
//     }

//     function _update(
//         address to, 
//         uint256 tokenId, 
//         address auth
//     ) internal virtual override(ERC721, ERC721Enumerable) returns (address) {
//         return super._update(to, tokenId, auth);
//     }

// 	uint256 tokenIdCounter = 0;

//     constructor() ERC721("YourContract", "YCB") Ownable(msg.sender) {}

//     function _baseURI() internal pure override returns (string memory) {
//         return "https://ipfs.io/ipfs/";
//     }

//     function mintItem(address to, string memory uri) public returns (uint256) {
//         tokenIdCounter++;
//         uint256 tokenId = tokenIdCounter;
//         _safeMint(to, tokenId);
//         _setTokenURI(tokenId, uri);
//         return tokenId;
//     }

//     // The following functions are overrides required by Solidity.
//     // function _beforeTokenTransfer(
//     //     address from,
//     //     address to,
//     //     uint256 tokenId,
//     //     uint256 quantity
//     // ) internal override(ERC721, ERC721Enumerable) {
//     //     super._beforeTokenTransfer(from, to, tokenId, quantity);
//     // }

//     // function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
//     //     super._burn(tokenId);
//     // }

//     function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
//         return super.tokenURI(tokenId);
//     }

//     function supportsInterface(
//         bytes4 interfaceId
//     ) public view override(ERC721, ERC721Enumerable, ERC721URIStorage) returns (bool) {
//         return super.supportsInterface(interfaceId);
//     }
// }

contract Manager is Ownable {
	// * state variables
	uint256 private				_tokenId; // the token id
	mapping (address => bool)	companies; // a map of the companies, verified or not
	mapping (address => uint256[]) _registry; // a map of the adresses and NFTs
	ProofOfDegree		public	degreeNFT; // Prof of Degree NFT
	ProofOfWork	 		public	workNFT; // Proof of Work Experience

    event NFTCreated(address minter, address receiver, address addressNFT, uint256 tokenId);

	constructor(address owner) Ownable(owner) {
		degreeNFT = new ProofOfDegree(owner);
		workNFT = new ProofOfWork(owner);
		companies[owner] = true;
		_tokenId = 0;
	}

	function _ownerOf(uint256 tokenId) public view returns (address) {
		if (degreeNFT.ownerOf(tokenId) != address(0)) {
			console.log("Degree NFT");
			return degreeNFT.ownerOf(tokenId);
		} else {
			console.log("Work Experience NFT");
			return workNFT.ownerOf(tokenId);
		}
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
		emit NFTCreated(address(this), to, address(degreeNFT), _tokenId);
	}

	// * Mint Function for Degree.
	function mintDegree(
		address to,
		uint256 dateFrom,
		uint256 dateTo,
		uint256 deadline,
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
		degreeNFT.setDeadline(deadline);
		degreeNFT.safeMint(to, _tokenId);
		emit NFTCreated(msg.sender, to, address(degreeNFT), _tokenId);
	}

	// * Burn Function for Degree.
	function burnDegree(uint256 tokenId) external {
		require(companies[msg.sender], "Only a verified company can burn");
		require(degreeNFT.isExpired(tokenId), "Degree has not expired");
		degreeNFT.burn(tokenId);
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
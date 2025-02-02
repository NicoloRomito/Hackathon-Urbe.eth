// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./ProofOfDegree.sol";
import "./ProofOfWork.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
* A smart contract that allows changing a state variable of the contract and tracking the changes
* It also allows the owner to withdraw the Ether in the contract
* @author BuidlGuidl
*/

contract Manager is Ownable {

	struct Verification {
		bool isVerified;
		string verifiedBy;
	}

	mapping (address => uint256[]) private usersNFT;

	mapping (address => uint256[]) private companiesNFT;
	
	mapping (address => bool) private companiesVerified;

	mapping(address => Verification) private userVerifications;
	
	uint256 public _tokenId; // the token id

	ProofOfDegree		public	degreeNFT; // Prof of Degree NFT

	ProofOfWork	 		public	workNFT; // Proof of Work Experience

	// Called when a new NFT is minted
    event NFTCreated(address minter, address receiver, uint256 tokenId);
	
	constructor(address owner) Ownable(owner) {
		degreeNFT = new ProofOfDegree(owner);
		workNFT = new ProofOfWork(owner);
		companiesVerified[owner] = true;
	}

	function isUserVerified(address user) public view returns (bool) {
		return userVerifications[user].isVerified;
	}

	function addUserToVerification(address user, string memory company) public {
        require(companiesVerified[msg.sender], "Only a verified company can mint");
		userVerifications[user].verifiedBy = company;	
	}

	function assignNFTtoUSER(address user, uint256 nft) private {
		usersNFT[user].push(nft);
	}

	function assignNFTtoCOMPANY(address company, uint256 nft) private {
		companiesNFT[company].push(nft);
	}		

	function _ownerOfDegree(uint256 tokenId) public view returns (address) {
		return IERC721(degreeNFT).ownerOf(tokenId);
	}

	function _ownerOfWork(uint256 tokenId) public view returns (address) {
		return IERC721(workNFT).ownerOf(tokenId);
	}

	function	mintWorkExperience(
		address to,
		string memory uri
	) public {
        require(companiesVerified[msg.sender], "Only a verified company can mint");
		_tokenId = workNFT.mint(to);
		//TODO pass the uri as paramenter to the mint function
		workNFT.setTokenURI(uri);

		assignNFTtoCOMPANY(msg.sender, _tokenId);
		assignNFTtoUSER(to, _tokenId);

		emit NFTCreated(msg.sender, to, _tokenId);
	}

	// * Mint Function for Degree.
	function mintDegree(
		address to,
		string memory uri
	) external {
        require(companiesVerified[msg.sender], "Only a verified company can mint");

		degreeNFT.setTokenURI(uri); // Ensure ProofOfDegree has this function or remove this line

		_tokenId = degreeNFT.safeMint(to);
		
		emit NFTCreated(msg.sender, to, _tokenId);
	}

    function setMinter(address minter, bool status) public {
		require(companiesVerified[msg.sender], "Only a verified company can add another company");
        companiesVerified[minter] = status;
    }

	function getVerified(address company) public view returns (bool) {
        return companiesVerified[company];
    }

}
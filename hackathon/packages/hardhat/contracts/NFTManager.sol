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
   
	struct UserVerificationData {
		bool isVerified;
		string verifiedBy;
		string name;
		string lastName;
		string codiceFiscale;
		string email;
	}
	
	struct CompanyVerificationData {
		bool isVerified;
		string name;
		string partitaIva;
	}

	mapping (address => uint256[]) private usersNFT;

	mapping (address => uint256[]) private companiesNFT;
	
	mapping (address => CompanyVerificationData) private companiesVerified;

	mapping(address => UserVerificationData) private userVerifications;
	
	uint256 public _tokenId; 

	ProofOfDegree		public	degreeNFT;

	ProofOfWork	 		public	workNFT;

    event NFTCreated(address minter, address receiver, uint256 tokenId);
	
	constructor(address owner) Ownable(owner) {
		degreeNFT = new ProofOfDegree(owner);
		workNFT = new ProofOfWork(owner);
		companiesVerified[owner].isVerified = true;
		companiesVerified[owner].name = "DE-VY";
		companiesVerified[owner].partitaIva = "FAKEPARTITAIVA";
	}

	function isUserOrCompany(address addressToCheck) public view returns (string memory entity) {
    	if (companiesVerified[addressToCheck].isVerified) {
    	    return "company";
    	}
    	if (userVerifications[addressToCheck].isVerified) {
    	    return "user";
    	}
    	return "none";
	}

	function isUserVerified(address user) public view onlyOwner returns (bool) {
		return userVerifications[user].isVerified;
	}

	function isCompanyVerified(address company) public view onlyOwner returns (bool) {
		return companiesVerified[company].isVerified;
	}

	function getUserVerificationData(address user) public view onlyOwner returns (UserVerificationData memory) {
		return userVerifications[user];
	}

	function getCompanyVerificationData(address company) public view  onlyOwner returns (CompanyVerificationData memory) {
		return companiesVerified[company];
	}

	function setCompanyVerification(
		address company,
		string memory name,
		bool isVerified,
		string memory partitaIva
		) public onlyOwner {

		companiesVerified[company].isVerified = isVerified;
		companiesVerified[company].name = name;
		companiesVerified[company].partitaIva = partitaIva;
	}

	function setUserVerification(
		address user,
		string memory company,
		bool isVerified, 
		string memory name,
		string memory lastName,
		string memory codiceFiscale,
		string memory email
		) public onlyOwner{
		userVerifications[user].verifiedBy = company;	
		userVerifications[user].isVerified = isVerified;
		userVerifications[user].name = name;
		userVerifications[user].lastName = lastName;
		userVerifications[user].codiceFiscale = codiceFiscale;
		userVerifications[user].email = email;
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
	) public onlyOwner {
		_tokenId = workNFT.mint(to);
		//TODO pass the uri as paramenter to the mint function
		workNFT.setTokenURI(uri);

		assignNFTtoCOMPANY(msg.sender, _tokenId);
		assignNFTtoUSER(to, _tokenId);

		emit NFTCreated(msg.sender, to, _tokenId);
	}

	function mintDegree(
		address to,
		string memory uri
	) external onlyOwner {

		degreeNFT.setTokenURI(uri); // Ensure ProofOfDegree has this function or remove this line

		_tokenId = degreeNFT.safeMint(to);
		
		emit NFTCreated(msg.sender, to, _tokenId);
	}

    function setMinter(address minter, bool status) public onlyOwner{
        companiesVerified[minter].isVerified = status;
    }

	// function getVerified(address company) public view returns (bool) {
    //     return companiesVerified[company].isVerified;
    // }

}
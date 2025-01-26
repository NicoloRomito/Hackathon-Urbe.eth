//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */

contract ProofOfDegree is ERC721, ERC721Burnable, ERC721URIStorage, Ownable {
    // state variables
    uint256 private	_tokenId; // the token id
    uint256	private _dateFrom;
    uint256	private	_dateTo;
	string  private	_description;
    string  private	_degree;
	string  private	_trainingInstitution;

	mapping (uint256 => address) private _tokenInfo;

    // Eventually it could be possible to limit the size of the dinamic strings to reduce the size of the smart contract

    constructor(address initialOwner) ERC721("ProofOfDegree", "PoD") Ownable(initialOwner) {
        _tokenId = 0;
    }

	// function _beforeTokenTransfer(
	// 	address from,
	// 	address to,
	// 	uint256 tokenId
	// ) internal override(ERC721) {
	// 	super._beforeTokenTransfer(from, to, tokenId);
	// }

	function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

	function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

	function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function safeMint(address to, uint256 id) public  {
		require(id > 0, "Token ID must be greater than 0");
        _tokenId = id;
        _safeMint(to, _tokenId);
		_tokenInfo[_tokenId] = msg.sender;
    }

	function burn(address sender, uint256 tokenId) public {
		require(_tokenInfo[tokenId] == sender, "Only the creator can burn the NFT");
		_burn(tokenId);
	}

	// * SETTERS //
	function setTrainingInstitution(string memory trainingInstitution) public {
		_trainingInstitution = trainingInstitution;
	}

    function setDescription(string memory description) public {
        _description = description;
    }

    function setDegree(string memory degree) public {
        _degree = degree;
    }

	function setDateFrom(uint256 dateFrom) public {
		_dateFrom = dateFrom;
	}

	function setDateTo(uint256 dateTo) public {
		_dateTo = dateTo;
	}

	function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal override {
		super._setTokenURI(tokenId, _tokenURI);
	}

	// * GETTERS //

	function getTokenId() public view returns (uint256) {
		return _tokenId;
	}

	function getDescription() public view returns (string memory) {
		return _description;
	}

	function getDegree() public view returns (string memory) {
		return _degree;
	}

	function getTrainingInstitution() public view returns (string memory) {
		return _trainingInstitution;
	}

	function getDateFrom() public view returns (uint256) {
		return _dateFrom;
	}

	function getDateTo() public view returns (uint256) {
		return _dateTo;
	}

}

//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */

contract ProofOfDegree is ERC721, ERC721Burnable, Ownable {
    // state variables
    uint256 private	_tokenId; // the token id
    uint256	private _dateFrom;
    uint256	private	_dateTo;
	string  private	_description;
    string  private	_degree;
	string  private	_trainingInstitution;
	struct TokenInfo {
		address	_creator;
		uint256	_deadline;
	}

	mapping (uint256 => TokenInfo) private _tokenInfo;

    // Eventually it could be possible to limit the size of the dinamic strings to reduce the size of the smart contract

    event NFTBurned(address burned, uint256 tokenId);

    constructor(address initialOwner) ERC721("ProofOfDegree", "PoD") Ownable(initialOwner) {
        _tokenId = 0;
    }

    function safeMint(address to, uint256 id) public  {
		require(id > 0, "Token ID must be greater than 0");
        _tokenId = id;
        _safeMint(to, _tokenId);
		_tokenInfo[_tokenId]._creator = msg.sender;
    }

	function isExpired(uint256 tokenId) public view returns (bool) {
		return block.timestamp > _tokenInfo[tokenId]._deadline;
	}

	function burn(uint256 tokenId) public override {
		require(_tokenInfo[tokenId]._creator == msg.sender, "Only the creator can burn the NFT");
        require(block.timestamp > _tokenInfo[_tokenId]._deadline, "Deadline has not passed");
		_burn(tokenId);
		emit NFTBurned(msg.sender, tokenId);
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

	// TODO: check if the deadline is working
	function setDeadline(uint256 deadline) public {
		_tokenInfo[_tokenId]._deadline = block.timestamp + (deadline * 30 seconds);
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

	function getDeadline() public view returns (uint256) {
		return _tokenInfo[_tokenId]._deadline;
	}
}

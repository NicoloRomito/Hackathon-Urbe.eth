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

contract ProofOfDegree is ERC721URIStorage, ERC721Burnable, Ownable {
    // state variables
    uint256 public	_tokenId; // the token id

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

    function safeMint(address to) public returns (uint256) {
		require(_tokenId > 0, "Token ID must be greater than 0");
        _safeMint(to, _tokenId);
		_tokenId++;
		_tokenInfo[_tokenId] = msg.sender;
		return _tokenId;
    }

	// * SETTERS //

	function setTokenURI(string memory _tokenURI) public {

		if (_tokenId == 0) {
			_tokenId++;
		}
		_setTokenURI(_tokenId, _tokenURI);
	}

	// * GETTERS //

	function getTokenId() public view returns (uint256) {
		return _tokenId;
	}

}

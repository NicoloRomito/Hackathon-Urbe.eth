//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */

contract ProofOfWork is ERC721, ERC721URIStorage, Ownable {
    // * state variables
    uint256 public	_tokenId; // the token id

    constructor(address initialOwner) ERC721("ProofOfWork", "PoW") Ownable(initialOwner) {
        _tokenId = 0;
    }

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

    function mint(address to) public returns (uint256) {
        _tokenId++;
        require(_tokenId > 0, "Token ID must be greater than 0");
        _safeMint(to, _tokenId);
        return _tokenId;
    }

    // * SETTERS //

	function setTokenURI(string memory _tokenURI) public {
		_setTokenURI(_tokenId, _tokenURI);
	}

    // * GETTERS //

    function getTokenId() public view returns (uint256) {
        return _tokenId;
    }

}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/utils/introspection/IERC165.sol";
import "openzeppelin-contracts/token/ERC721/IERC721.sol";
import "openzeppelin-contracts/token/ERC721/ERC721.sol";
// ERC721Metadata
import "openzeppelin-contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-contracts/interfaces/IERC1271.sol";
import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/utils/Counters.sol";
import "openzeppelin-contracts/interfaces/IERC721Receiver.sol";
import "openzeppelin-contracts/utils/cryptography/SignatureChecker.sol";

import "../interfaces/IERC6551Account.sol";
import "./CommunityLedger.sol";
import "../lib/ERC6551AccountLib.sol";
import "../../src/ERC6551Registry.sol";
import "../../src/examples/simple/SimpleERC6551Account.sol";

contract LensFrens is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    ERC6551Registry public registry;
    SimpleERC6551Account public implementation;
    CommunityLedger public communityLedger;
    mapping(address => address[]) public ownersOfCommunities;
    mapping(address => string) public communityNames;

    Counters.Counter private _tokenIdCounter;

    constructor(
        string memory name,
        string memory symbol,
        address communityLedgerAddress
    ) ERC721(name, symbol) {
        registry = new ERC6551Registry();
        implementation = new SimpleERC6551Account();
        communityLedger = CommunityLedger(communityLedgerAddress);
    }

    function createGroup(
        string memory name,
        string memory image,
        address[] memory members
    ) public returns (address) {
        _mint(msg.sender, _tokenIdCounter.current());
        _setTokenURI(_tokenIdCounter.current(), image);
        address community = registry.createAccount(
            address(implementation),
            block.chainid,
            address(this),
            1,
            0,
            ""
        );
        ownersOfCommunities[msg.sender].push(community);
        communityNames[community] = name;
        communityLedger.addMembers(community, members);
        return community;
    }

    function getMyCommunities() public view returns (address[] memory) {
        return ownersOfCommunities[msg.sender];
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}

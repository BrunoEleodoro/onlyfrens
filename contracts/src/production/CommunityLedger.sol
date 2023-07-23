// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "../../src/interfaces/IERC6551Account.sol";
import "openzeppelin-contracts/utils/Counters.sol";

contract CommunityLedger is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    // mapping of token bounded accounts to addresses that is part of the community
    mapping(address => address[]) public communityMembers;

    // mapping of tokenId to each community member
    mapping(uint256 => address) public communityMembersByTokenId;

    constructor() ERC721("CommunityLedger", "CL") {}

    function safeMint(address to) internal {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        communityMembersByTokenId[tokenId] = to;
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function listMembersFromAccount(
        address _account
    ) external view returns (address[] memory) {
        return communityMembers[_account];
    }

    // add batch of members to the community
    function addMembers(address _account, address[] memory _members) external {
        IERC6551Account account = IERC6551Account(payable(_account));

        // require(
        //     msg.sender == account.owner(),
        //     "Only the owner of the community can add members"
        // );
        for (uint256 i = 0; i < _members.length; i++) {
            communityMembers[_account].push(_members[i]);
            // mint the NFT for the ERC6551Account for each member
            safeMint(_account);
        }
    }

    // function to add a member to the community
    function addMember(address _account, address _member) external {
        IERC6551Account account = IERC6551Account(payable(_account));

        // require(
        //     msg.sender == account.owner(),
        //     "Only the owner of the community can add members"
        // );

        communityMembers[_account].push(_member);
    }

    // function to remove a member from the community
    function removeMember(address _account, address _member) external {
        address[] storage members = communityMembers[_account];
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i] == _member) {
                members[i] = members[members.length - 1];
                members.pop();
                break;
            }
        }
    }
}

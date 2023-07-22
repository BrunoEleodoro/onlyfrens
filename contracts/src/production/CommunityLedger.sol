// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "../../src/interfaces/IERC6551Account.sol";

contract CommunityLedger {
    // mapping of token bounded accounts to addresses that is part of the community
    mapping(address => address[]) public communityMembers;

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

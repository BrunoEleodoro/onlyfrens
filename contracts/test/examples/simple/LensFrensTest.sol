// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";

import "../../../src/ERC6551Registry.sol";
import "../../../src/examples/simple/SimpleERC6551Account.sol";
import "../../mocks/MockERC721.sol";
import "../../mocks/CommunityLedger.sol";
import "../../mocks/MockERC6551Account.sol";

contract LensFrensTest is Test {
    ERC6551Registry public registry;
    SimpleERC6551Account public implementation;

    MockERC721 lensUser1 = new MockERC721();
    MockERC721 lensUser2 = new MockERC721();

    function setUp() public {
        registry = new ERC6551Registry();
        implementation = new SimpleERC6551Account();
    }

    function testDeploy() public {
        address deployedAccount = registry.createAccount(
            address(implementation),
            block.chainid,
            address(0),
            0,
            0,
            ""
        );

        assertTrue(deployedAccount != address(0));

        address predictedAccount = registry.account(
            address(implementation),
            block.chainid,
            address(0),
            0,
            0
        );

        assertEq(predictedAccount, deployedAccount);
    }

    function testCall() public {
        // LensAccount1 deployed this contract, so he is the owner
        // of the community

        // 1- The creator of the community mints the NFT of the community
        MockERC721 ETHParisCommunity = new MockERC721();
        ETHParisCommunity.mint(vm.addr(1), 1);

        // 2- Then it creates the token bounded account from the NFT
        address community = registry.createAccount(
            address(implementation),
            block.chainid,
            address(ETHParisCommunity),
            1,
            0,
            ""
        );

        // 3- He invites other lens users to join the community
        // by minting the Community Proof NFT into their accounts
        CommunityLedger communityLedger = new CommunityLedger();

        address owner = IERC6551Account(payable(community)).owner();

        // participants
        address lensAccount2 = vm.addr(2);
        address lensAccount3 = vm.addr(3);
        address lensAccount4 = vm.addr(4);

        console.log("owner", owner);

        // pretend I'm lensAccount1
        vm.prank(vm.addr(1));

        communityLedger.addMember(community, lensAccount2);
        communityLedger.addMember(community, lensAccount3);
        communityLedger.addMember(community, lensAccount4);

        assertEq(communityLedger.listMembersFromAccount(community).length, 3);

        //
        //
        // REMOVE MEMBER FROM THE COMMUNITY
        //
        //

        communityLedger.removeMember(community, lensAccount2);
        assertEq(communityLedger.listMembersFromAccount(community).length, 2);
    }
}

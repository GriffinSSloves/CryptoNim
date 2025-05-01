// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Nim} from "../src/Nim.sol";

contract NimTest is Test {
    Nim public nim;
    address public player1;
    address public player2;

    function setUp() public {
        // Create test accounts
        player1 = address(1);
        player2 = address(2);
        
        // Deploy the contract
        nim = new Nim(address(this));
    }

    function test_initializeGame_success() public {
        vm.prank(player1);
        Nim.Game memory game = nim.initializeGame();
        
        assertEq(game.playerOne.playerAddress, player1);
        assertEq(game.playerTwo.playerAddress, address(0));
        assertTrue(game.playerOneTurn);
        assertEq(game.winner.playerAddress, address(0));
        assertTrue(game.rows.length > 0);
    }

    function test_joinGame_success() public {
        // Setup
        vm.prank(player1);
        Nim.Game memory game = nim.initializeGame();
        uint256 gameId = game.gameId;

        // Test
        vm.prank(player2);
        game = nim.joinGame(gameId);

        // Assert
        assertEq(game.playerOne.playerAddress, player1);
        assertEq(game.playerTwo.playerAddress, player2);
    }

    function test_joinGame_revert_ownGame() public {
        // Setup
        vm.prank(player1);
        Nim.Game memory game = nim.initializeGame();
        uint256 gameId = game.gameId;

        // Test
        vm.prank(player1);
        vm.expectRevert(abi.encodeWithSelector(Nim.CannotJoinOwnGame.selector, gameId, player1));
        nim.joinGame(gameId);
    }

    function test_joinGame_revert_alreadyFull() public {
        // Setup
        vm.prank(player1);
        Nim.Game memory game = nim.initializeGame();
        uint256 gameId = game.gameId;

        // Join first time
        vm.prank(player2);
        game = nim.joinGame(gameId);

        // Try to join again
        vm.prank(address(3));
        vm.expectRevert(abi.encodeWithSelector(
            Nim.GameAlreadyHasTwoPlayers.selector,
            gameId,
            player1,
            player2
        ));
        nim.joinGame(gameId);
    }

    function test_playTurn_revert_notYourTurn() public {
        // Setup
        vm.prank(player1);
        Nim.Game memory game = nim.initializeGame();
        uint256 gameId = game.gameId;

        vm.prank(player2);
        game = nim.joinGame(gameId);

        // Test
        vm.prank(player2);
        vm.expectRevert(abi.encodeWithSelector(Nim.NotYourTurn.selector, gameId, player1));
        nim.playTurn(gameId, 0, 1);
    }

    function test_playTurn_revert_invalidRow() public {
        // Setup
        vm.prank(player1);
        Nim.Game memory game = nim.initializeGame();
        uint256 gameId = game.gameId;

        vm.prank(player2);
        game = nim.joinGame(gameId);

        // Test
        vm.prank(player1);
        vm.expectRevert(abi.encodeWithSelector(Nim.InvalidRow.selector, gameId, game.rows.length));
        nim.playTurn(gameId, game.rows.length, 1);
    }

    function test_playTurn_revert_invalidStones() public {
        // Setup
        vm.prank(player1);
        Nim.Game memory game = nim.initializeGame();
        uint256 gameId = game.gameId;

        vm.prank(player2);
        game = nim.joinGame(gameId);

        // Test
        vm.prank(player1);
        vm.expectRevert(abi.encodeWithSelector(
            Nim.InvalidStones.selector,
            gameId,
            0,
            game.rows[0] + 1
        ));
        nim.playTurn(gameId, 0, game.rows[0] + 1);
    }
} 
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

    function test_playTurn_success() public {
        // Setup
        vm.prank(player1);
        Nim.Game memory game = nim.initializeGame();
        uint256 gameId = game.gameId;

        vm.prank(player2);
        game = nim.joinGame(gameId);

        // Store initial values
        uint256 initialStones = game.rows[0];
        
        // Player1 takes some stones
        vm.prank(player1);
        game = nim.playTurn(gameId, 0, 1);

        // Assert
        assertEq(game.rows[0], initialStones - 1);
        assertFalse(game.playerOneTurn);
        assertEq(game.winner.playerAddress, address(0));

        // Player2 takes some stones
        vm.prank(player2);
        game = nim.playTurn(gameId, 0, 1);
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
        vm.expectRevert(abi.encodeWithSelector(Nim.InvalidRow.selector, gameId, uint256(game.rows.length)));
        nim.playTurn(gameId, uint256(game.rows.length), 1);
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
            uint256(game.rows[0] + 1)
        ));
        nim.playTurn(gameId, 0, uint256(game.rows[0] + 1));
    }

    function test_gameEndsWhenLastStoneTaken() public {
        // Setup
        vm.prank(player1);
        Nim.Game memory game = nim.initializeGame();
        uint256 gameId = game.gameId;

        vm.prank(player2);
        game = nim.joinGame(gameId);

        // Take all stones from first row
        vm.prank(player1);
        game = nim.playTurn(gameId, 0, game.rows[0]);

        // Take all stones from remaining rows
        for (uint256 i = 1; i < game.rows.length; i++) {
            if (i % 2 == 0) {
                vm.prank(player1);
            } else {
                vm.prank(player2);
            }
            game = nim.playTurn(gameId, i, game.rows[i]);
        }

        // Assert game ended
        assertEq(game.winner.playerAddress, player2); // Player2 wins because they took the last stone
    }

    function test_viewGame_success() public {
        // Setup
        vm.prank(player1);
        Nim.Game memory game = nim.initializeGame();
        uint256 gameId = game.gameId;

        // View game before joining
        Nim.Game memory viewedGame = nim.viewGame(gameId);
        assertEq(viewedGame.gameId, gameId);
        assertEq(viewedGame.playerOne.playerAddress, player1);
        assertEq(viewedGame.playerTwo.playerAddress, address(0));

        // Join game
        vm.prank(player2);
        game = nim.joinGame(gameId);

        // View game after joining
        viewedGame = nim.viewGame(gameId);
        assertEq(viewedGame.playerTwo.playerAddress, player2);
    }

    function test_getAvailableGames_success() public {
        // Create multiple games
        vm.prank(player1);
        Nim.Game memory game1 = nim.initializeGame();
        Nim.Game memory game2 = nim.initializeGame();

        // Join one game
        vm.prank(player2);
        nim.joinGame(game1.gameId);

        // Get available games
        uint256[] memory availableGames = nim.getAvailableGames();
        
        // Should only have one available game
        assertEq(availableGames.length, 1);
        assertEq(availableGames[0], game2.gameId);
    }
} 
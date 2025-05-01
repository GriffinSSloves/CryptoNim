// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/// @notice A smart contract implementation of the classic game Nim
contract Nim {

    uint8 public constant MAX_ROWS = 10;
    uint8 public constant MAX_STONES = 10;

    // Generate random number between 1 and x
    function random(uint8 x) internal view returns (uint8) {
        // Use block data as a source of randomness
        // This is not perfectly random but sufficient for many use cases
        return uint8(uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            blockhash(block.number - 1),
            msg.sender
        ))) % x + 1);
    }

    struct Game {
        uint256 gameId;
        uint8[] rows;
        bool playerOneTurn;
        Player playerOne;
        Player playerTwo;
        Player winner;
        uint48 lastUpdatedAt;
    }

    struct Player {
        address playerAddress;
    }

    address public immutable owner;


    Game[] public games;


    event GameCreated(uint256 indexed gameId, address indexed creator);
    event GameJoined(uint256 indexed gameId, address indexed joiner);
    event TurnPlayed(uint256 indexed gameId, address indexed player, uint8 row, uint8 stones);
    event GameEnded(uint256 indexed gameId, address indexed winner);


    error GameDoesNotExist(uint256 gameId, uint256 totalGames);
    error GameAlreadyHasTwoPlayers(uint256 gameId, address playerOne, address playerTwo);
    error CannotJoinOwnGame(uint256 gameId, address player);
    error GameAlreadyEnded(uint256 gameId, Player winner);
    error NotYourTurn(uint256 gameId, address currentPlayer);
    error InvalidRow(uint256 gameId, uint8 row);
    error InvalidStones(uint256 gameId, uint8 row, uint8 stones);


    constructor(address owner_) {
        owner = owner_;
    }

    /// @notice Get the total number of games created.
    function totalGames() external view returns (uint256) {
        return games.length;
    }

    function initializeGame() external returns (Game memory) {
        // Generate random number of rows between 1 and MAX_ROWS
        uint8 numRows = random(MAX_ROWS);
        
        // Create array for rows
        uint8[] memory rowStones = new uint8[](numRows);
        
        // Fill each row with random number of stones between 1 and MAX_STONES
        for (uint8 i = 0; i < numRows; i++) {
            rowStones[i] = random(MAX_STONES);
        }

        // Create new game
        Game memory game = Game({
            gameId: games.length,
            rows: rowStones,
            playerOneTurn: true,
            playerOne: Player(msg.sender),
            playerTwo: Player(address(0)),
            winner: Player(address(0)),
            lastUpdatedAt: uint48(block.timestamp)
        });

        // Add game to storage
        games.push(game);

        // Emit event
        emit GameCreated(game.gameId, msg.sender);

        // Return the game object
        return game;
    }

    

    /// @notice Join an existing game as the second player
    /// @param gameId The ID of the game to join
    /// @return The updated game state
    function joinGame(uint256 gameId) external returns (Game memory) {
        // Get the game from storage
        if (gameId >= games.length) revert GameDoesNotExist(gameId, games.length);
        
        Game storage game = games[gameId];
        
        // Check if game already has two players
        if (game.playerTwo.playerAddress != address(0)) {
            revert GameAlreadyHasTwoPlayers(
                gameId,
                game.playerOne.playerAddress,
                game.playerTwo.playerAddress
            );
        }
        
        // Check if player is trying to join their own game
        if (game.playerOne.playerAddress == msg.sender) {
            revert CannotJoinOwnGame(gameId, msg.sender);
        }

        // Update game state
        game.playerTwo = Player(msg.sender);
        game.lastUpdatedAt = uint48(block.timestamp);

        // Emit event
        emit GameJoined(gameId, msg.sender);

        // Return the updated game
        return game;
    }

    /// @notice Play a turn in the game by removing stones from a row
    /// @param gameId The ID of the game to play in
    /// @param row The row to remove stones from (0-based index)
    /// @param stones The number of stones to remove
    /// @return The updated game state
    function playTurn(uint256 gameId, uint8 row, uint8 stones) external returns (Game memory) {
        // Get the game from storage
        if (gameId >= games.length) revert GameDoesNotExist(gameId, games.length);

        Game storage game = games[gameId];

        // Check if game has ended
        if (game.winner.playerAddress != address(0)) revert GameAlreadyEnded(gameId, game.winner);

        // Check if it's the player's turn
        address currentPlayer = game.playerOneTurn ? game.playerOne.playerAddress : game.playerTwo.playerAddress;
        if (msg.sender != currentPlayer) revert NotYourTurn(gameId, currentPlayer);

        // Check if row is valid
        if (row >= game.rows.length) revert InvalidRow(gameId, row);

        // Check if stones input is valid
        if (stones == 0 || stones > game.rows[row]) revert InvalidStones(gameId, row, stones);

        // Update game state
        game.rows[row] -= stones;
        game.playerOneTurn = !game.playerOneTurn;
        game.lastUpdatedAt = uint48(block.timestamp);

        // Check for win condition (no stones left)
        bool gameEnded = true;
        for (uint8 i = 0; i < game.rows.length; i++) {
            if (game.rows[i] > 0) {
                gameEnded = false;
                break;
            }
        }

        if (gameEnded) {
            // The player who just played lost (took the last stone)
            // The other player wins
            address winningPlayer = game.playerOneTurn ? game.playerOne.playerAddress : game.playerTwo.playerAddress;
            game.winner = Player(winningPlayer);
            emit GameEnded(gameId, winningPlayer);
        } else {
            emit TurnPlayed(gameId, currentPlayer, row, stones);
        }

        return game;
    }

    /// @notice View the current state of a game
    /// @param gameId The ID of the game to view
    /// @return The current game state
    function viewGame(uint256 gameId) external view returns (Game memory) {
        // Check if game exists
        if (gameId >= games.length) revert GameDoesNotExist(gameId, games.length);
        
        // Return the game state
        return games[gameId];
    }

    /// @notice Get games available to join
    /// @return Array of available games IDs
    function getAvailableGames() external view returns (uint256[] memory) {
        // Count available games first
        uint256 availableCount = 0;
        for (uint256 i = 0; i < games.length; i++) {
            // Check if player two slot is empty (game is available)
            if (games[i].playerTwo.playerAddress == address(0)) {
                availableCount++;
            }
        }

        // Create the array with the exact size needed
        uint256[] memory availableGames = new uint256[](availableCount);

        // Populate the array
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < games.length; i++) {
            if (games[i].playerTwo.playerAddress == address(0)) {
                availableGames[currentIndex] = games[i].gameId;
                currentIndex++;
            }
        }

        return availableGames;
    }
}
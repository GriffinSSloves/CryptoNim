// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/// @notice Create time-bound sessions others can mark themselves as attending.
contract Nim {
    /**
     * Base Types
     * int: int, uint, uint8, ... uint256
     * bool
     * address
     * bytes: bytes, bytes1, ... bytes32
     * string
     */

    uint MAX_ROWS = 10;
    uint MAX_STONES = 10;

    // Helper function to generate random number between 1 and x
    function random(uint x) internal view returns (uint) {
        // Use block data as a source of randomness
        // This is not perfectly random but sufficient for many use cases
        return uint(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            blockhash(block.number - 1),
            msg.sender
        ))) % x + 1;
    }

    // Structs are objects that contain nested variables
    struct Game {
        uint256 gameId;
        uint[] rows;
        bool playerOneTurn;
        Player playerOne;
        Player playerTwo;
        string winner;
        uint48 lastUpdatedAt;
    }

    struct Player {
        address playerAddress;
    }

    // Storage variables persist on contract and can be accessed anytime
    address public owner;


    /**
     * Mappings are key-value hashmaps
     *
     * conner => 2
     * xander => 0
     */
    // mapping(address attendee => uint256 total) public totalAttendence;

    /**
     * Arrays are mappings with length storage
     *
     * length = 2
     * 0 => Session({0, 1, 0})
     * 1 => Session({10, 20, 100})
     */
    Game[] public games;

    /**
     * Mappings can be nested for multiple independent keys
     *
     * 0 => conner => true
     * 1 => conner => true
     */
    // mapping(uint256 sessionId => mapping(address attendee => bool attended)) public hasAttended;

    /**
     * Events or "logs" can be emitted to enable easier offchain parsing of state changes
     * Events can have named arguments
     */

    event GameCreated(uint256 gameId, address creator);
    event GameJoined(uint256 gameId, address joiner);
    event TurnPlayed(uint256 gameId, address player, uint256 row, uint256 stones);
    event GameEnded(uint256 gameId, address winner);


    /**
     * Errors can provide more context about why an execution failed
     * Errors can have named arguments
     */
    error GameDoesNotExist(uint256 gameId, uint256 totalGames);
    error GameAlreadyHasTwoPlayers(uint256 gameId, address playerOne, address playerTwo);
    error CannotJoinOwnGame(uint256 gameId, address player);



    // Constructors are run only when deploying a contract
    constructor(address owner_) {
        owner = owner_;
    }

    /**
     * Function structure: name, arguments, visibility, mutability, return type
     *
     * Visibility defines who can call
     *
     * internal: only this contract
     * external: only outside of this contract
     * public: both internal and external
     * private: internal but excludes inheriting contracts
     *
     * Mutability defines access to storage
     *
     * [none]: read+write access
     * view: read-only access
     * pure: no access
     */

    /// @notice Get the total number of games created.
    function totalGames() external view returns (uint256) {
        return games.length;
    }

    function initializeGame() external returns (Game memory) {
        // Generate random number of rows between 1 and MAX_ROWS
        uint numRows = random(MAX_ROWS);
        
        // Create array for rows
        uint[] memory rowStones = new uint[](numRows);
        
        // Fill each row with random number of stones between 1 and MAX_STONES
        for (uint i = 0; i < numRows; i++) {
            rowStones[i] = random(MAX_STONES);
        }

        // Create new game
        Game memory game = Game({
            gameId: games.length,
            rows: rowStones,
            playerOneTurn: true,
            playerOne: Player(msg.sender),
            playerTwo: Player(address(0)),
            winner: "",
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
        Game storage game = games[gameId];

        // Check if game exists
        if (gameId >= games.length) revert GameDoesNotExist(gameId, games.length);
        
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

        // Emit event
        emit GameJoined(gameId, msg.sender);

        // Return the updated game
        return game;
    }
}



using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;
using System.Numerics;
using TriviaGameLibrary.DTO;
using TriviaGameLibrary.Models;
using TriviaGameLibrary.Services;

namespace TriviaGameAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController(PlayerService playerService) : ControllerBase
    {
        //private readonly List<Player> _players;

        //public PlayerController()
        //{
        //    _players = [];
        //}

        //[HttpPost]
        //public IActionResult AddPlayers([FromBody] InitializeGameRequest request)
        //{
        //    // Validate input
        //    if (request.PlayerNames == null || request.PlayerNames.Count == 0 || request.PlayerNames.Count > 4)
        //    {
        //        return BadRequest("The number of players must be between 1 and 4.");
        //    }

        //    // Validate player names
        //    foreach (string playerName in request.PlayerNames)
        //    {
        //        if (string.IsNullOrWhiteSpace(playerName) || playerName.Length < 3 || playerName.Length > 20)
        //        {
        //            return BadRequest($"Player name '{playerName}' must be between 3-20 characters.");
        //        }
        //    }

        //    // Ensure no duplicate names
        //    if (request.PlayerNames.Select(name => name.ToLower()).Distinct().Count() != request.PlayerNames.Count)
        //    {
        //        return BadRequest("Player names must be unique.");
        //    }

        //    // Clear and initialize players
        //    _players.Clear();
        //    foreach (string playerName in request.PlayerNames)
        //    {
        //        _players.Add(new Player(playerName));
        //    }

        //    return Created("api/players", new { Players = _players });
        //}

        private readonly PlayerService _playerService = playerService;

        [HttpPost("addPlayers")]
        public IActionResult AddPlayers([FromBody] InitializeGameRequest request)
        {
            // Validate input
            if (request.PlayerNames == null || request.PlayerNames.Count == 0 || request.PlayerNames.Count > 4)
            {
                return BadRequest("The number of players must be between 1 and 4.");
            }

            // Validate player names
            foreach (string playerName in request.PlayerNames)
            {
                if (string.IsNullOrWhiteSpace(playerName) || playerName.Length < 3 || playerName.Length > 20)
                {
                    return BadRequest($"Player name '{playerName}' must be between 3-20 characters.");
                }
            }

            // Ensure no duplicate names
            if (request.PlayerNames.Select(name => name.ToLower()).Distinct().Count() != request.PlayerNames.Count)
            {
                return BadRequest("Player names must be unique.");
            }

            // Add players via the service
            _playerService.AddPlayers(request.PlayerNames);

            return Created("api/players", new { Players = _playerService.GetPlayers() });
        }

        [HttpGet("getPlayers")]
        public IActionResult GetPlayers()
        {
            return Ok(_playerService.GetPlayers());
        }

    }

}

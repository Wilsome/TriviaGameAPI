using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TriviaGameLibrary.DTO;
using TriviaGameLibrary.Models;
using TriviaGameLibrary.Services;

namespace TriviaGameAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController(GameService gameService) : ControllerBase
    {
        private readonly GameService _gameService = gameService;

        [HttpPost("startGame")]
        public IActionResult StartGame()
        {
            try
            {
                // Initialize the game
                _gameService.InitializeGame();

                return Ok(new { Message = "Game started successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while starting the game.", Error = ex.Message });
            }
        }

        [HttpGet("currentTurn")]
        public IActionResult GetCurrentTurn()
        {
            try
            {
                if (_gameService.IsGameOver())
                {
                    var gameSummary = _gameService.GetGameSummary();
                    Console.WriteLine($"Game Summary: {JsonConvert.SerializeObject(gameSummary)}");

                    // Ensure it's included in the response
                    return Ok(new
                    {

                        GameSummary = gameSummary,
                        IsGameOver = true,
                        Message = "Game Over!",

                    });
                }
                // Deconstruct the three-element tuple returned by _gameService.GetCurrentTurn
                var (player, question, round) = _gameService.GetCurrentTurn();

                if (player == null || question == null)
                {
                    return Ok(new { Message = "Game Over!" });
                }

                var response = new
                {
                    Player = player.Name,
                    Question = question.QuestionText,
                    question.PossibleAnswers,
                    Round = round // Include the round in the response
                };

                Console.WriteLine($"Current Turn Response: {JsonConvert.SerializeObject(response)}");

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while retrieving the current turn.", Error = ex.Message });
            }
        }

        [HttpPost("nextTurn")]
        public IActionResult NextTurn()
        {
            try
            {
                if (_gameService.IsGameOver())
                {
                    var gameSummary = _gameService.GetGameSummary();
                    Console.WriteLine($"Game Summary: {JsonConvert.SerializeObject(gameSummary)}");

                    // Ensure it's included in the response
                    return Ok(new
                    {
                        
                        GameSummary = gameSummary,
                        IsGameOver = true,
                        Message = "Game Over!",

                    });
                }

                _gameService.AdvanceTurn();

                return Ok(new
                {
                    IsGameOver = false,
                    Message = "Turn advanced successfully!"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in nextTurn: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while advancing the turn.", Error = ex.Message });
            }
        }

        [HttpPost("submitAnswer")]
        public IActionResult SubmitAnswer([FromBody] AnswerSubmission submission)
        {
            try
            {
                // Call GameService and retrieve all values
                var (isCorrect, correctAnswer, updatedScore) = _gameService.ValidateAnswerAndUpdateScore(submission.PlayerName, submission.Answer);

                Console.WriteLine($"Score Returned to Controller: {updatedScore}"); // Log the returned score

                // Return API response
                return Ok(new
                {
                    IsCorrect = isCorrect,
                    CorrectAnswer = correctAnswer,
                    UpdatedScore = updatedScore, // Ensure the updated score is used here
                    Message = isCorrect ? "Correct!" : "Incorrect!"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while submitting the answer.", Error = ex.Message });
            }
        }


    }

}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TriviaGameLibrary.Models;
using TriviaGameLibrary.Services;

namespace TriviaGameAPI.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    //public class TriviaSetupController(TriviaService triviaService) : ControllerBase
    //{
    //    //dependency inject to be able to use the triviaservice methods. 
    //    private readonly TriviaService _triviaService = triviaService;

    //    [HttpPost]
    //    [Route("Setup")]
    //    public async Task<IActionResult> SetupTrivia([FromBody] TriviaSetupRequest request) 
    //    {
    //        try
    //        {
    //            // Use the TriviaService to fetch questions
    //            List<Question> questions = await _triviaService.FetchQuestionsAsync(request.NumberOfQuestions, request.Category, request.Difficulty, request.Type);

    //            // Return the questions as a JSON response
    //            return Ok(questions);
    //        }
    //        catch (Exception ex)
    //        {
    //            // Handle errors gracefully
    //            return StatusCode(500, new { Message = "An error occurred while fetching questions", Error = ex.Message });
    //        }
    //    }

    //}

    [Route("api/[controller]")]
    [ApiController]
    public class TriviaSetupController(TriviaService triviaService, QuestionService questionService) : ControllerBase
    {
        private readonly TriviaService _triviaService = triviaService;
        private readonly QuestionService _questionService = questionService;

        [HttpPost("Setup")]
        public async Task<IActionResult> SetupTrivia([FromBody] TriviaSetupRequest request)
        {
            try
            {
                // Fetch questions from the TriviaService
                List<Question> questions = await _triviaService.FetchQuestionsAsync(
                    request.NumberOfQuestions,
                    request.Category,
                    request.Difficulty,
                    request.Type
                );

                // Store the questions in QuestionService for later access
                _questionService.StoreQuestions(questions);

                // Return the questions to the frontend if needed
                return Ok(new { Message = "Trivia setup complete!", Questions = questions });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while fetching questions.", Error = ex.Message });
            }
        }
    }

}

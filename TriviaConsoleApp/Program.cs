using System;
using System.Net.Http;
using TriviaGameLibrary;
using TriviaGameLibrary.Models;
using TriviaGameLibrary.Services;

class Program
{
    static async Task Main(string[] args)
    {
        
        HttpClient client = new();
        TriviaService triviaService = new(client);
        AnswerValidationService answerValidationService = new();
        ScoringService scoringService = new();
        TurnService turnService = new(answerValidationService, scoringService);

        Game game = new(turnService, triviaService);
        await game.StartGameAsync();
        game.RunGame();
    }
}
    
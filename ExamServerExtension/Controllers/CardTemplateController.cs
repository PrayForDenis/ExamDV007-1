using System;
using System.Web.Http;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Helpers;
using DocsVision.Platform.WebClient.Models;
using DocsVision.Platform.WebClient.Models.Generic;
using ExamServerExtension.Services;
using Newtonsoft.Json.Linq;

namespace ExamServerExtension.Controllers
{
    public class CardTemplateController : ApiController
    {
        private readonly ICurrentObjectContextProvider _currentObjectContextProvider;
        private readonly ICardTemplateService _cardTemplateService;

        public CardTemplateController(ICurrentObjectContextProvider currentObjectContextProvider,
            ICardTemplateService cardTemplateService)
        {
            _currentObjectContextProvider = currentObjectContextProvider;
            _cardTemplateService = cardTemplateService;
        }

        [HttpGet]
        public CommonResponse GetIsTemplateCardInfo(Guid cardId)
        {
            var sessionContext = _currentObjectContextProvider.GetOrCreateCurrentSessionContext();

            var response = _cardTemplateService.IsTemplateCard(sessionContext, cardId);

            var responseModel = new CommonResponse<bool>();
            responseModel.InitializeSuccess(response);

            return responseModel;
        }

        [HttpPost]
        public CommonResponse SetIsTemplateCardValue([FromBody]JObject data)
        {
            var sessionContext = _currentObjectContextProvider.GetOrCreateCurrentSessionContext();

            Guid cardId = data["cardId"].ToObject<Guid>();
            bool value = data["value"].ToObject<bool>();

            _cardTemplateService.SetIsTemplateCard(sessionContext, cardId, value);

            var responseModel = new CommonResponse();
            var responseTimestamp = new CommonResponseTimestamp
            {
                CardId = cardId,
                Timestamp = sessionContext.AdvancedCardManager.GetCardTimestamp(cardId)
            };
            responseModel.InitializeSuccess(responseTimestamp);

            return responseModel;
        }
    }
}
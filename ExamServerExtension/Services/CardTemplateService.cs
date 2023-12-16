using System;
using System.Linq;
using DocsVision.BackOffice.CardLib.CardDefs;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.WebClient;

namespace ExamServerExtension.Services
{
    public class CardTemplateService : ICardTemplateService
    {
        public bool IsTemplateCard(SessionContext sessionContext, Guid cardId)
        {
            var cardData = sessionContext.AdvancedCardManager.GetCardData(cardId);

            return cardData.IsTemplate;
        }

        public void SetIsTemplateCard(SessionContext sessionContext, Guid cardId, bool value)
        {
            var cardData = sessionContext.AdvancedCardManager.GetCardData(cardId);

            cardData.BeginUpdate();
            try
            {
                cardData.IsTemplate = !value;
                cardData.EndUpdate();
            }
            catch
            {
                cardData.CancelUpdate();
                throw;
            }
        }
    }
}
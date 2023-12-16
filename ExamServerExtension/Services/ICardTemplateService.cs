using System;
using DocsVision.Platform.WebClient;

namespace ExamServerExtension.Services
{
    public interface ICardTemplateService
    {
        bool IsTemplateCard(SessionContext sessionContext, Guid cardId);

        void SetIsTemplateCard(SessionContext sessionContext, Guid cardId, bool value);
    }
}
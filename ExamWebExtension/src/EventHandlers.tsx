import { Layout } from "@docsvision/webclient/System/Layout";
import { ICancelableEventArgs } from "@docsvision/webclient/System/ICancelableEventArgs";
import { ICardStateChangingEventArgs } from "@docsvision/webclient/System/ICardStateChangingEventArgs";
import { $UrlResolver } from "@docsvision/webclient/System/$UrlResolver";
import { UrlResolver } from "@docsvision/webclient/System/UrlResolver";
import { $RequestManager, IRequestManager } from "@docsvision/webclient/System/$RequestManager";
import { $RouterNavigation } from "@docsvision/webclient/System/$Router";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";

export async function getIsTemplateCardInfo(requestManager: IRequestManager, urlResolver: UrlResolver, cardId: string): Promise<boolean> {
    let url = urlResolver.resolveApiUrl("GetIsTemplateCardInfo", "CardTemplate");
    url += "?cardId=" + cardId;
    return requestManager.get<boolean>(url);
}

export async function setIsTemplateCardValue(requestManager: IRequestManager, urlResolver: UrlResolver, cardId: string, value: boolean): Promise<{}> {
    let url = urlResolver.resolveApiUrl("SetIsTemplateCardValue", "CardTemplate");
    let postData = {
        cardId: cardId,
        value: value
    }
    return requestManager.post(url, JSON.stringify(postData));
}
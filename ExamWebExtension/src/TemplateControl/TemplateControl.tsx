import { BaseControlParams, BaseControlState, BaseControl } from "@docsvision/webclient/System/BaseControl";
import { rw } from "@docsvision/webclient/System/Readwrite";
import { r } from "@docsvision/webclient/System/Readonly";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";
import { handler } from "@docsvision/webclient/System/Handler";
import { getBindingResult } from "@docsvision/webclient/System/GetBindingResult";
import { ControlImpl } from "@docsvision/webclient/System/ControlImpl";
import React from "react";
import { getIsTemplateCardInfo, setIsTemplateCardValue } from "../EventHandlers";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { $UrlResolver } from "@docsvision/webclient/System/$UrlResolver";
import { $Layout } from "@docsvision/webclient/System/$Layout";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";

export class TemplateControlParams extends BaseControlParams {
    standardCssClass?: string = "template-control";

    @rw imageHeight: number;

    @rw imageWidth: number;

    @r isTemplate: boolean;

    @r binding: IBindingResult<boolean>;

    @r isBindingOperationAvailable: boolean;

    @r services?: $RequestManager & $UrlResolver & $Layout;
}

export interface TemplateControlState extends BaseControlState, TemplateControlParams {
}

export class TemplateControl extends BaseControl<TemplateControlParams, TemplateControlState> {
    constructor(params: TemplateControlParams) {
        super(params);

        this.onClick = this.onClick.bind(this);
    }

    @handler("binding")
    set isBindingOperationAvailable(binding: IBindingResult<boolean>) {
        this.state.isBindingOperationAvailable = !binding || this.layout.editOperations.available(binding.editOperation);
        this.state.isTemplate = binding.value;
        this.state.binding = binding;
    }

    protected getBindings(): IBindingResult<string>[] {
        return [getBindingResult(this.state.binding, this.state.isTemplate, "Является шаблоном")];
    }

    async onClick() {
        if (this.state.isBindingOperationAvailable) {
            await setIsTemplateCardValue(this.state.services.requestManager, this.state.services.urlResolver, 
                this.state.services.layout.cardInfo.id, this.state.isTemplate);

            this.setState({
                isTemplate: await getIsTemplateCardInfo(this.state.services.requestManager, this.state.services.urlResolver, this.state.services.layout.cardInfo.id)
            });
        }
        else
            MessageBox.ShowInfo("У вас недостаточно прав для перевода карточки в шаблон!");
    }

    createParams() {
        return new TemplateControlParams();
    }

    createImpl() {
        return new ControlImpl(this.props, this.state, this.renderControl.bind(this));
    }

    async componentDidMount() {
        super.componentDidMount();

        this.setState({
            isTemplate: await getIsTemplateCardInfo(this.state.services.requestManager, this.state.services.urlResolver, this.state.services.layout.cardInfo.id)
        });
    }

    renderControl() {
        if (this.state.isBindingOperationAvailable) {
            if (this.state.isTemplate)
                this.state.customCssClasses = "is-template";
            else
                this.state.customCssClasses = "no-template";
        }
        else
            this.state.customCssClasses = "disable";

        return (
            <div onClick={this.onClick}>
                <span style={{width: this.state.imageWidth, height: this.state.imageHeight}}>{this.state.isTemplate ? "Шаблон" : "Не шаблон"}</span>
            </div>
        )
    }
}
define(['@docsvision/webclient/System/ExtensionManager', 'tslib', '@docsvision/webclient/System/BaseControl', '@docsvision/webclient/System/Readwrite', '@docsvision/webclient/System/Readonly', '@docsvision/webclient/System/Handler', '@docsvision/webclient/System/GetBindingResult', '@docsvision/webclient/System/ControlImpl', 'react', '@docsvision/webclient/Helpers/MessageBox/MessageBox'], function (ExtensionManager, tslib, BaseControl, Readwrite, Readonly, Handler, GetBindingResult, ControlImpl, React, MessageBox) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    function getIsTemplateCardInfo(requestManager, urlResolver, cardId) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var url;
            return tslib.__generator(this, function (_a) {
                url = urlResolver.resolveApiUrl("GetIsTemplateCardInfo", "CardTemplate");
                url += "?cardId=" + cardId;
                return [2 /*return*/, requestManager.get(url)];
            });
        });
    }
    function setIsTemplateCardValue(requestManager, urlResolver, cardId, value) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var url, postData;
            return tslib.__generator(this, function (_a) {
                url = urlResolver.resolveApiUrl("SetIsTemplateCardValue", "CardTemplate");
                postData = {
                    cardId: cardId,
                    value: value
                };
                return [2 /*return*/, requestManager.post(url, JSON.stringify(postData))];
            });
        });
    }

    var EventHandlers = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getIsTemplateCardInfo: getIsTemplateCardInfo,
        setIsTemplateCardValue: setIsTemplateCardValue
    });

    var TemplateControlParams = /** @class */ (function (_super) {
        tslib.__extends(TemplateControlParams, _super);
        function TemplateControlParams() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.standardCssClass = "template-control";
            return _this;
        }
        tslib.__decorate([
            Readwrite.rw
        ], TemplateControlParams.prototype, "imageHeight", void 0);
        tslib.__decorate([
            Readwrite.rw
        ], TemplateControlParams.prototype, "imageWidth", void 0);
        tslib.__decorate([
            Readonly.r
        ], TemplateControlParams.prototype, "isTemplate", void 0);
        tslib.__decorate([
            Readonly.r
        ], TemplateControlParams.prototype, "binding", void 0);
        tslib.__decorate([
            Readonly.r
        ], TemplateControlParams.prototype, "isBindingOperationAvailable", void 0);
        tslib.__decorate([
            Readonly.r
        ], TemplateControlParams.prototype, "services", void 0);
        return TemplateControlParams;
    }(BaseControl.BaseControlParams));
    var TemplateControl = /** @class */ (function (_super) {
        tslib.__extends(TemplateControl, _super);
        function TemplateControl(params) {
            var _this = _super.call(this, params) || this;
            _this.onClick = _this.onClick.bind(_this);
            return _this;
        }
        Object.defineProperty(TemplateControl.prototype, "isBindingOperationAvailable", {
            set: function (binding) {
                this.state.isBindingOperationAvailable = !binding || this.layout.editOperations.available(binding.editOperation);
                this.state.isTemplate = binding.value;
                this.state.binding = binding;
            },
            enumerable: false,
            configurable: true
        });
        TemplateControl.prototype.getBindings = function () {
            return [GetBindingResult.getBindingResult(this.state.binding, this.state.isTemplate, "Является шаблоном")];
        };
        TemplateControl.prototype.onClick = function () {
            return tslib.__awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return tslib.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!this.state.isBindingOperationAvailable) return [3 /*break*/, 3];
                            return [4 /*yield*/, setIsTemplateCardValue(this.state.services.requestManager, this.state.services.urlResolver, this.state.services.layout.cardInfo.id, this.state.isTemplate)];
                        case 1:
                            _c.sent();
                            _a = this.setState;
                            _b = {};
                            return [4 /*yield*/, getIsTemplateCardInfo(this.state.services.requestManager, this.state.services.urlResolver, this.state.services.layout.cardInfo.id)];
                        case 2:
                            _a.apply(this, [(_b.isTemplate = _c.sent(),
                                    _b)]);
                            return [3 /*break*/, 4];
                        case 3:
                            MessageBox.MessageBox.ShowInfo("У вас недостаточно прав для перевода карточки в шаблон!");
                            _c.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        TemplateControl.prototype.createParams = function () {
            return new TemplateControlParams();
        };
        TemplateControl.prototype.createImpl = function () {
            return new ControlImpl.ControlImpl(this.props, this.state, this.renderControl.bind(this));
        };
        TemplateControl.prototype.componentDidMount = function () {
            return tslib.__awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return tslib.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _super.prototype.componentDidMount.call(this);
                            _a = this.setState;
                            _b = {};
                            return [4 /*yield*/, getIsTemplateCardInfo(this.state.services.requestManager, this.state.services.urlResolver, this.state.services.layout.cardInfo.id)];
                        case 1:
                            _a.apply(this, [(_b.isTemplate = _c.sent(),
                                    _b)]);
                            return [2 /*return*/];
                    }
                });
            });
        };
        TemplateControl.prototype.renderControl = function () {
            if (this.state.isBindingOperationAvailable) {
                if (this.state.isTemplate)
                    this.state.customCssClasses = "is-template";
                else
                    this.state.customCssClasses = "no-template";
            }
            else
                this.state.customCssClasses = "disable";
            return (React__default['default'].createElement("div", { onClick: this.onClick },
                React__default['default'].createElement("span", { style: { width: this.state.imageWidth, height: this.state.imageHeight } }, this.state.isTemplate ? "Шаблон" : "Не шаблон")));
        };
        tslib.__decorate([
            Handler.handler("binding")
        ], TemplateControl.prototype, "isBindingOperationAvailable", null);
        return TemplateControl;
    }(BaseControl.BaseControl));

    // Главная входная точка всего расширения
    // Данный файл должен импортировать прямо или косвенно все остальные файлы, 
    // чтобы rollup смог собрать их все в один бандл.
    // Регистрация расширения позволяет корректно установить все
    // обработчики событий, сервисы и прочие сущности web-приложения.
    ExtensionManager.extensionManager.registerExtension({
        name: "Exam web extension",
        version: "1.0",
        controls: [
            { controlTypeName: "TemplateControl", constructor: TemplateControl }
        ],
        globalEventHandlers: [EventHandlers]
    });

});
//# sourceMappingURL=extension.js.map

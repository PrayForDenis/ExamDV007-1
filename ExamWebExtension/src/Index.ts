import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import * as EventHandlers from "./EventHandlers";
import { TemplateControl } from "./TemplateControl/TemplateControl";


// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "Exam web extension",
    version: "1.0",
    controls: [
        { controlTypeName: "TemplateControl", constructor: TemplateControl }
    ],
    globalEventHandlers: [EventHandlers]
})
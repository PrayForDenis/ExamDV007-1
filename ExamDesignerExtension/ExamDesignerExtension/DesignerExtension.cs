using System;
using System.Collections.Generic;
using System.Resources;
using System.Windows.Controls;
using DocsVision.Platform.Tools.LayoutEditor.Extensibility;
using DocsVision.Platform.Tools.LayoutEditor.Helpers;
using DocsVision.Platform.Tools.LayoutEditor.Infrostructure;
using DocsVision.Platform.Tools.LayoutEditor.ObjectModel.Descriptions;

namespace ExamDesignerExtension.Extension
{
    /// <summary>
    /// Представляет собой пример расширения для редактора разметок
    /// </summary>
    class ExamDesignerExtension : WebLayoutsDesignerExtension
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="ExamDesignerExtension"/>
        /// </summary>
        /// <param name="provider">Сервис-провайдер</param>
        public ExamDesignerExtension(IServiceProvider provider)
            : base(provider)
        {
        }

        /// <summary>
        /// Возвращает словарь ключ/описание свойства, которые будут использоваться в пользовательских контролах
        /// </summary>
        protected override Dictionary<string, PropertyDescription> GetPropertyDescriptions()
        {
            return new Dictionary<string, PropertyDescription>
            {
                { Constants.Template.ImageWidth, GetImageWidthPropertyDescription() },
                { Constants.Template.ImageHeight, GetImageHeightPropertyDescription() }
            };
        }

        /// <summary>
        /// Возвращает описание пользовательских контролов
        /// описание контрола PartnerLink выполнено альтернативным способом и содержится в каталоге xml
        /// </summary>
        protected override List<ControlTypeDescription> GetControlTypeDescriptions()
        {
            return new List<ControlTypeDescription>
            {
                GetTemplateControlDescription()
            };
        }

        /// <summary>
        /// Возвращает ResourceManager этого расширения (расширяет словарь локализации конструктора разметок, не путать с окном Localization конструктора разметок)
        /// </summary>
        protected override List<ResourceManager> GetResourceManagers()
        {
            return new List<ResourceManager>
            {
                Resources.ResourceManager
            };
        }

        private ControlTypeDescription GetTemplateControlDescription()
        {
            var standardCssClassPropertyDescription = PropertyFactory.GetStandardCssClassProperty();
            standardCssClassPropertyDescription.DefaultValue = Constants.Template.ControlDefaultStyle;

            var controlTypeDescription = new ControlTypeDescription(Constants.Template.ControlName)
            {
                DisplayName = Resources.Control_Template_DisplayName,
                ControlGroupDisplayName = Constants.Template.ControlGroupDisplayName,
                PropertyDescriptions =
                {
                    standardCssClassPropertyDescription,
                    PropertyFactory.GetNameProperty(),
                    PropertyFactory.GetDataSourceProperty(),
                    PropertyFactory.GetDataFieldProperty(),
                    PropertyFactory.GetBindingProperty(),
                    PropertyFactory.GetEditOperationProperty(),
                    PropertyFactory.Create(Constants.Template.ImageWidth),
                    PropertyFactory.Create(Constants.Template.ImageHeight)
                }
            };

            return controlTypeDescription;
        }

        private PropertyDescription GetImageWidthPropertyDescription()
        {
            var propertyDescription = new PropertyDescription
            {
                Type = typeof(int),
                Name = Constants.Template.ImageWidth,
                Category = PropertyCategoryConstants.AppearanceCategory,
                DisplayName = Resources.Property_ImageWidth_DisplayName,
                DefaultValue = 300
            };

            return propertyDescription;
        }

        private PropertyDescription GetImageHeightPropertyDescription()
        {
            var propertyDescription = new PropertyDescription
            {
                Type = typeof(int),
                Name = Constants.Template.ImageHeight,
                Category = PropertyCategoryConstants.AppearanceCategory,
                DisplayName = Resources.Property_ImageHeight_DisplayName,
                DefaultValue = 300
            };

            return propertyDescription;
        }
    }
}

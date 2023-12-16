using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Resources;
using System.Web.Http.Controllers;
using System.Web.Mvc;
using Autofac;
using DocsVision.BackOffice.WebClient.Services;
using DocsVision.WebClient.Extensibility;
using DocsVision.WebClientLibrary.ObjectModel.Services.BindingConverters;
using DocsVision.WebClientLibrary.ObjectModel.Services.BindingResolvers;
using DocsVision.WebClientLibrary.ObjectModel.Services.LayoutModel;
using ExamServerExtension.Controllers;
using ExamServerExtension.Services;

namespace ExamServerExtension
{
    /// <summary>
    /// Задаёт описание расширения для WebClient, которое задано в текущей сборке
    /// </summary>
    public class ExamServerExtension : WebClientExtension
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="ExamServerExtension" />
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public ExamServerExtension(IServiceProvider serviceProvider)
            : base(serviceProvider)
        {
        }

        /// <summary>
        /// Регистрация типов в IoC контейнере
        /// </summary>
        /// <param name="containerBuilder"></param>
        public override void InitializeContainer(ContainerBuilder containerBuilder)
        {
            // Теперь регистрация сервисов и других объектов ВК осуществляется в едином методе - InitializeContainer, 
            // примеры регистрации различных типов ВК представлены ниже
            containerBuilder.RegisterType<CardTemplateService>().As<ICardTemplateService>().SingleInstance();
            // containerBuilder.RegisterOrderedType<YourBindingConverterType, IBindingConverter>();
            // containerBuilder.RegisterOrderedType<YourBindingResolverType, IBindingResolver>();            
            // containerBuilder.RegisterOrderedType<YourControlResolverType, IControlResolver>();
            // containerBuilder.RegisterOrderedType<YourPropertyResolverType, IPropertyResolver>();  
            // containerBuilder.RegisterType<YourCardLifeCycle>().Keyed<ICardLifeCycle>(CardTypeID).SingleInstance();
            // containerBuilder.RegisterType<YourRowLifeCycle>().Keyed<IRowLifeCycle>(SectionID).SingleInstance(); 
        }
    }
}
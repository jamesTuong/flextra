"use client";

import { Languages, Sparkles, Type } from "lucide-react";
import { useTranslations } from "next-intl";

export function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    {
      icon: Type,
      title: t("steps.enterText.title"),
      description: t("steps.enterText.description"),
    },
    {
      icon: Languages,
      title: t("steps.selectLanguages.title"),
      description: t("steps.selectLanguages.description"),
    },
    {
      icon: Sparkles,
      title: t("steps.getTranslation.title"),
      description: t("steps.getTranslation.description"),
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  {index + 1}
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connection lines for desktop */}
        <div className="relative mx-auto hidden max-w-4xl md:block">
          <div className="absolute top-8 right-1/6 left-1/6 h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700"></div>
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  ArrowRightLeft,
  Copy,
  Globe,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function Features() {
  const t = useTranslations("Features");

  const features = [
    {
      icon: Globe,
      title: t("items.languages.title"),
      description: t("items.languages.description"),
    },
    {
      icon: Zap,
      title: t("items.aiPowered.title"),
      description: t("items.aiPowered.description"),
    },
    {
      icon: ArrowRightLeft,
      title: t("items.instantSwap.title"),
      description: t("items.instantSwap.description"),
    },
    {
      icon: Copy,
      title: t("items.easyCopy.title"),
      description: t("items.easyCopy.description"),
    },
    {
      icon: Shield,
      title: t("items.privacyFirst.title"),
      description: t("items.privacyFirst.description"),
    },
    {
      icon: Smartphone,
      title: t("items.mobileFriendly.title"),
      description: t("items.mobileFriendly.description"),
    },
  ];

  return (
    <section className="bg-white py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-100 p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 transition-transform duration-300 group-hover:scale-110 dark:from-blue-900 dark:to-purple-900">
                <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

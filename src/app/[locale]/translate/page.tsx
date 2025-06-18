"use client";

import { useTranslations } from "next-intl";

import { TranslationForm } from "@/components/translate-form";

export default function TranslatePage() {
  // Enable static rendering

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-4xl">
        <TranslatePageContent />
      </div>
    </div>
  );
}

function TranslatePageContent() {
  const t = useTranslations("Translator");

  return (
    <>
      <div className="mb-8 pt-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{t("subtitle")}</p>
      </div>
      <TranslationForm />
    </>
  );
}

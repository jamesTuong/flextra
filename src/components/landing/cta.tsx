"use client";

import { ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export function CTA() {
  const t = useTranslations("CTA");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 py-20 dark:from-blue-800 dark:to-purple-900">
      <div className="bg-grid-white/10 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.6))]" />

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white">
            <Globe className="h-4 w-4" />
            {t("badge")}
          </div>

          <h2 className="mb-6 text-3xl leading-tight font-bold text-white lg:text-5xl">
            {t("title")}
          </h2>

          <p className="mb-8 text-xl leading-relaxed text-blue-100 dark:text-blue-200">
            {t("subtitle")}
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href={`/${locale}/translate`}>
                {t("primaryButton")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              {t("secondaryButton")}
            </Button>
          </div>

          <p className="mt-6 text-sm text-blue-200 dark:text-blue-300">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
}

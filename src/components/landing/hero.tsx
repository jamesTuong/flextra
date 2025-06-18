"use client";

import { ArrowRight, Globe, Shield,Zap } from "lucide-react";
import Link from "next/link";
import { useLocale,useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decoration */}
      <div className="bg-grid-slate-100 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.6))]" />

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              <Zap className="h-4 w-4" />
              AI-Powered Translation
            </div>

            <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 lg:text-6xl dark:text-white">
              {t("title")}
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href={`/${locale}/translate`} className="dark:text-white">
                  {t("cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg">
                {t("viewDemo")}
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 border-t border-gray-200 pt-8 lg:justify-start dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  15+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t("stats.languages")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  AI
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t("stats.powered")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  Free
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t("stats.free")}
                </div>
              </div>
            </div>
          </div>

          {/* Right content - App Preview */}
          <div className="relative">
            <div className="relative rotate-2 transform rounded-2xl bg-white p-6 shadow-2xl transition-transform duration-300 hover:rotate-0 dark:bg-gray-800">
              <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-blue-900 dark:to-indigo-900">
                <div className="mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Flexibal Translation
                  </span>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-white p-3 dark:bg-gray-700">
                    <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                      English
                    </div>
                    <div className="text-sm dark:text-gray-200">
                      Hello, how are you?
                    </div>
                  </div>
                  <div className="rounded-lg bg-white p-3 dark:bg-gray-700">
                    <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                      Vietnamese
                    </div>
                    <div className="text-sm dark:text-gray-200">
                      Xin chào, bạn khỏe không?
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Translate
                </Button>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
              <Shield className="mr-1 inline h-4 w-4" />
              Secure
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              <Zap className="mr-1 inline h-4 w-4" />
              Instant
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

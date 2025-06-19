"use client";

import { Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

export function Header() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, "");
    window.location.replace(`/${newLocale}${currentPath}`);
  };

  const navigation = [
    { name: t("home"), href: `/${locale}` },
    { name: t("translator"), href: `/${locale}/translate` },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-black dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="flex h-8 items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Fletra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-medium transition-colors hover:text-blue-600 dark:text-white ${
                  pathname === item.href
                    ? "font-bold text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* Language Selector */}
            <Select value={locale} onValueChange={handleLanguageChange}>
              <SelectTrigger className="h-9 w-48">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span>
                      {languages.find((lang) => lang.code === locale)?.flag}
                    </span>
                    <span className="hidden sm:inline">
                      {languages.find((lang) => lang.code === locale)?.name}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    <div className="flex items-center gap-2">
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    pathname === item.href ? "text-blue-600" : "text-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

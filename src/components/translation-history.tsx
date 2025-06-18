"use client";

import { formatDistanceToNow } from "date-fns";
import {
  ArrowRightLeft,
  Clock,
  Copy,
  History,
  RotateCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import {
  type TranslationHistoryItem,
  useTranslationHistoryStore,
} from "@/store/translation-history-store";

interface TranslationHistoryProps {
  onSelectTranslation?: (item: TranslationHistoryItem) => void;
}

export function TranslationHistory({
  onSelectTranslation,
}: TranslationHistoryProps) {
  const t = useTranslations("History");
  const { history, removeFromHistory, clearHistory, searchHistory } =
    useTranslationHistoryStore();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredHistory = searchHistory(searchQuery);

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: t("copied"),
        description: t("copiedDescription"),
      });
    } catch {
      toast({
        title: "Error",
        description: t("copyFailed"),
        variant: "destructive",
      });
    }
  };

  const handleSelectTranslation = (item: TranslationHistoryItem) => {
    onSelectTranslation?.(item);
    setIsOpen(false);
    toast({
      title: t("restored"),
      description: t("restoredDescription"),
    });
  };

  const handleClearAll = () => {
    clearHistory();
    toast({
      title: t("cleared"),
      description: t("clearedDescription"),
    });
  };

  const getLanguageName = (code: string) => {
    const languages: Record<string, string> = {
      en: "English",
      vi: "Tiếng Việt",
      zh: "中文",
      es: "Español",
      fr: "Français",
      de: "Deutsch",
      it: "Italiano",
      pt: "Português",
      ru: "Русский",
      ja: "日本語",
      ko: "한국어",
      ar: "العربية",
      hi: "हिन्दी",
      th: "ไทย",
      tr: "Türkçe",
    };
    return languages[code] || code.toUpperCase();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="h-4 w-4" />
          <span className="hidden sm:inline">{t("title")}</span>
          {history.length > 0 && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
              {history.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="space-y-4">
          <SheetTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            {t("title")}
          </SheetTitle>

          {/* Search */}
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 transform p-0"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Clear All Button */}
          {history.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4" />
              {t("clearAll")}
            </Button>
          )}
        </SheetHeader>

        <ScrollArea className="-mx-6 mt-6 flex-1 px-6">
          {filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <History className="mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                {history.length === 0 ? t("emptyTitle") : t("noResults")}
              </h3>
              <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
                {history.length === 0
                  ? t("emptyDescription")
                  : t("noResultsDescription")}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
                >
                  {/* Language badges and timestamp */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getLanguageName(item.sourceLang)}
                      </Badge>
                      <ArrowRightLeft className="h-3 w-3 text-gray-400" />
                      <Badge variant="outline" className="text-xs">
                        {getLanguageName(item.targetLang)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </div>
                  </div>

                  {/* Translation content */}
                  <div className="mb-3 space-y-2">
                    <div className="text-sm">
                      <div className="line-clamp-2 text-gray-600 dark:text-gray-300">
                        {item.sourceText}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="line-clamp-2 font-medium text-gray-900 dark:text-white">
                        {item.translatedText}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSelectTranslation(item)}
                      className="h-7 gap-1 text-xs"
                    >
                      <RotateCcw className="h-3 w-3" />
                      {t("restore")}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyText(item.translatedText)}
                      className="h-7 gap-1 text-xs"
                    >
                      <Copy className="h-3 w-3" />
                      {t("copy")}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromHistory(item.id)}
                      className="h-7 gap-1 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950"
                    >
                      <Trash2 className="h-3 w-3" />
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

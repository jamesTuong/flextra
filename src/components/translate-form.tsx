"use client";

import { ArrowRightLeft, Copy, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { DefinitionsSection } from "@/components/definitions-section";
import { TranslationHistory } from "@/components/translation-history";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getDefinitions, translateText } from "@/lib/translate";
import {
  type TranslationHistoryItem,
  useTranslationHistoryStore,
} from "@/store/translation-history-store";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "vi", name: "Vietnamese" },
  { code: "th", name: "Thai" },
  { code: "tr", name: "Turkish" },
];

export function TranslationForm() {
  const t = useTranslations("Translator");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("vi");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [definitions, setDefinitions] = useState<any>(null);
  const { addToHistory } = useTranslationHistoryStore();

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "Error",
        description: t("errors.enterText"),
        variant: "destructive",
      });
      return;
    }

    if (sourceLang === targetLang) {
      toast({
        title: "Error",
        description: t("errors.differentLanguages"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const [result, definitionsResult] = await Promise.all([
        translateText(sourceText, sourceLang, targetLang),
        getDefinitions(sourceText, sourceLang),
      ]);
      setTranslatedText(result);
      setDefinitions(definitionsResult);
      addToHistory(sourceText, result, sourceLang, targetLang);
    } catch {
      toast({
        title: "Translation Error",
        description: t("errors.translationFailed"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: t("success.copied"),
        description: t("success.copiedDescription"),
      });
    } catch {
      toast({
        title: "Error",
        description: t("errors.copyFailed"),
        variant: "destructive",
      });
    }
  };

  const handleSelectFromHistory = (item: TranslationHistoryItem) => {
    setSourceText(item.sourceText);
    setTranslatedText(item.translatedText);
    setSourceLang(item.sourceLang);
    setTargetLang(item.targetLang);
    setDefinitions(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <TranslationHistory onSelectTranslation={handleSelectFromHistory} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Source Text */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t("from")}</span>
              <Select value={sourceLang} onValueChange={setSourceLang}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={t("placeholders.input")}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="min-h-32 resize-none"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {sourceText.length} {t("characters")}
              </span>
              {sourceText && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(sourceText)}
                >
                  <Copy className="mr-1 h-4 w-4" />
                  {t("buttons.copy")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Target Text */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t("to")}</span>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={t("placeholders.output")}
              value={translatedText}
              readOnly
              className="min-h-32 resize-none bg-gray-50 dark:bg-gray-700"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {translatedText.length} {t("characters")}
              </span>
              {translatedText && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(translatedText)}
                >
                  <Copy className="mr-1 h-4 w-4" />
                  {t("buttons.copy")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex justify-center gap-4 md:col-span-2">
          <Button
            variant="outline"
            onClick={handleSwapLanguages}
            disabled={isLoading}
          >
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            {t("buttons.swap")}
          </Button>

          <Button
            onClick={handleTranslate}
            disabled={isLoading || !sourceText.trim()}
            className="px-8"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("buttons.translating")}
              </>
            ) : (
              t("buttons.translate")
            )}
          </Button>
        </div>
      </div>
      {definitions && (
        <div className="mt-8">
          <DefinitionsSection definitions={definitions} />
        </div>
      )}
    </div>
  );
}

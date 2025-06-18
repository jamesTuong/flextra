"use client";

import { BookOpen, MessageSquare,Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Definition {
  partOfSpeech: string;
  definitions: string[];
}

interface DefinitionsData {
  word: string;
  pronunciation: string;
  definitions: Definition[];
  examples: string[];
}

interface DefinitionsSectionProps {
  definitions: DefinitionsData;
}

export function DefinitionsSection({ definitions }: DefinitionsSectionProps) {
  const t = useTranslations("Definitions");

  const playPronunciation = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(definitions.word);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Definitions */}
      <Card className="dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            {t("title", { word: definitions.word })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-lg font-semibold dark:text-white">
                {definitions.word}
              </span>
              <span className="font-mono text-gray-500 dark:text-gray-400">
                /{definitions.pronunciation}/
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={playPronunciation}
                className="h-8 w-8 p-1"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {definitions.definitions.map((def, index) => (
              <div key={index}>
                <Badge
                  variant="secondary"
                  className="mb-2 dark:bg-gray-700 dark:text-gray-300"
                >
                  {def.partOfSpeech}
                </Badge>
                <ol className="ml-2 list-inside list-decimal space-y-2">
                  {def.definitions.map((definition, defIndex) => (
                    <li
                      key={defIndex}
                      className="leading-relaxed text-gray-700 dark:text-gray-300"
                    >
                      {definition}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Examples in Context */}
      <Card className="dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
            {t("examplesTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-inside list-decimal space-y-3">
            {definitions.examples.map((example, index) => (
              <li
                key={index}
                className="leading-relaxed text-gray-700 dark:text-gray-300"
              >
                {example}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

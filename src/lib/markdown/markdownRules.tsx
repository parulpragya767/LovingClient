import { AppText, AppTextVariant } from "@/src/components/ui/AppText";
import clsx from 'clsx';
import { Link } from "expo-router";
import React from "react";

const LOVE_TYPE_REGEX = /\{\{LOVE_TYPE:([A-Z_]+)\}\}/;

export type MarkdownRuleProps = {
  variant?: AppTextVariant;
  className?: string;
};

export function createMarkdownRules({
  variant = "body",
  className,
}: MarkdownRuleProps) {
  return {
    text: (node: any) => {
      const content = node.content;
      if (!content) return null;

      const parts = content.split(LOVE_TYPE_REGEX);

      return (
        <React.Fragment key={node.key}>
          {parts.map((part: string, i: number) => {
            const isLoveType = i % 2 === 1;

            if (!isLoveType) {
              return (
                <AppText key={`t-${i}`} variant={variant} className={className}>
                  {part}
                </AppText>
              );
            }

            const label = part.split("_").map(s => s.charAt(0) + s.slice(1).toLowerCase()).join(" ");;
            return (
              <Link
                key={`l-${i}`}
                href={`/love-lens/${part}`}
              >
                <AppText key={`l-${i}`} variant={variant} color="text-action-ghost-text" className={clsx('font-semibold', className)}
                >
                  {label}
                </AppText>
              </Link>
            );
          })}
        </React.Fragment>
      );
    }
  };
}

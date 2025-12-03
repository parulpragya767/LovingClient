import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";

const LOVE_TYPE_REGEX = /\{\{LOVE_TYPE:([A-Z_]+)\}\}/;

export const markdownRules = {
  text: (node: any, children: any, parent: any, styles: any) => {
    const content = node.content;
    if (!content) return null;

    const parts = content.split(LOVE_TYPE_REGEX);

    return (
      <>
        {parts.map((part: string, i: number) => {
          const isLoveType = i % 2 === 1;

          if (!isLoveType) {
            return <Text key={`t-${i}`} style={styles.text}>{part}</Text>;
          }

          const label = part.split("_").map(s => s.charAt(0) + s.slice(1).toLowerCase()).join(" ");;
          return (
            <Link
              key={`l-${i}`}
              href={`/love-lens/${part}`}
              style={{ color: "#2563EB", fontWeight: "600" }}
            >
              {label}
            </Link>
          );
        })}
      </>
    );
  },
};

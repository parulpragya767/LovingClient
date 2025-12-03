import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";

// Regex to detect these tokens
const LOVE_TYPE_REGEX = /\[\[LOVE_TYPE_([A-Z_]+)\]\]/g;

export const markdownRules = {
  text: (node: any, children: any, parent: any, styles: any) => {
    const content = node.content;

    if (!content) return null;

    LOVE_TYPE_REGEX.lastIndex = 0;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = LOVE_TYPE_REGEX.exec(content)) !== null) {
      const start = match.index;
      const end = LOVE_TYPE_REGEX.lastIndex;
      if (start > lastIndex) {
        parts.push(<Text key={`t-${lastIndex}`} style={styles.text}>{content.slice(lastIndex, start)}</Text>);
      }
      const type = match[1];
      const label = type
        .split("_")
        .map((seg) => seg.charAt(0) + seg.slice(1).toLowerCase())
        .join(" ");
      parts.push(
        <Link key={`l-${start}`} href={`/love-lens/${type}`} style={{ color: "#2563EB", fontWeight: "600" }}>
          {label}
        </Link>
      );
      lastIndex = end;
    }
    if (parts.length === 0) {
      return <Text style={styles.text}>{content}</Text>;
    }
    if (lastIndex < content.length) {
      parts.push(<Text key={`t-${lastIndex}`} style={styles.text}>{content.slice(lastIndex)}</Text>);
    }
    return <>{parts}</>;
  },
};

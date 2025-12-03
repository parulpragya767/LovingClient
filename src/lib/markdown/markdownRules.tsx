import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";

// Regex to detect these tokens
const LOVE_TYPE_REGEX = /\[\[LOVE_TYPE_([A-Z_]+)\]\]/;

export const markdownRules = {
  text: (node: any, children: any, parent: any, styles: any) => {
    const content = node.content;

    if (!content) return null;

    // Check if content matches the LOVETYPE pattern
    const match = content.match(LOVE_TYPE_REGEX);

    if (match) {
      const type = match[1]; // CARE, BELONG, etc.
      const label = type.charAt(0) + type.slice(1).toLowerCase();

      return (
        <Link
          href={`/love-lens/${type}`}
          style={{ color: "#2563EB", fontWeight: "600" }}
        >
          {label}
        </Link>
      );
    }

    // default text rendering
    return <Text style={styles.text}>{content}</Text>;
  },
};

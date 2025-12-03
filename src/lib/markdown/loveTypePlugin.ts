import { MarkdownIt } from "react-native-markdown-display";

const loveTypeRegex = /\{\{LOVE_TYPE:([A-Z_]+)\}\}/g;

export function loveTypePlugin(md: MarkdownIt) {
  md.renderer.rules.text = (tokens: any, idx: any) => {
    const content = tokens[idx].content;

    if (!loveTypeRegex.test(content)) return content;

    loveTypeRegex.lastIndex = 0;

    return content.replace(loveTypeRegex, (_: any, type: any) => {
      return `[[LOVE_TYPE_${type as string}]]`;
    });
  };
}

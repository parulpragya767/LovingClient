import { MarkdownIt } from "react-native-markdown-display";

const loveTypeRegex = /\{\{LOVE_TYPE:([A-Z_]+)\}\}/g;

export function loveTypePlugin(md: MarkdownIt) {
  md.core.ruler.after("inline", "love_type_tokenizer", (state: any) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.type !== "inline" || !token.children) continue;
      for (let j = 0; j < token.children.length; j++) {
        const child = token.children[j];
        if (child.type !== "text" || !child.content) continue;

        if (loveTypeRegex.test(child.content)) {
          loveTypeRegex.lastIndex = 0;
          child.content = child.content.replace(loveTypeRegex, (_: any, type: string) => {
            return `[[LOVE_TYPE_${type}]]`;
          });
        }
      }
    }
  });
}

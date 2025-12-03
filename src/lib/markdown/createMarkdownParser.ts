import { MarkdownIt } from "react-native-markdown-display";
import { loveTypePlugin } from "./loveTypePlugin";

export function createMarkdownParser() {
  return MarkdownIt({ typographer: false }).use(loveTypePlugin);
}

import clsx from 'clsx';
import Markdown, { MarkdownProps } from 'react-native-markdown-display';
import { AppText } from './AppText';

export type MarkdownTextProps = MarkdownProps & {
  children: string;
  className?: string;
};

export function MarkdownText({ 
    className, 
    children,
    ...rest }: MarkdownTextProps) {
  return (
    <Markdown
      {...rest}
      style={{
        body: {}, // keep empty → let className drive styles
      }}
      rules={{
        paragraph: (node, children, parent, styles) => (
          <AppText variant="body" className={clsx('text-text-primary', className)}>
            {children}
          </AppText>
        ),

        strong: (node, children) => (
          <AppText variant="body" className="font-semibold">
            {children}
          </AppText>
        ),
      }}
    >
     {children}
    </Markdown>
  );
}

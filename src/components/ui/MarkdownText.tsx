import clsx from 'clsx';
import Markdown, { MarkdownProps } from 'react-native-markdown-display';
import { AppText, AppTextVariant } from './AppText';

export type MarkdownTextProps = MarkdownProps & {
  children: string;
  variant?: AppTextVariant;
  className?: string;
  rules?: MarkdownProps['rules'];
};

export function MarkdownText({   
  children,
  variant = "body",
  className, 
  rules,
  ...rest }: MarkdownTextProps) {
  return (
    <Markdown
      {...rest}
      style={{
        body: {}, // keep empty → let className drive styles
      }}
      rules={{
        paragraph: (_, nodeChildren) => (
          <AppText variant={variant} className={className}>
            {nodeChildren}
          </AppText>
        ),

        strong: (_, nodeChildren) => (
          <AppText variant={variant} className={clsx('font-semibold', className)}>
            {nodeChildren}
          </AppText>
        ),
        ...rules,
      }}
    >
     {children}
    </Markdown>
  );
}

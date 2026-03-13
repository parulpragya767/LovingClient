import clsx from 'clsx';
import React from 'react';
import Markdown, { MarkdownProps } from 'react-native-markdown-display';
import { AppText, AppTextVariant } from './AppText';

export type MarkdownTextProps = MarkdownProps & {
  variant?: AppTextVariant;
  className?: string;
  children?: React.ReactNode; 
  rules?: MarkdownProps['rules'];
  numberOfLines?: React.ComponentProps<typeof AppText>['numberOfLines'];
  onTextLayout?: React.ComponentProps<typeof AppText>['onTextLayout'];
};

export function MarkdownText({   
  variant = "body",
  className, 
  children,
  rules,
  numberOfLines,
  onTextLayout,
  ...rest }: MarkdownTextProps) {
  return (
    <Markdown
      {...rest}
      style={{
        body: {}, // keep empty → let className drive styles
      }}
      rules={{
        paragraph: (node, nodeChildren) => {
          return (
            <AppText
              key={node.key}
              variant={variant}
              className={className}
              numberOfLines={numberOfLines}
              onTextLayout={onTextLayout}
            >
              {nodeChildren}
            </AppText>
          );
        },

        strong: (node, nodeChildren) => {
          return (
            <AppText
              key={node.key}
              variant={variant}
              className={clsx('font-semibold', className)}
              numberOfLines={numberOfLines}
              onTextLayout={onTextLayout}
            >
              {nodeChildren}
            </AppText>
          );
        },
        ...rules,
      }}
    >
     {children}
    </Markdown>
  );
}

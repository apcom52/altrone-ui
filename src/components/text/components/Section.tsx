import { memo } from 'react';
import { SectionProps } from '../Text.types.ts';
import { Flex } from '../../flex';

export const Section = memo<SectionProps>(
  ({ children, gap = 'm', ...restProps }) => {
    return (
      <Flex tagName="section" direction="vertical" gap={gap} {...restProps}>
        {children}
      </Flex>
    );
  },
);

import { memo } from 'react';
import { SectionProps } from '../Text.types.ts';
import { Flex } from '../../flex';
import { useConfiguration } from '../../configuration';
import clsx from 'clsx';

export const Section = memo<SectionProps>(
  ({ children, gap = 'm', className, style, ...restProps }) => {
    const { text: { section: sectionConfig = {} } = {} } = useConfiguration();

    const cls = clsx(className, sectionConfig.className);
    const styles = {
      ...sectionConfig.style,
      ...style,
    };

    return (
      <Flex
        tagName="section"
        direction="vertical"
        gap={gap}
        className={cls}
        style={styles}
        {...restProps}
      >
        {children}
      </Flex>
    );
  },
);

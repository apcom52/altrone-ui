import { useDataTableContext } from '../DataTable.context.tsx';
import { memo, useEffect, useRef, useState } from 'react';
import { Flex } from 'components/flex';
import { Text } from 'components/text';
import { Tooltip } from 'components/tooltip';
import { Pagination } from 'components/pagination';
import s from './footer.module.scss';
import { useLocalization } from '../../application/useLocalization.tsx';
import { motion } from 'motion/react';

export const Footer = memo(() => {
  const t = useLocalization();

  const footerRef = useRef<HTMLTableSectionElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const checkSticky = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        // Определяет, "прилип" ли элемент к нижней части экрана
        setIsSticky(rect.bottom >= windowHeight && rect.top < windowHeight);
      }
    };

    checkSticky();

    const scrollContainer =
      footerRef.current
        ?.closest('[class*="Scrollable"], [class*="scrollable"]')
        ?.querySelector('[data-overlayscrollbars-viewport]') ||
      footerRef.current?.closest('.Wrapper') ||
      window;

    scrollContainer.addEventListener('scroll', checkSticky, {
      passive: true,
    });
    window.addEventListener('scroll', checkSticky, { passive: true });
    window.addEventListener('resize', checkSticky, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', checkSticky);
      window.removeEventListener('scroll', checkSticky);
      window.removeEventListener('resize', checkSticky);
    };
  }, []);

  const statusText = t('dataTable.shownRows', {
    plural: true,
    value: 35,
    vars: {
      count: 35,
    },
  });

  console.log('>> footer sticky', isSticky);

  return (
    <div className={s.Footer} ref={footerRef}>
      <motion.div
        className={s.Backdrop}
        layout
        animate={{
          width: isSticky ? 'calc(100% - 16px)' : '100%',
          height: isSticky ? 'calc(100% - 16px)' : '100%',
          bottom: isSticky ? 8 : 0,
          left: isSticky ? 8 : 0,
          borderTopLeftRadius: isSticky ? 20 : 0,
          borderTopRightRadius: isSticky ? 20 : 0,
          borderBottomLeftRadius: isSticky ? 20 : 'var(--data-table-rounding)',
          borderBottomRightRadius: isSticky ? 20 : 'var(--data-table-rounding)',
        }}
        transition={{ duration: 0.2, ease: 'linear' }}
      />
      <div className={s.StatusBar}>
        <Tooltip
          content={
            <Flex direction="vertical" gap="s">
              <Text block size={3}>
                {t('dataTable.totalRows')}: <Text weight="bold">{35}</Text>
              </Text>
              <Text block size={3}>
                {t('dataTable.rowsPerPage')}: <Text weight="bold">{100}</Text>
              </Text>
            </Flex>
          }
        >
          {statusText}
        </Tooltip>
      </div>
      <div>
        <Pagination currentPage={1} totalPages={4 || 1} setPage={() => {}} />
      </div>
    </div>
  );
});

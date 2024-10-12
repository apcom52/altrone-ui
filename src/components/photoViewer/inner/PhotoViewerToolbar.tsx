import { memo } from 'react';
import { Toolbar } from 'components/toolbar';
import { Divider } from 'components/divider';
import s from './toolbar.module.scss';
import { Icon } from 'components/icon';
import { Text } from 'components/text';
import { PhotoViewerToolbarProps } from '../PhotoViewer.types.ts';
import { Popover } from 'components/popover';
import { Scrollable } from 'components/scrollable';
import { useLocalization } from '../../application/useLocalization.tsx';

export const PhotoViewerToolbar = memo<PhotoViewerToolbarProps>(
  ({
    currentIndex,
    totalPhotos,
    onNext,
    onPrevious,
    caption,
    description,
    onClose,
  }) => {
    const t = useLocalization();

    return (
      <Toolbar compact className={s.PhotoViewerToolbar}>
        <Toolbar.Action
          icon={<Icon i="arrow_back" />}
          label={t('photoViewer.previous')}
          showLabel={false}
          disabled={currentIndex === 0}
          onClick={onPrevious}
        />
        <Toolbar.Action
          showLabel={false}
          label={t('photoViewer.progressLabel', {
            vars: {
              current: currentIndex + 1,
              total: totalPhotos,
            },
          })}
          tabIndex={-1}
        >
          <div className={s.Progress}>
            {t('photoViewer.progress', {
              vars: {
                current: currentIndex + 1,
                total: totalPhotos,
              },
            })}
          </div>
        </Toolbar.Action>
        <Toolbar.Action
          icon={<Icon i="arrow_forward" />}
          label={t('photoViewer.next')}
          showLabel={false}
          disabled={currentIndex === totalPhotos - 1}
          onClick={onNext}
        />
        <Divider direction="vertical" />
        <Popover
          title={caption || t('photoViewer.description')}
          style={{
            maxWidth: '280px',
          }}
          showCloseButton
          content={
            <Scrollable
              maxHeight="300px"
              offset={{ top: 0, left: 0, right: 4, bottom: 0 }}
            >
              <Text.Paragraph size="s">
                {description || t('photoViewer.noDescription')}
              </Text.Paragraph>
            </Scrollable>
          }
        >
          {({ opened }) => (
            <Toolbar.Action
              icon={<Icon i={opened ? 'expand_more' : 'info'} />}
              label={t('photoViewer.description')}
              showLabel={true}
              disabled={!caption && !description}
            />
          )}
        </Popover>
        <Toolbar.Action
          icon={<Icon i="close" />}
          label={t('common.close')}
          showLabel={false}
          onClick={onClose}
        />
      </Toolbar>
    );
  },
);

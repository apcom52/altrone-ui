import { memo } from 'react';
import { Toolbar } from 'components/toolbar';
import { Divider } from 'components/divider';
import s from './toolbar.module.scss';
import { Icon } from 'components/icon';
import { Text } from 'components/text';
import { PhotoViewerToolbarProps } from '../PhotoViewer.types.ts';
import { Popover } from 'components/popover';
import { Scrollable } from 'components/scrollable';

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
    return (
      <Toolbar compact className={s.PhotoViewerToolbar}>
        <Toolbar.Action
          icon={<Icon i="arrow_back" />}
          label="Previous photo"
          showLabel={false}
          disabled={currentIndex === 0}
          onClick={onPrevious}
        />
        <Toolbar.Action showLabel={false} label="Progress">
          <div
            className={s.Progress}
          >{`${currentIndex + 1} of ${totalPhotos}`}</div>
        </Toolbar.Action>
        <Toolbar.Action
          icon={<Icon i="arrow_forward" />}
          label="Next photo"
          showLabel={false}
          disabled={currentIndex === totalPhotos - 1}
          onClick={onNext}
        />
        <Divider direction="vertical" />
        <Popover
          title={caption || 'Description'}
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
                {description || 'No description'}
              </Text.Paragraph>
            </Scrollable>
          }
        >
          {({ opened }) => (
            <Toolbar.Action
              icon={<Icon i={opened ? 'expand_more' : 'info'} />}
              label="Description"
              showLabel={true}
              disabled={!caption && !description}
            />
          )}
        </Popover>
        <Toolbar.Action
          icon={<Icon i="close" />}
          label="Close"
          showLabel={false}
          onClick={onClose}
        />
      </Toolbar>
    );
  },
);

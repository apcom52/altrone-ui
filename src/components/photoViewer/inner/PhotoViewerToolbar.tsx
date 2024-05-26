import { memo } from 'react';
import { Toolbar } from '../../toolbar';
import { Divider } from '../../divider';
import { Direction, Size } from '../../../types';
import s from './toolbar.module.scss';
import { Icon, Text } from 'components';
import { PhotoViewerToolbarProps } from '../PhotoViewer.types.ts';
import { Popover } from '../../popover';
import { Scrollable } from '../../scrollable';

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
        <Divider direction={Direction.vertical} />
        <Popover
          title={caption || 'Description'}
          style={{
            maxWidth: '280px',
          }}
          content={
            <Scrollable maxHeight="300px">
              <Text.Paragraph size={Size.small}>
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

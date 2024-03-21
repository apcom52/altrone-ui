import { StoryObj } from '@storybook/react';
import { Pagination } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useEffect, useState } from 'react';

export const DefaultPagination: StoryObj<typeof Pagination> = {
  name: 'Default Pagination',
  render: ({ ...args }) => {
    const [page, setPage] = useState(args.page);

    useEffect(() => {
      setPage(args.page);
    }, [args.page]);

    return <Pagination {...args} page={page} onChange={setPage} />;
  },
  decorators: [StorybookDecorator]
};

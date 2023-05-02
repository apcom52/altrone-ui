import { Meta } from '@storybook/react';
import { PhotoViewer } from './index';

export { DefaultPhotoViewer } from './stories';

const meta: Meta<typeof PhotoViewer> = {
  component: PhotoViewer,
  title: 'Containers/PhotoViewer',
  tags: ['autodocs'],
  args: {
    images: [
      {
        src: 'https://www.cityofventura.ca.gov/ImageRepository/Document?documentID=34752',
        caption: 'Ventura',
        description:
          'Ventura is a California coastal city, northwest of Los Angeles. It’s known for its beaches, ' +
          'like San Buenaventura State Beach, with long, wooden Ventura Pier. Surfers Point is popular ' +
          'for surfing and windsurfing. Landmarks on downtown’s Main Street include the Mission San ' +
          'Buenaventura, with its 1809 church. Boats depart Ventura Harbor for Channel Islands National Park,' +
          ' a habitat for rare island foxes and scrub jays.'
      },
      {
        src: 'https://cdn1.matadornetwork.com/blogs/1/2018/10/The-Lone-Cypress-seen-from-17-Mile-Drive-in-Pebble-Beach-California-1.jpg',
        caption: 'Monterey'
      },
      {
        src: 'https://cdn.wallpapersafari.com/19/1/OAEcXu.jpg',
        caption: 'Big Sur'
      },
      {
        src: 'https://img.sunset02.com/sites/default/files/image/2016/05/main/secret-sierra-nevada-ca-mcgee-creek-sierra-crest-0513.jpg',
        caption: 'Sierra'
      }
    ]
  },
  argTypes: {}
};

export default meta;

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
        caption: 'Big Sur',
        description: `It's one of the world's most stunning patches of coastline, housing California's native north Coast Redwoods, and an abundance of marine life.`
      },
      {
        src: 'https://img.sunset02.com/sites/default/files/image/2016/05/main/secret-sierra-nevada-ca-mcgee-creek-sierra-crest-0513.jpg',
        caption: 'Sierra',
        description:
          'The Sierra Nevada Mountains are located in eastern California. They stretch from the north of the state to the south, the southern ending being near Los Angeles. The southern parts of the Sierra Range include the highest mountains, such as Mount Whitney and Yosemite National Park.'
      },
      {
        src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/48/3b/1e/caption.jpg?w=700&h=500&s=1'
      }
    ]
  },
  argTypes: {}
};

export default meta;

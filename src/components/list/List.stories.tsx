import { Meta, StoryObj } from '@storybook/react';
import { Flex, List, Text } from 'components';
import {
  directionStoryField,
  gapStoryField,
  StorybookDecorator,
} from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import s from './listStory.module.scss';

type CityRank = {
  position: number;
  city: string;
  country: string;
  livability: number;
  lovability: number;
  prosperity: number;
  imageUrl: string;
};

const CITY_RANKS: CityRank[] = [
  {
    position: 1,
    city: 'Vienna',
    country: 'Austria',
    livability: 95,
    lovability: 90,
    prosperity: 92,
    imageUrl:
      'https://www.travelandleisure.com/thmb/zFpjulihpXjpUV7gKNHzydvJANA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vienna-austria-VIENNATG0621-ecb0ee926c2d49c4bce610db594f7405.jpg',
  },
  {
    position: 2,
    city: 'Zurich',
    country: 'Switzerland',
    livability: 94,
    lovability: 88,
    prosperity: 95,
    imageUrl:
      'https://cdn.britannica.com/44/102444-050-7260C54D/Zurich-Switzerland.jpg',
  },
  {
    position: 3,
    city: 'Copenhagen',
    country: 'Denmark',
    livability: 93,
    lovability: 87,
    prosperity: 91,
    imageUrl:
      'https://cdn.britannica.com/47/83447-050-42342CB1/Nyhavn-Canal-Copenhagen.jpg',
  },
  {
    position: 4,
    city: 'Munich',
    country: 'Germany',
    livability: 92,
    lovability: 86,
    prosperity: 90,
    imageUrl:
      'https://cdn.britannica.com/06/152206-050-72BD5CAC/twin-towers-Church-of-Our-Lady-Munich.jpg',
  },
  {
    position: 5,
    city: 'Sydney',
    country: 'Australia',
    livability: 91,
    lovability: 85,
    prosperity: 93,
    imageUrl:
      'https://media.tatler.com/photos/6141d37b9ce9874a3e40107d/16:9/w_2560%2Cc_limit/social_crop_sydney_opera_house_gettyimages-869714270.jpg',
  },
  {
    position: 6,
    city: 'Vancouver',
    country: 'Canada',
    livability: 90,
    lovability: 84,
    prosperity: 89,
    imageUrl:
      'https://cdn.britannica.com/56/94456-050-2ECDE7B8/Vancouver-British-Columbia-Canada.jpg',
  },
  {
    position: 7,
    city: 'Auckland',
    country: 'New Zealand',
    livability: 89,
    lovability: 83,
    prosperity: 88,
    imageUrl:
      'https://cdn.britannica.com/99/61399-050-B867F67F/skyline-Auckland-New-Zealand-Westhaven-Marina.jpg',
  },
  {
    position: 8,
    city: 'Tokyo',
    country: 'Japan',
    livability: 88,
    lovability: 82,
    prosperity: 87,
    imageUrl:
      'https://media.cntraveller.com/photos/6343df288d5d266e2e66f082/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg',
  },
  {
    position: 9,
    city: 'Singapore',
    country: 'Singapore',
    livability: 87,
    lovability: 81,
    prosperity: 86,
    imageUrl:
      'https://cdn.britannica.com/55/190455-050-E617F64E/Night-view-Singapore.jpg',
  },
  {
    position: 10,
    city: 'Toronto',
    country: 'Canada',
    livability: 86,
    lovability: 80,
    prosperity: 85,
    imageUrl: 'https://cdn.britannica.com/93/94493-050-35524FED/Toronto.jpg',
  },
];

const story: Meta<typeof List> = {
  title: 'Components/Containers/List',
  component: List,
  decorators: [StorybookDecorator],
  args: {
    direction: 'vertical',
    gap: 'medium',
  },
  argTypes: {
    gap: gapStoryField,
    direction: directionStoryField,
  },
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

export const FlexLayout: StoryObj<typeof List<CityRank>> = {
  name: 'Using List',
  args: {
    data: CITY_RANKS,
  },
  render: (args) => (
    <Flex gap="large">
      <List<CityRank>
        {...args}
        renderItem={({ item }) => {
          return (
            <Flex
              className={s.CityRank}
              direction="horizontal"
              align="center"
              gap="large"
              wrap={false}
            >
              <div className={s.Position}>#{item.position}</div>
              <div className={s.Image}>
                <img src={item.imageUrl} alt="" />
              </div>
              <Flex gap="medium">
                <div className={s.Title}>
                  {item.city}
                  <span className={s.Country}>, {item.country}</span>
                </div>
                <Flex gap="xlarge" direction="horizontal">
                  <div className={s.Stat}>
                    Livability{' '}
                    <span className={s.StatValue}>{item.livability}</span>
                  </div>
                  <div className={s.Stat}>
                    Lovability{' '}
                    <span className={s.StatValue}>{item.lovability}</span>
                  </div>
                  <div className={s.Stat}>
                    Prosperity{' '}
                    <span className={s.StatValue}>{item.prosperity}</span>
                  </div>
                </Flex>
              </Flex>
            </Flex>
          );
        }}
      />
      <Text.Paragraph size="small">Rating was generated by AI</Text.Paragraph>
    </Flex>
  ),
};

export default story;

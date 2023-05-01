import { StoryObj } from '@storybook/react';
import { Spoiler } from '../index';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';
import { Paragraph } from '../../../typography';

export const DefaultSpoilerStory: StoryObj<typeof Spoiler> = {
  name: 'Default Spoiler',
  render: ({ ...args }) => {
    return (
      <>
        <Spoiler {...args}>
          <Paragraph>
            Big Ben is an Industrial Era Wonder in Civilization VI. It must be built along a River
            adjacent to a Commercial Hub with a Bank.
          </Paragraph>
        </Spoiler>
        <Spoiler label="Strategy" openedByDefault={false}>
          <Paragraph>
            Big Ben is a very important wonder to build if you are focused on your economy. The
            added Economic Policy Economic Policy Card slot and +6 Gold Gold per turn will help
            increase your empire&apos;s income, and the sudden influx of Gold Gold may give you the
            capital needed to patronize Great Person Great People (especially if you finish building
            this wonder when you have a large amount of Gold Gold in your treasury). Moreover, the
            extra Great Merchant Great Merchant points will allow you to attract Great Merchants
            more quickly, many of whom will provide you with extra Amenities Amenities and luxury
            resources from the time that Big Ben becomes available onward.
          </Paragraph>
          <Paragraph>
            If you already have a strong Culture Culture generation, Big Ben might be a more
            worthwhile investment than the Forbidden City, because Economic Policy Economic policy
            slots are almost on par with Wildcard Slot Wildcard slots in strength. This holds
            especially true when going for a Domination Victory and picking Fascism as your Tier 3
            government.
          </Paragraph>
        </Spoiler>
        <Spoiler label="Civilopedia entry" openedByDefault={false}>
          <Paragraph>
            The giant bell, Big Ben, is housed in the Elizabeth Tower – so named to celebrate the
            Diamond Jubilee of Queen Elizabeth II (being just the “Clock Tower” before that) – at
            the north end of the Palace of Westminster, where sits the Houses of Parliament. Being
            rather casual in language, most Brits and flocks of tourists tend to refer to the whole
            thing as “Big Ben.” The great 16-ton bell was cast in August 1856 at the foundry at
            Stockton-on-Tees and recast at the Whitechapel Bell Foundry in April 1858 after it
            cracked while being transported to London. The pendulum clockwork was designed by the
            Astronomer Royal and crafted by the clockmaker Edward Dent and his stepson Frederick; it
            was ready in 1854. So fine is the precision, that adding or removing a penny (English,
            of course) to the pendulum will change the speed by four-tenths of a second each day.
            But all had to await the completion of the clock tower itself, which wasn’t done until
            1859. Despite being silenced during wartime and the occasional breakdown, Big Ben has
            chimed the hour ever since.
          </Paragraph>
        </Spoiler>
      </>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};

import { AltroneApplication } from './AltroneApplication.tsx';
import { Meta, StoryObj } from '@storybook/react';
import { ScreenName } from '../text/components/ScreenName.tsx';
import { Heading } from '../text/components/Heading.tsx';
import { TextHeadingRoles } from '../text/Text.types.ts';
import { Paragraph } from '../text/components/Paragraph.tsx';
import { Size } from '../../types';
import { Inline } from '../text/components/Inline.tsx';
import { Code } from '../text/components/Code.tsx';

const story: Meta<typeof AltroneApplication> = {
  title: 'Altrone Application',
  component: AltroneApplication,
};

export default story;

export const ApplicationStory: StoryObj<typeof AltroneApplication> = {
  name: 'Simple Application',
  render: () => (
    <AltroneApplication
      tagName="main"
      config={{
        language: 'ru',
      }}
    >
      <ScreenName id="1">Altrone UI</ScreenName>
      <Heading>Heading component</Heading>
      <Heading role={TextHeadingRoles.heading} className="custom">
        Heading component
      </Heading>
      <Heading role={TextHeadingRoles.subheading}>Heading component</Heading>
      <Heading role={TextHeadingRoles.inner}>Heading component</Heading>
      <Paragraph size={Size.large}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
        commodi, culpa cum deserunt, dolores earum eveniet excepturi fugiat
        iusto labore minima nesciunt nobis odit optio repellendus sequi sint
        temporibus vel.
      </Paragraph>
      <Paragraph style={{ width: 900 }}>
        In the <Inline bold>digital age</Inline>, where{' '}
        <Inline italic>communication</Inline> primarily occurs{' '}
        <Inline bold italic>
          through screens
        </Inline>
        , the importance of <Inline deleted>text formatting cannot be</Inline>{' '}
        overstated. Whether it's a blog post, an email, or a social media
        update, how your text is presented can significantly impact how it's
        perceived and understood. <Inline underline>Effective text</Inline>{' '}
        formatting not only enhances clarity but also adds aesthetic appeal to
        your content.{' '}
        <Inline highlighted>Let's explore some key principles</Inline> and
        techniques for mastering the art of text formatting.
      </Paragraph>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
        commodi, culpa cum deserunt, dolores earum eveniet excepturi fugiat
        iusto <Code>npm i react</Code> labore minima nesciunt nobis odit optio
        repellendus sequi sint temporibus vel.
      </Paragraph>
      <Paragraph size={Size.small}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
        commodi, culpa cum deserunt, dolores earum eveniet excepturi fugiat
        iusto labore minima nesciunt nobis odit optio repellendus sequi sint
        temporibus vel.
      </Paragraph>
    </AltroneApplication>
  ),
};

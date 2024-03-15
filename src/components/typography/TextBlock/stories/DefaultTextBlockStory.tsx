import { StoryObj } from '@storybook/react';
import { TextBlock } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Size } from '../../../../types';

export const DefaultTextBlockStory: StoryObj<typeof TextBlock> = {
  name: 'Default TextBlock',
  storyName: 'Default TextBlock',
  render: ({ ...args }) => {
    return (
      <>
        <TextBlock role="heading" size={Size.large}>
          Navigating the Ethical Frontiers of Artificial Intelligence
        </TextBlock>
        <TextBlock role="heading" size={Size.medium}>
          Balancing Progress with Principles: Ethical Considerations in AI Development
        </TextBlock>
        <TextBlock size={Size.small}>
          In the realm of artificial intelligence, the quest for creating systems that can truly
          understand and interact with humans on a human level remains ongoing. Researchers
          continuously push the boundaries of AI, striving for breakthroughs in natural language
          understanding, reasoning, and empathy. While significant progress has been made, achieving
          true human-like AI poses immense challenges, both technical and ethical. The pursuit of AI
          capable of empathy, for instance, raises profound questions about the nature of
          consciousness, empathy, and the responsibilities inherent in creating such systems.
        </TextBlock>
        <TextBlock size={Size.medium}>
          Ethical considerations loom large in the development and deployment of AI technologies. As
          these systems become increasingly integrated into various aspects of daily life, concerns
          about privacy, bias, and fairness grow more pressing. Striking a balance between
          innovation and ethical practice requires interdisciplinary collaboration, involving not
          only computer scientists and engineers but also ethicists, psychologists, policymakers,
          and other stakeholders. Establishing robust ethical frameworks and regulatory mechanisms
          is essential to ensure that AI serves the common good and respects human dignity.
        </TextBlock>
        <TextBlock size={Size.large} ellipsis rows={3}>
          Despite the challenges and ethical dilemmas, the potential benefits of AI are vast and
          varied. From healthcare and education to transportation and entertainment, AI holds
          promise for improving efficiency, enhancing decision-making, and unlocking new
          opportunities. In healthcare, for example, AI-powered diagnostics and personalized
          treatments could revolutionize patient care, leading to better health outcomes and more
          effective resource allocation. However, realizing this potential requires a concerted
          effort to address technical limitations, ethical concerns, and societal implications,
          ensuring that AI serves as a force for good in the world.
        </TextBlock>
      </>
    );
  },
  decorators: [StorybookDecorator]
};

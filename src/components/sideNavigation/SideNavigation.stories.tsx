import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { SideNavigation } from './SideNavigation.tsx';

const story: Meta<typeof SideNavigation> = {
  title: 'Components/Navigation/SideNavigation',
  component: SideNavigation,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

export const TooltipStory: StoryObj<typeof SideNavigation> = {
  name: 'Using TopNavigation',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Standard TopNavigation</Text.Heading>
        <Flex direction="horizontal">
          <div style={{ width: '600px' }}>
            <Text.Heading role="title">
              The Evolution of Artificial Intelligence: Past, Present, and
              Future
            </Text.Heading>
            <Text.Heading id="introduction" level={2} role="heading">
              Introduction
            </Text.Heading>
            <Text.Paragraph>
              Artificial Intelligence (AI) has been a topic of fascination and
              speculation for decades. From its inception in theoretical
              frameworks to its current applications in various industries, AI
              has transformed significantly. This article explores the evolution
              of AI, its current state, and future prospects, highlighting key
              milestones and technological advancements.
            </Text.Paragraph>
            <Text.Heading id="genesis" level={2} role="heading">
              The Genesis of Artificial Intelligence
            </Text.Heading>
            <Text.Heading id="concepts" level={3} role="subheading">
              Early Concepts and Theories
            </Text.Heading>
            <Text.Paragraph>
              The concept of AI dates back to ancient history, where myths and
              stories about artificial beings endowed with intelligence were
              common. However, the formal study of AI began in the 20th century.
            </Text.Paragraph>
            <Text.Heading level={3} role="inner">
              Alan Turing and the Turing Test
            </Text.Heading>
            <Text.Paragraph>
              Alan Turing, often considered the father of computer science,
              proposed the idea of a machine that could simulate any human
              intelligence. The Turing Test, introduced in 1950, became a
              fundamental criterion for determining a machine's ability to
              exhibit intelligent behavior equivalent to that of a human.
            </Text.Paragraph>
            <Text.Heading level={3} role="inner">
              The Dartmouth Conference of 1956
            </Text.Heading>
            <Text.Paragraph>
              This conference marked the official birth of AI as a field of
              study. Researchers such as John McCarthy, Marvin Minsky, Nathaniel
              Rochester, and Claude Shannon outlined a research agenda that
              shaped AI's initial decades.
            </Text.Paragraph>
            <Text.Heading id="ai_programs" level={3} role="subheading">
              Early AI Programs and Achievements
            </Text.Heading>
            <Text.Heading level={3} role="inner">
              Logic Theorist and General Problem Solver
            </Text.Heading>
            <Text.Paragraph>
              The Logic Theorist, developed by Allen Newell and Herbert A. Simon
              in 1956, was one of the first AI programs capable of proving
              mathematical theorems. The General Problem Solver (GPS), created
              by the same team, aimed to solve a wide range of problems using a
              general approach, laying the groundwork for future AI systems.
            </Text.Paragraph>
            <Text.Heading level={3} role="inner">
              ELIZA and Early Natural Language Processing
            </Text.Heading>
            <Text.Paragraph>
              Joseph Weizenbaum's ELIZA, created in the mid-1960s, simulated
              conversation with a human using simple pattern matching and
              substitution methodology. ELIZA demonstrated the potential for
              machines to engage in human-like interactions, sparking interest
              in natural language processing (NLP).
            </Text.Paragraph>
            <Text.Heading id="evolution" level={2} role="heading">
              The Evolution and Expansion of AI
            </Text.Heading>
            <Text.Heading id="rise" level={3} role="subheading">
              The Rise of Machine Learning
            </Text.Heading>
            <Text.Heading level={4} role="inner">
              From Rule-Based Systems to Learning Algorithms
            </Text.Heading>
            <Text.Paragraph>
              Early AI systems relied heavily on predefined rules and logic,
              which limited their flexibility and scalability. The shift towards
              machine learning in the 1980s and 1990s introduced algorithms
              capable of learning from data, significantly enhancing AI's
              capabilities.
            </Text.Paragraph>
            <Text.Heading level={4} role="inner">
              Neural Networks and Deep Learning
            </Text.Heading>
            <Text.Paragraph>
              The revival of neural networks in the late 1980s, particularly
              with the backpropagation algorithm, marked a significant
              advancement in AI. The advent of deep learning in the 2010s,
              driven by increased computational power and large datasets,
              enabled breakthroughs in image and speech recognition.
            </Text.Paragraph>
            <Text.Heading id="ai_in_21" level={3} role="subheading">
              AI in the 21st Century
            </Text.Heading>
            <Text.Heading level={4} role="inner">
              AI in Everyday Applications
            </Text.Heading>
            <Text.Paragraph>
              AI technologies have become integral to everyday life, powering
              virtual assistants like Siri and Alexa, recommendation systems on
              platforms like Netflix and Amazon, and autonomous vehicles.
              Machine learning models are used in healthcare for diagnosing
              diseases, in finance for detecting fraud, and in marketing for
              personalized advertising.
            </Text.Paragraph>
            <Text.Heading level={4} role="inner">
              Ethical and Societal Implications
            </Text.Heading>
            <Text.Paragraph>
              The widespread adoption of AI raises important ethical and
              societal questions, including concerns about privacy, bias, and
              job displacement. Initiatives like the development of ethical AI
              frameworks and regulations aim to address these challenges and
              ensure the responsible use of AI technologies.
            </Text.Paragraph>
            <Text.Heading id="conclusion" level={2} role="heading">
              Conclusion
            </Text.Heading>
            <Text.Paragraph>
              Artificial Intelligence has come a long way since its early days,
              evolving from theoretical concepts to practical applications that
              permeate various aspects of life. As AI continues to advance, it
              promises to bring about transformative changes across industries
              while also posing significant ethical and societal challenges. By
              fostering responsible development and addressing these challenges,
              we can harness the full potential of AI to benefit humanity.
            </Text.Paragraph>
            <Text.Heading id="references" level={2} role="heading">
              References
            </Text.Heading>
            <Text.List type="numeric">
              <Text.ListItem>
                Russell, S., & Norvig, P. (2020). Artificial Intelligence: A
                Modern Approach (4th ed.). Pearson.
              </Text.ListItem>
              <Text.ListItem>
                Mitchell, T. M. (1997). Machine Learning. McGraw-Hill.
              </Text.ListItem>
              <Text.ListItem>
                Goodfellow, I., Bengio, Y., & Courville, A. (2016). Deep
                Learning. MIT Press.
              </Text.ListItem>
              <Text.ListItem>
                OpenAI. (2020). GPT-3 Technical Report.
              </Text.ListItem>
            </Text.List>
          </div>
          <div
            style={{
              background: 'var(--dataTableHoveredRowBackgroundColor)',
              position: 'fixed',
              width: '300px',
              flex: 1,
              right: 0,
              top: 0,
              height: '100%',
            }}
          >
            <SideNavigation title="Contents">
              <SideNavigation.Item href="#introduction" label="Introduction" />
              <SideNavigation.Item
                href="#genesis"
                label="The Genesis of Artificial Intelligence"
              >
                <SideNavigation.Item
                  href="#concepts"
                  label="Early Concepts and Theories"
                />
                <SideNavigation.Item
                  href="#ai_programs"
                  label="Early AI Programs and Achievements"
                />
              </SideNavigation.Item>
              <SideNavigation.Item
                href="#evolution"
                label="The Evolution and Expansion of AI"
              >
                <SideNavigation.Item
                  href="#rise"
                  label="The Rise of Machine Learning"
                />
                <SideNavigation.Item
                  href="#ai_in_21"
                  label="AI in the 21st Century"
                />
              </SideNavigation.Item>
              <SideNavigation.Item href="#conclusion" label="Conclusion" />
              <SideNavigation.Item href="#references" label="References" />
            </SideNavigation>
          </div>
        </Flex>
      </Flex>
    );
  },
};

export default story;

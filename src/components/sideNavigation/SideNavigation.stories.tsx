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
        <Text size={5} weight="bold" block>
          Standard TopNavigation
        </Text>
        <Flex direction="horizontal">
          <div style={{ width: '600px' }}>
            <Text size={7} weight="bold" block>
              The Evolution of Artificial Intelligence: Past, Present, and
              Future
            </Text>
            <Text size={6} weight="bold" block id="introduction">
              Introduction
            </Text>
            <Text block>
              Artificial Intelligence (AI) has been a topic of fascination and
              speculation for decades. From its inception in theoretical
              frameworks to its current applications in various industries, AI
              has transformed significantly. This article explores the evolution
              of AI, its current state, and future prospects, highlighting key
              milestones and technological advancements.
            </Text>
            <Text size={6} weight="bold" block id="genesis">
              The Genesis of Artificial Intelligence
            </Text>
            <Text size={5} weight="bold" block id="concepts">
              Early Concepts and Theories
            </Text>
            <Text block>
              The concept of AI dates back to ancient history, where myths and
              stories about artificial beings endowed with intelligence were
              common. However, the formal study of AI began in the 20th century.
            </Text>
            <Text size={5} weight="bold" block>
              Alan Turing and the Turing Test
            </Text>
            <Text block>
              Alan Turing, often considered the father of computer science,
              proposed the idea of a machine that could simulate any human
              intelligence. The Turing Test, introduced in 1950, became a
              fundamental criterion for determining a machine's ability to
              exhibit intelligent behavior equivalent to that of a human.
            </Text>
            <Text size={5} weight="bold" block>
              The Dartmouth Conference of 1956
            </Text>
            <Text block>
              This conference marked the official birth of AI as a field of
              study. Researchers such as John McCarthy, Marvin Minsky, Nathaniel
              Rochester, and Claude Shannon outlined a research agenda that
              shaped AI's initial decades.
            </Text>
            <Text size={5} weight="bold" block id="ai_programs">
              Early AI Programs and Achievements
            </Text>
            <Text size={5} weight="bold" block>
              Logic Theorist and General Problem Solver
            </Text>
            <Text block>
              The Logic Theorist, developed by Allen Newell and Herbert A. Simon
              in 1956, was one of the first AI programs capable of proving
              mathematical theorems. The General Problem Solver (GPS), created
              by the same team, aimed to solve a wide range of problems using a
              general approach, laying the groundwork for future AI systems.
            </Text>
            <Text size={5} weight="bold" block>
              ELIZA and Early Natural Language Processing
            </Text>
            <Text block>
              Joseph Weizenbaum's ELIZA, created in the mid-1960s, simulated
              conversation with a human using simple pattern matching and
              substitution methodology. ELIZA demonstrated the potential for
              machines to engage in human-like interactions, sparking interest
              in natural language processing (NLP).
            </Text>
            <Text size={6} weight="bold" block id="evolution">
              The Evolution and Expansion of AI
            </Text>
            <Text size={5} weight="bold" block id="rise">
              The Rise of Machine Learning
            </Text>
            <Text size={5} weight="bold" block>
              From Rule-Based Systems to Learning Algorithms
            </Text>
            <Text block>
              Early AI systems relied heavily on predefined rules and logic,
              which limited their flexibility and scalability. The shift towards
              machine learning in the 1980s and 1990s introduced algorithms
              capable of learning from data, significantly enhancing AI's
              capabilities.
            </Text>
            <Text size={5} weight="bold" block>
              Neural Networks and Deep Learning
            </Text>
            <Text block>
              The revival of neural networks in the late 1980s, particularly
              with the backpropagation algorithm, marked a significant
              advancement in AI. The advent of deep learning in the 2010s,
              driven by increased computational power and large datasets,
              enabled breakthroughs in image and speech recognition.
            </Text>
            <Text size={5} weight="bold" block id="ai_in_21">
              AI in the 21st Century
            </Text>
            <Text size={5} weight="bold" block>
              AI in Everyday Applications
            </Text>
            <Text block>
              AI technologies have become integral to everyday life, powering
              virtual assistants like Siri and Alexa, recommendation systems on
              platforms like Netflix and Amazon, and autonomous vehicles.
              Machine learning models are used in healthcare for diagnosing
              diseases, in finance for detecting fraud, and in marketing for
              personalized advertising.
            </Text>
            <Text size={5} weight="bold" block>
              Ethical and Societal Implications
            </Text>
            <Text block>
              The widespread adoption of AI raises important ethical and
              societal questions, including concerns about privacy, bias, and
              job displacement. Initiatives like the development of ethical AI
              frameworks and regulations aim to address these challenges and
              ensure the responsible use of AI technologies.
            </Text>
            <Text size={6} weight="bold" block id="conclusion">
              Conclusion
            </Text>
            <Text block>
              Artificial Intelligence has come a long way since its early days,
              evolving from theoretical concepts to practical applications that
              permeate various aspects of life. As AI continues to advance, it
              promises to bring about transformative changes across industries
              while also posing significant ethical and societal challenges. By
              fostering responsible development and addressing these challenges,
              we can harness the full potential of AI to benefit humanity.
            </Text>
            <Text size={6} weight="bold" block id="references">
              References
            </Text>
            <Text list="numeric">
              <Text item>
                Russell, S., & Norvig, P. (2020). Artificial Intelligence: A
                Modern Approach (4th ed.). Pearson.
              </Text>
              <Text item>
                Mitchell, T. M. (1997). Machine Learning. McGraw-Hill.
              </Text>
              <Text item>
                Goodfellow, I., Bengio, Y., & Courville, A. (2016). Deep
                Learning. MIT Press.
              </Text>
              <Text item>OpenAI. (2020). GPT-3 Technical Report.</Text>
            </Text>
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
              <SideNavigation.Item
                href="#introduction"
                label="Introduction"
                data-testid="link1"
              />
              <SideNavigation.Item
                href="#genesis"
                label="The Genesis of Artificial Intelligence"
                data-testid="link2"
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

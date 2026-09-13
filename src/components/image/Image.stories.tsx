import { Meta, StoryObj } from '@storybook/react';
import { ReactElement, ReactNode, useState } from 'react';
import { Image, Flex, Grid, Text, Switcher, Loading } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';

const story: Meta<typeof Image> = {
  title: 'Components/Core/Image',
  component: Image,
  decorators: [StorybookDecorator],
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export default story;

const Heading = ({ children }: { children: string }) => (
  <Text block size={7} weight="bold" style={{ marginTop: 16 }}>
    {children}
  </Text>
);

const Paragraph = ({ children }: { children: ReactNode }) => (
  <Text block size={4} style={{ maxWidth: 640, lineHeight: 1.6 }}>
    {children}
  </Text>
);

/**
 * Stands in for `next/image` — same idea (the framework owns the rendered
 * `<img>`, `Image` never touches it directly), without pulling Next.js into
 * this library's Storybook.
 */
const Framework3rdPartyImage = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} style={{ width: '100%', height: '100%' }} />
);

export const Overview: StoryObj<typeof Image> = {
  name: 'Overview',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Text block size={9} weight="bold">
        Image
      </Text>

      <Paragraph>
        <Text code>Image</Text> is a figure for editorial content — a photo,
        illustration or diagram with an optional caption. The picture itself can
        be a plain URL (<Text code>src</Text>), or any custom element passed as{' '}
        <Text code>children</Text> — <Text code>next/image</Text>, a raw{' '}
        <Text code>svg</Text>, a <Text code>picture</Text> with sources. Either
        way <Text code>fit</Text> and <Text code>objectPosition</Text> apply the
        same way, because they target whatever `img`/`svg` ends up in the DOM,
        not a specific renderer.
      </Paragraph>

      <Heading>Basic usage</Heading>
      <Paragraph>
        The most common case: a <Text code>src</Text>, an <Text code>alt</Text>,
        and a caption. A skeleton placeholder covers the frame until the picture
        finishes loading.
      </Paragraph>
      <Image
        src="https://picsum.photos/seed/altrone-fjord/640/360"
        alt="A fjord at sunset"
        caption="Fjord at sunset — object-fit: cover by default."
        width="100%"
        height={240}
      />

      <Heading>Broken image</Heading>
      <Paragraph>
        A <Text code>src</Text> that fails to load falls back to a neutral
        placeholder with an icon, instead of the browser's broken-image glyph —
        the <Text code>alt</Text> text is still announced to screen readers via{' '}
        <Text code>aria-label</Text>.
      </Paragraph>
      <Image
        src="https://this-domain-does-not-exist.invalid/photo.jpg"
        alt="Team offsite photo"
        caption="This URL is intentionally broken for the demo."
        width="100%"
        height={160}
      />
    </Flex>
  ),
};

export const ObjectFit: StoryObj<typeof Image> = {
  name: 'Object-fit',
  render: () => {
    const fits = ['cover', 'contain', 'fill', 'none', 'scale-down'] as const;

    return (
      <Flex direction="vertical" gap="l" style={{ maxWidth: 720 }}>
        <Heading>Object-fit</Heading>
        <Paragraph>
          The same tall, narrow source photo under every <Text code>fit</Text>{' '}
          value, framed into an identically-sized grid cell — this is exactly
          what a real "wrong aspect ratio" photo in an article looks like under
          each mode. The <Text code>caption</Text> below each one names the fit.
        </Paragraph>
        <Grid gap="m" rowGap="l">
          {fits.map((fit) => (
            <Grid.Column key={fit} size={4}>
              <Image
                src="https://picsum.photos/seed/altrone-portrait/300/500"
                alt={`Portrait photo, object-fit ${fit}`}
                fit={fit}
                width="100%"
                height={140}
                caption={fit}
              />
            </Grid.Column>
          ))}
        </Grid>
      </Flex>
    );
  },
};

export const CustomPicture: StoryObj<typeof Image> = {
  name: 'Custom picture (children)',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Heading>Any picture element</Heading>
      <Paragraph>
        Pass a custom element as <Text code>children</Text> instead of{' '}
        <Text code>src</Text> to hand rendering to something else entirely — a
        framework's own image component, a hand-drawn <Text code>svg</Text>, a
        chart. <Text code>Image</Text> only supplies the frame,{' '}
        <Text code>fit</Text>/<Text code>objectPosition</Text> and the caption
        around it.
      </Paragraph>

      <Text block size={3} weight="medium">
        next/image-style component
      </Text>
      <Image
        fit="cover"
        width="100%"
        height={200}
        caption="Rendered by a third-party image component, framed by Image."
      >
        <Framework3rdPartyImage
          src="https://picsum.photos/seed/altrone-city/640/360"
          alt="City skyline at dusk"
        />
      </Image>

      <Text block size={3} weight="medium">
        Inline SVG
      </Text>
      <Image
        fit="contain"
        width="100%"
        height={160}
        caption="A raw inline svg works the same way — no img tag involved."
      >
        <svg viewBox="0 0 100 100" role="img" aria-label="Abstract mark">
          <circle cx="50" cy="50" r="40" fill="var(--accent-9)" />
          <rect x="30" y="30" width="40" height="40" fill="var(--accent-a4)" />
        </svg>
      </Image>
    </Flex>
  ),
};

const LoadingScenario = ({
  preloader,
  description,
}: {
  preloader?: ReactElement;
  description: string;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Flex direction="vertical" gap="s">
      <Flex align="center" gap="m">
        <Switcher checked={loaded} onChange={setLoaded} />
        <Text size={3}>{loaded ? 'Loaded' : 'Loading'}</Text>
      </Flex>
      <Paragraph>{description}</Paragraph>
      <Image
        fit="cover"
        width={280}
        height={160}
        isLoading={!loaded}
        preloader={preloader}
      >
        <Framework3rdPartyImage
          src="https://picsum.photos/seed/altrone-forest/560/320"
          alt="Misty forest path"
        />
      </Image>
    </Flex>
  );
};

export const Preloader: StoryObj<typeof Image> = {
  name: 'Preloader',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Heading>Preloader</Heading>
      <Paragraph>
        In <Text code>src</Text> mode the skeleton shows and hides itself
        automatically, tracking the native <Text code>img</Text> load/error
        events. For custom <Text code>children</Text> there's no element{' '}
        <Text code>Image</Text> can listen to, so the loading state is
        controlled explicitly via <Text code>isLoading</Text> — flip the switch
        below to simulate the picture finishing its own load.
      </Paragraph>

      <LoadingScenario description="Default skeleton preloader — the same one src mode uses." />

      <LoadingScenario
        description="A custom preloader, overriding the skeleton with the library's own spinner."
        preloader={<Loading size={32} />}
      />
    </Flex>
  ),
};

export const Captions: StoryObj<typeof Image> = {
  name: 'Captions',
  render: () => (
    <Flex direction="vertical" gap="l" style={{ maxWidth: 640 }}>
      <Heading>Captions</Heading>
      <Paragraph>
        <Text code>caption</Text> accepts any node, not just a string — useful
        for attributing a source with a link. It's always centered under the
        frame.
      </Paragraph>
      <Image
        src="https://picsum.photos/seed/altrone-caption/400/260"
        alt="Landscape photo with a source attribution"
        width={300}
        height={195}
        caption="Photo: picsum.photos"
      />
    </Flex>
  ),
};

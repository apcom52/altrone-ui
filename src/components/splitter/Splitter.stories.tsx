import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Splitter, SplitterHandle } from './index.ts';
import { Text } from '../text/index.ts';
import { Flex } from '../flex/index.ts';
import React, { useRef, useState } from 'react';

const story: Meta<typeof Splitter> = {
  title: 'Components/Containers/Splitter',
  component: Splitter,
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

// ── Shared decorative helpers ─────────────────────────────────────────────────

const panelStyle = (accent = 'var(--background-2)'): React.CSSProperties => ({
  height: '100%',
  padding: '16px',
  background: accent,
});

const Label = ({ children }: { children: React.ReactNode }) => (
  <Text size={3} color="muted" style={{ userSelect: 'none' }}>
    {children}
  </Text>
);

// Fake file-tree lines
const FileTree = () => (
  <Flex direction="vertical" gap="xs" style={{ padding: '12px 8px' }}>
    {[
      '📁 src',
      '  📁 components',
      '    📄 Splitter.tsx',
      '    📄 Splitter.types.ts',
      '  📁 utils',
      '    📄 helpers.ts',
      '📄 package.json',
      '📄 vite.config.ts',
    ].map((line) => (
      <Text
        key={line}
        size={3}
        style={{
          fontFamily: 'var(--font-family-code)',
          whiteSpace: 'pre',
          cursor: 'default',
        }}
      >
        {line}
      </Text>
    ))}
  </Flex>
);

// Fake code block
const CodeBlock = () => (
  <div
    style={{
      fontFamily: 'var(--font-family-code)',
      fontSize: 'var(--text-size-3)',
      lineHeight: 'var(--line-height-4)',
      padding: '16px',
      height: '100%',
      overflow: 'auto',
    }}
  >
    {[
      "import { Splitter } from '@altrone-ui/core';",
      '',
      'export const App = () => (',
      '  <Splitter style={{ height: 400 }}>',
      '    <Splitter.Panel defaultSize={25} min={15} collapsible>',
      '      <FileTree />',
      '    </Splitter.Panel>',
      '    <Splitter.Panel>',
      '      <Editor />',
      '    </Splitter.Panel>',
      '  </Splitter>',
      ');',
    ].map((line, i) => (
      <div key={i} style={{ display: 'flex', gap: 16 }}>
        <Text
          size={3}
          color="muted"
          style={{ width: 24, textAlign: 'right', flexShrink: 0 }}
        >
          {i + 1}
        </Text>
        <span style={{ whiteSpace: 'pre' }}>{line || ' '}</span>
      </div>
    ))}
  </div>
);

// ── Stories ──────────────────────────────────────────────────────────────────

export const BasicHorizontal: StoryObj<typeof Splitter> = {
  name: 'Horizontal (default)',
  render: () => (
    <Splitter style={{ height: 300 }}>
      <Splitter.Panel defaultSize={30}>
        <div style={panelStyle()}>
          <Label>Left panel · drag the divider</Label>
        </div>
      </Splitter.Panel>
      <Splitter.Panel>
        <div style={panelStyle()}>
          <Label>Right panel</Label>
        </div>
      </Splitter.Panel>
    </Splitter>
  ),
};

export const VerticalOrientation: StoryObj<typeof Splitter> = {
  name: 'Vertical orientation',
  render: () => (
    <Splitter orientation="vertical" style={{ height: 400 }}>
      <Splitter.Panel defaultSize={40}>
        <div style={{ ...panelStyle(), height: '100%' }}>
          <Label>Top panel</Label>
        </div>
      </Splitter.Panel>
      <Splitter.Panel>
        <div style={{ ...panelStyle(), height: '100%' }}>
          <Label>Bottom panel</Label>
        </div>
      </Splitter.Panel>
    </Splitter>
  ),
};

export const ThreeColumns: StoryObj<typeof Splitter> = {
  name: 'Three panels',
  render: () => (
    <Splitter style={{ height: 300 }}>
      <Splitter.Panel defaultSize={20} min={12}>
        <div style={panelStyle()}>
          <Label>Navigation</Label>
        </div>
      </Splitter.Panel>
      <Splitter.Panel>
        <div style={panelStyle('var(--background-1)')}>
          <Label>Main content</Label>
        </div>
      </Splitter.Panel>
      <Splitter.Panel defaultSize={25} min={15}>
        <div style={panelStyle()}>
          <Label>Inspector</Label>
        </div>
      </Splitter.Panel>
    </Splitter>
  ),
};

export const CollapsiblePanels: StoryObj<typeof Splitter> = {
  name: 'Collapsible panels',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text size={3} color="muted" block>
        Hover the divider to reveal collapse/expand arrows.
      </Text>
      <Splitter style={{ height: 320 }}>
        <Splitter.Panel defaultSize={25} min={15} collapsible>
          <div style={{ ...panelStyle(), height: '100%' }}>
            <Flex direction="vertical" gap="s">
              <Text weight="medium">File Explorer</Text>
              <FileTree />
            </Flex>
          </div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div style={{ ...panelStyle('var(--background-1)'), height: '100%' }}>
            <CodeBlock />
          </div>
        </Splitter.Panel>
        <Splitter.Panel defaultSize={22} min={15} collapsible>
          <div style={{ ...panelStyle(), height: '100%' }}>
            <Flex direction="vertical" gap="s" style={{ padding: 4 }}>
              <Text weight="medium">Properties</Text>
              {['Component', 'Props', 'State', 'Hooks'].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: '6px 8px',
                    background: 'var(--interactive-1)',
                    borderRadius: 'var(--controlRounding)',
                  }}
                >
                  <Text size={3}>{item}</Text>
                </div>
              ))}
            </Flex>
          </div>
        </Splitter.Panel>
      </Splitter>
    </Flex>
  ),
};

export const MinMaxConstraints: StoryObj<typeof Splitter> = {
  name: 'Min / max constraints',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text size={3} color="muted" block>
        Left panel: min 20%, max 50%. Right panel: min 30%.
      </Text>
      <Splitter style={{ height: 260 }}>
        <Splitter.Panel defaultSize={35} min={20} max={50}>
          <div style={{ ...panelStyle(), height: '100%' }}>
            <Label>Constrained (20–50%)</Label>
          </div>
        </Splitter.Panel>
        <Splitter.Panel min={30}>
          <div style={{ ...panelStyle('var(--background-1)'), height: '100%' }}>
            <Label>Constrained (min 30%)</Label>
          </div>
        </Splitter.Panel>
      </Splitter>
    </Flex>
  ),
};

export const IDELayout: StoryObj<typeof Splitter> = {
  name: 'IDE layout (nested)',
  render: () => (
    <Splitter
      style={{
        height: 480,
        border: '1px solid var(--border-1)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {/* Left: file tree */}
      <Splitter.Panel defaultSize={20} min={12} max={35} collapsible>
        <Flex
          direction="vertical"
          style={{ height: '100%', background: 'var(--background-2)' }}
        >
          <div
            style={{
              padding: '10px 12px',
              borderBottom: '1px solid var(--border-1)',
            }}
          >
            <Text size={3} weight="medium">
              Explorer
            </Text>
          </div>
          <FileTree />
        </Flex>
      </Splitter.Panel>

      {/* Right side: editor + terminal (vertical split) */}
      <Splitter.Panel>
        <Splitter orientation="vertical" style={{ height: '100%' }}>
          <Splitter.Panel>
            <div style={{ height: '100%', background: 'var(--background-1)' }}>
              <div
                style={{
                  padding: '6px 16px',
                  borderBottom: '1px solid var(--border-1)',
                  background: 'var(--background-2)',
                }}
              >
                <Text size={3} color="muted">
                  Splitter.tsx
                </Text>
              </div>
              <CodeBlock />
            </div>
          </Splitter.Panel>

          <Splitter.Panel defaultSize={28} min={15} collapsible>
            <div style={{ height: '100%', background: 'var(--background-2)' }}>
              <div
                style={{
                  padding: '6px 16px',
                  borderBottom: '1px solid var(--border-1)',
                }}
              >
                <Text size={3} weight="medium">
                  Terminal
                </Text>
              </div>
              <div
                style={{
                  padding: '10px 16px',
                  fontFamily: 'var(--font-family-code)',
                  fontSize: 'var(--text-size-3)',
                }}
              >
                <Text size={3} color="success">
                  ✓
                </Text>
                <Text size={3}> vite build — compiled in 1.2s</Text>
                <br />
                <Text size={3} color="muted">
                  $ _
                </Text>
              </div>
            </div>
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
  ),
};

export const ResizeCallback: StoryObj<typeof Splitter> = {
  name: 'onResize callback',
  render: () => {
    const [sizes, setSizes] = useState<number[]>([50, 50]);

    return (
      <Flex direction="vertical" gap="m">
        <Flex gap="xl">
          {sizes.map((s, i) => (
            <Text key={i} size={3} color="muted">
              Panel {i + 1}: <Text weight="medium">{s.toFixed(1)}%</Text>
            </Text>
          ))}
        </Flex>
        <Splitter style={{ height: 260 }} onResize={(s) => setSizes(s)}>
          <Splitter.Panel defaultSize={50}>
            <div style={{ ...panelStyle(), height: '100%' }}>
              <Label>Panel 1</Label>
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div
              style={{ ...panelStyle('var(--background-1)'), height: '100%' }}
            >
              <Label>Panel 2</Label>
            </div>
          </Splitter.Panel>
        </Splitter>
      </Flex>
    );
  },
};

export const ExternalControlStory: StoryObj<typeof Splitter> = {
  name: 'External control via controlRef',
  render: () => {
    const controlRef = useRef<SplitterHandle>(null);
    const [collapsed, setCollapsed] = useState([false, false, false]);

    const handleCollapse = (index: number, isCollapsed: boolean) => {
      setCollapsed((prev) => {
        const next = [...prev];
        next[index] = isCollapsed;
        return next;
      });
    };

    const panels = [
      { label: 'Sidebar', color: 'var(--background-2)' },
      { label: 'Content', color: 'var(--background-1)' },
      { label: 'Inspector', color: 'var(--background-2)' },
    ];

    return (
      <Flex direction="vertical" gap="m">
        {/* Toolbar — external controls */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            padding: '8px 12px',
            background: 'var(--background-2)',
            borderRadius: 8,
            border: '1px solid var(--border-1)',
            alignItems: 'center',
          }}
        >
          <Text size={3} weight="medium" style={{ marginRight: 4 }}>
            View:
          </Text>
          {panels.map((panel, i) => (
            <button
              key={i}
              onClick={() => controlRef.current?.toggle(i)}
              style={{
                padding: '4px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-1)',
                background: collapsed[i]
                  ? 'var(--interactive-1)'
                  : 'var(--accent-9)',
                color: collapsed[i] ? 'var(--text-2)' : 'var(--white)',
                cursor: 'pointer',
                fontSize: 'var(--text-size-3)',
                fontWeight: 'var(--text-weight-medium)',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {collapsed[i] ? '＋' : '－'} {panel.label}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button
              onClick={() => {
                controlRef.current?.collapse(0);
                controlRef.current?.expand(1);
                controlRef.current?.collapse(2);
              }}
              style={{
                padding: '4px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-1)',
                background: 'var(--interactive-1)',
                cursor: 'pointer',
                fontSize: 'var(--text-size-3)',
              }}
            >
              Focus mode
            </button>
            <button
              onClick={() => {
                controlRef.current?.expand(0);
                controlRef.current?.expand(1);
                controlRef.current?.expand(2);
              }}
              style={{
                padding: '4px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-1)',
                background: 'var(--interactive-1)',
                cursor: 'pointer',
                fontSize: 'var(--text-size-3)',
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <Splitter
          style={{ height: 340 }}
          controlRef={controlRef}
          showControls={false}
          onCollapse={handleCollapse}
        >
          <Splitter.Panel defaultSize={22} min={15} collapsible>
            <div style={{ ...panelStyle(), height: '100%' }}>
              <Flex direction="vertical" gap="s">
                <Text weight="medium">Sidebar</Text>
                <FileTree />
              </Flex>
            </div>
          </Splitter.Panel>
          <Splitter.Panel min={20} collapsible>
            <div
              style={{ ...panelStyle('var(--background-1)'), height: '100%' }}
            >
              <CodeBlock />
            </div>
          </Splitter.Panel>
          <Splitter.Panel defaultSize={24} min={15} collapsible>
            <div style={{ ...panelStyle(), height: '100%' }}>
              <Flex direction="vertical" gap="s" style={{ padding: 4 }}>
                <Text weight="medium">Inspector</Text>
                {['Component', 'Props', 'State', 'Hooks', 'Events'].map(
                  (item) => (
                    <div
                      key={item}
                      style={{
                        padding: '6px 8px',
                        background: 'var(--interactive-1)',
                        borderRadius: 'var(--controlRounding)',
                      }}
                    >
                      <Text size={3}>{item}</Text>
                    </div>
                  ),
                )}
              </Flex>
            </div>
          </Splitter.Panel>
        </Splitter>
      </Flex>
    );
  },
};

export default story;

import { Meta, StoryObj } from '@storybook/react';
import { Dropdown, Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { NavigationList } from './NavigationList.tsx';
import { Link, LinkAction } from './components';

const story: Meta<typeof NavigationList> = {
  title: 'Components/Navigation/NavigationList',
  component: NavigationList,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

export const NavigationListStory: StoryObj<typeof NavigationList> = {
  name: 'Using NavigationList',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Standard NavigationList</Text.Heading>
        <div style={{ width: 350 }}>
          <NavigationList>
            <NavigationList.Group>
              <NavigationList.Link
                icon={<Icon i="arrow_back" />}
                label="Back"
              />
            </NavigationList.Group>
            <NavigationList.Group title="Personal settings">
              <NavigationList.Link
                href="#"
                icon={<Icon i="tune" />}
                label="Profile"
              >
                <LinkAction
                  label="Create new profile"
                  icon={<Icon i="add" />}
                />
                <LinkAction
                  label="Manage profile settings"
                  icon={<Icon i="settings" />}
                  showOnlyOnHover
                />
              </NavigationList.Link>
              <NavigationList.Link
                href="#"
                icon={<Icon i="account_circle" />}
                badge="NEW"
                label="Preferences"
              >
                <Dropdown
                  content={
                    <Dropdown.Menu>
                      <Dropdown.Action label="Test" />
                      <Dropdown.Action label="Test" />
                      <Dropdown.Action label="Test" />
                    </Dropdown.Menu>
                  }
                >
                  <LinkAction
                    label="Manage profile settings"
                    icon={<Icon i="settings" />}
                    showOnlyOnHover
                  />
                </Dropdown>
              </NavigationList.Link>
              <NavigationList.Link
                href="#"
                icon={<Icon i="notifications" />}
                label="Notifications"
              />
              <NavigationList.Link
                icon={<Icon i="keyboard_alt" />}
                label="Keyboard shortcuts"
              />
            </NavigationList.Group>
            <NavigationList.Group title="Product settings">
              <NavigationList.GroupAction
                label="Search"
                icon={<Icon i="search" />}
                disabled
              />
              <Dropdown
                content={
                  <Dropdown.Menu>
                    <Dropdown.Action
                      icon={<Icon i="groups" />}
                      label="Browse teams"
                    />
                    <Dropdown.Action icon={<Icon i="add" />} label="Add team" />
                  </Dropdown.Menu>
                }
              >
                <NavigationList.GroupAction
                  label="More"
                  icon={<Icon i="more_horiz" />}
                />
              </Dropdown>
              <NavigationList.Link label="Attributes" badge="4" />
              <NavigationList.Link label="Automations" selected badge="2" />
              <NavigationList.Link label="Copilot" />
              <NavigationList.Link label="Group mentions" />
              <NavigationList.Link label="Import" />
              <NavigationList.Link label="Integrations" />
              <NavigationList.Link label="Task forms" />
            </NavigationList.Group>
            <NavigationList.Group title="Workspace settings">
              <NavigationList.GroupAction label="Add" icon={<Icon i="add" />} />
              <NavigationList.Link label="General" />
              <NavigationList.Link
                icon={<Icon i="webhook" />}
                label="API & Webhooks"
              />
              <NavigationList.Link label="Authentification" />
              <NavigationList.Link label="Billing" />
              <NavigationList.Link label="Security Log" />
              <NavigationList.Link label="Users" />
            </NavigationList.Group>
          </NavigationList>
        </div>
      </Flex>
    );
  },
};

export const NavigationListWithNestedLinks: StoryObj<typeof NavigationList> = {
  name: 'Using NavigationList with nested links',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Standard NavigationList</Text.Heading>
        <div style={{ width: 350 }}>
          <NavigationList>
            <NavigationList.Group>
              <NavigationList.Link icon={<Icon i="home" />} label="Home" />
            </NavigationList.Group>

            <NavigationList.Group title="My Music">
              <NavigationList.Link
                icon={<Icon i="favorite" />}
                label="Favorite Tracks"
              />
              <NavigationList.Link
                icon={<Icon i="library_music" />}
                label="My Library"
              >
                <LinkAction
                  label="Add Playlist"
                  icon={<Icon i="playlist_add" />}
                />
                <LinkAction label="Import Music" icon={<Icon i="upload" />} />
              </NavigationList.Link>
              <NavigationList.Link
                icon={<Icon i="history" />}
                label="Listening History"
              />
              <NavigationList.Link
                icon={<Icon i="download" />}
                label="Downloaded Tracks"
              />
            </NavigationList.Group>

            <NavigationList.Group title="Playlists">
              <NavigationList.GroupAction
                label="Create Playlist"
                icon={<Icon i="add" />}
              />
              <NavigationList.Link
                icon={<Icon i="trending_up" />}
                label="Top Charts"
              >
                <Dropdown
                  content={
                    <Dropdown.Menu>
                      <Dropdown.Action label="United States" />
                      <Dropdown.Action label="Global" />
                      <Dropdown.Action label="United Kingdom" />
                    </Dropdown.Menu>
                  }
                >
                  <NavigationList.LinkAction
                    label="Select Region"
                    icon={<Icon i="arrow_drop_down" />}
                  />
                </Dropdown>
              </NavigationList.Link>
              <NavigationList.Link
                icon={<Icon i="new_releases" />}
                label="New Releases"
              />
              <NavigationList.Link icon={<Icon i="radio" />} label="Radio" />
            </NavigationList.Group>

            <NavigationList.Group title="Find music">
              <NavigationList.GroupAction
                label="Search"
                icon={<Icon i="search" />}
              />
              <NavigationList.Link label="By region" icon={<Icon i="public" />}>
                <NavigationList.Link label="World" />
                <NavigationList.Link label="USA" />
                <NavigationList.Link label="UK" />
              </NavigationList.Link>
              <NavigationList.Link
                label="By genre"
                icon={<Icon i="graphic_eq" />}
                badge="5"
                selected
              >
                <NavigationList.Link label="Pop" />
                <NavigationList.Link label="Rock" />
                <NavigationList.Link label="Hip-Hop" />
                <NavigationList.Link label="Electronic" />
                <NavigationList.Link label="Jazz" />
                <NavigationList.Link
                  label="Classical"
                  icon={<Icon i="piano" />}
                  selected
                  badge="3"
                >
                  <NavigationList.Link label="Piano" />
                  <NavigationList.Link label="Violin" />
                  <NavigationList.Link label="Guitar" />
                  <NavigationList.Link
                    label="Opera"
                    selected
                    icon={<Icon i="spatial_audio_off" />}
                  >
                    <NavigationList.Link label="Live" selected />
                    <NavigationList.Link label="Concert" badge="4" />
                  </NavigationList.Link>
                </NavigationList.Link>
              </NavigationList.Link>
            </NavigationList.Group>

            <NavigationList.Group title="Settings">
              <NavigationList.Link
                icon={<Icon i="settings" />}
                label="General"
              />
              <NavigationList.Link
                icon={<Icon i="equalizer" />}
                label="Equalizer"
              />
              <NavigationList.Link
                icon={<Icon i="notifications" />}
                label="Notifications"
              />
              <NavigationList.Link
                icon={<Icon i="account_circle" />}
                label="Account"
              >
                <LinkAction
                  label="Edit Profile"
                  icon={<Icon i="edit" />}
                  showOnlyOnHover
                />
              </NavigationList.Link>
            </NavigationList.Group>
          </NavigationList>
        </div>
      </Flex>
    );
  },
};

export default story;

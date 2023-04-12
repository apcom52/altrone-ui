import { ButtonContainer, Form, FormField, FormGroup, FormGroupVariant, Modal } from '../index';
import { Altrone } from '../../hocs';
import { Align, Direction, Role, Size, Theme } from '../../types';
import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '../button';
import FloatingBox, { FloatingBoxMobileBehaviour } from './FloatingBox/FloatingBox';
import { Heading, Paragraph } from '../typography';
import { DatePicker, NumberInput, RadioList, Select, Switcher, TextInput } from '../form';

const Template = ({ Component, dark, ...args }) => {
  return (
    <Altrone theme={dark ? Theme.dark : Theme.light}>
      <Component {...args} />
    </Altrone>
  );
};

const FloatingBoxTemplate = (args) => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonRef, setButtonRef] = useState(null);

  return (
    <div
      style={{
        padding: 100,
        backgroundImage:
          'url(https://i.pinimg.com/474x/93/3c/61/933c6195d6c50705fd2d4e6d110916d3.jpg)'
      }}
      className={clsx('altrone', {
        'altrone--dark': args.dark
      })}>
      <Button
        onClick={() => {
          setIsVisible((old) => !old);
        }}
        ref={setButtonRef}>
        Open floating box
      </Button>
      {isVisible && (
        <FloatingBox
          targetElement={buttonRef}
          maxHeight={100}
          onClose={() => setIsVisible(false)}
          mobileBehaviour={FloatingBoxMobileBehaviour.modal}>
          <Heading level={6}>Wants more?</Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aliquid
            amet consequuntur distinctio ducimus enim error et ex illum minus molestiae mollitia
            nemo nulla obcaecati, provident quia reprehenderit voluptatem!
          </Paragraph>
        </FloatingBox>
      )}
    </div>
  );
};

const GENDERS = [
  {
    label: 'Male',
    value: 'male'
  },
  {
    label: 'Female',
    value: 'female'
  }
];

const FormTemplate = (args) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState('');
  const [music, setMusic] = useState('');
  const [movies, setMovies] = useState('');
  const [books, setBooks] = useState('');

  return (
    <Altrone theme={args.dark ? Theme.dark : Theme.light}>
      <Form>
        <FormGroup variant={FormGroupVariant.linear} disabled>
          <FormField label="First name" required>
            <TextInput value={name} onChange={setName} />
          </FormField>
          <FormField label="Last name" required>
            <TextInput value={surname} onChange={setSurname} />
          </FormField>
        </FormGroup>
        <FormGroup variant={FormGroupVariant.linear} weights={[1, 1, 2]}>
          <FormField label="Gender">
            <Select value={gender} onChange={setGender} options={GENDERS} />
          </FormField>
          <FormField label="Birth date" required>
            <DatePicker value={birthDate} onChange={setBirthDate} />
          </FormField>
          <FormField label="Father name">
            <TextInput value={fatherName} onChange={setFatherName} disabled />
          </FormField>
        </FormGroup>
        <FormGroup variant={FormGroupVariant.row} required>
          <FormField label="Describe your favorite music and albums">
            <TextInput value={music} onChange={setMusic} />
          </FormField>
          <FormField label="Movies" required>
            <TextInput value={movies} onChange={setMovies} />
          </FormField>
          <FormField label="Books">
            <TextInput value={books} onChange={setBooks} />
          </FormField>
        </FormGroup>
        <Switcher value={false} align={Align.end}>
          Agree with Privacy Policy
        </Switcher>
        <FormGroup variant={FormGroupVariant.row} required>
          <FormField label="Describe your favorite music and albums">just a text</FormField>
        </FormGroup>
      </Form>
    </Altrone>
  );
};

const ModalTemplate = (args) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Altrone theme={args.dark ? Theme.dark : Theme.light}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cum dolore, esse,
        fuga ipsa iste maxime neque pariatur perspiciatis placeat porro repellendus sint sunt vel. A
        deserunt temporibus velit.
      </p>
      <Button onClick={() => setIsModalVisible(true)}>Open modal</Button>
      {isModalVisible && <Modal onClose={() => setIsModalVisible(false)} {...args} />}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cum dolore, esse,
        fuga ipsa iste maxime neque pariatur perspiciatis placeat porro repellendus sint sunt vel. A
        deserunt temporibus velit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cum dolore, esse,
        fuga ipsa iste maxime neque pariatur perspiciatis placeat porro repellendus sint sunt vel. A
        deserunt temporibus velit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cum dolore, esse,
        fuga ipsa iste maxime neque pariatur perspiciatis placeat porro repellendus sint sunt vel. A
        deserunt temporibus velit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cum dolore, esse,
        fuga ipsa iste maxime neque pariatur perspiciatis placeat porro repellendus sint sunt vel. A
        deserunt temporibus velit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cum dolore, esse,
        fuga ipsa iste maxime neque pariatur perspiciatis placeat porro repellendus sint sunt vel. A
        deserunt temporibus velit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cum dolore, esse,
        fuga ipsa iste maxime neque pariatur perspiciatis placeat porro repellendus sint sunt vel. A
        deserunt temporibus velit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cum dolore, esse,
        fuga ipsa iste maxime neque pariatur perspiciatis placeat porro repellendus sint sunt vel. A
        deserunt temporibus velit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cum dolore, esse,
        fuga ipsa iste maxime neque pariatur perspiciatis placeat porro repellendus sint sunt vel. A
        deserunt temporibus velit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cum dolore, esse,
        fuga ipsa iste maxime neque pariatur perspiciatis placeat porro repellendus sint sunt vel. A
        deserunt temporibus velit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cum dolore, esse,
        fuga ipsa iste maxime neque pariatur perspiciatis placeat porro repellendus sint sunt vel. A
        deserunt temporibus velit.
      </p>
    </Altrone>
  );
};

export const ButtonContainerExample = Template.bind({});
ButtonContainerExample.args = {
  Component: ButtonContainer,
  children: [
    <Button key={0}>Reply</Button>,
    <Button key={1}>Save</Button>,
    <Button key={2} role={Role.danger}>
      Delete
    </Button>,
    <Button key={3} role={Role.primary}>
      Send
    </Button>
  ],
  margin: 5
};
ButtonContainerExample.argTypes = {
  direction: {
    control: 'select',
    options: [Direction.horizontal, Direction.vertical]
  },
  align: {
    control: 'select',
    options: [Align.start, Align.center, Align.end]
  }
};

export const FloatingBoxExample = FloatingBoxTemplate.bind({});
FloatingBoxExample.args = {
  children: 'Hello world',
  placement: 'auto',
  dark: false
};

export const FormExample = FormTemplate.bind({});
FormExample.args = {
  dark: false
};

export const ModalExample = ModalTemplate.bind({});
ModalExample.args = {
  title: 'Modal title',
  children: (
    <>
      <p>Fill information about you</p>
      <Form>
        <FormGroup variant={FormGroupVariant.row}>
          <FormField label="Your name">
            <TextInput value="" onChange={() => null} placeholder="First name and surname" />
          </FormField>
          <FormField label="Age">
            <NumberInput value={18} onChange={() => null} />
          </FormField>
          <FormField label="Gender">
            <RadioList
              name="gender"
              options={[
                {
                  label: 'Male',
                  value: 0
                },
                {
                  label: 'Female',
                  value: 1
                }
              ]}
              value={0}
              onChange={() => null}
            />
          </FormField>
        </FormGroup>
      </Form>
    </>
  ),
  actions: [
    {
      label: 'Reset',
      align: Align.start,
      onClick: () => null
    },
    {
      label: 'Approve',
      align: Align.end,
      role: Role.success,
      onClick: () => null
    }
  ],
  fluid: false,
  dark: false,
  reduceMotion: false
};
ModalExample.argTypes = {
  size: {
    control: 'select',
    options: [Size.small, Size.medium, Size.large]
  }
};

export default {
  component: FormExample,
  title: 'Containers'
};

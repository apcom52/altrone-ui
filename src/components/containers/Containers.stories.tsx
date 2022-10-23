import {Box, Form, FormField, FormGroup, FormGroupVariant} from './index'
import {withAltrone} from "../../hocs";
import {Theme} from "../../types";
import {useState} from "react";
import clsx from "clsx";
import {Button} from "../button";
import FloatingBox from "./FloatingBox/FloatingBox";
import {Heading, Paragraph} from "../typography";
import {DatePicker, Select, Switcher, TextInput} from "../form";
import {Align} from "../../types/Align";

const Template = ({component, dark, ...args}) => {
    return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light,
  })({
    ...args,
  })
}

const FloatingBoxTemplate = args => {
  const [isVisible, setIsVisible] = useState(false)
  const [buttonRef, setButtonRef] = useState(null)

  return <div
    style={{ padding: 100, backgroundImage: 'url(https://i.pinimg.com/474x/93/3c/61/933c6195d6c50705fd2d4e6d110916d3.jpg)' }}
    className={clsx('altrone', {
      'altrone--dark': args.dark
    })}
  >
    <Button onClick={() => {
      setIsVisible(old => !old)
    }} ref={setButtonRef}>Open floating box</Button>
    {isVisible && <FloatingBox targetRef={buttonRef} onClose={() => setIsVisible(false)}>
      <Heading level={6}>Wants more?</Heading>
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aliquid amet consequuntur distinctio ducimus enim error et ex illum minus molestiae mollitia nemo nulla obcaecati, provident quia reprehenderit voluptatem!</Paragraph>
    </FloatingBox>}
  </div>
}

const GENDERS = [{
  label: 'Male',
  value: 'male'
}, {
  label: 'Female',
  value: 'female'
}]

const FormTemplate = args => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [birthDate, setBirthDate] = useState(null)
  const [gender, setGender] = useState('')
  const [music, setMusic] = useState('')
  const [movies, setMovies] = useState('')
  const [books, setBooks] = useState('')

  return <div className='altrone'>
    <Form>
      <FormGroup variant={FormGroupVariant.linear} disabled>
        <FormField label='First name' required>
          <TextInput value={name} onChange={setName} />
        </FormField>
        <FormField label='Last name' required>
          <TextInput value={surname} onChange={setSurname} />
        </FormField>
      </FormGroup>
      <FormGroup variant={FormGroupVariant.linear} weights={[1, 1, 2]}>
        <FormField label='Gender'>
          <Select value={gender} onChange={setGender} options={GENDERS} />
        </FormField>
        <FormField label='Birth date' required>
          <DatePicker value={birthDate} onChange={setBirthDate} />
        </FormField>
        <FormField label='Father name'>
          <TextInput value={fatherName} onChange={setFatherName} />
        </FormField>
      </FormGroup>
      <FormGroup variant={FormGroupVariant.row} required>
        <FormField label='Describe your favorite music and albums'>
          <TextInput value={music} onChange={setMusic} />
        </FormField>
        <FormField label='Movies' required>
          <TextInput value={movies} onChange={setMovies} />
        </FormField>
        <FormField label='Books'>
          <TextInput value={books} onChange={setBooks} />
        </FormField>
      </FormGroup>
      <Switcher value={false} align={Align.end}>Agree with Privacy Policy</Switcher>
      <FormGroup variant={FormGroupVariant.row} required>
        <FormField label='Describe your favorite music and albums'>
          just a text
        </FormField>
      </FormGroup>
    </Form>
  </div>
}

export const BoxExample = Template.bind({})
BoxExample.args = {
  component: Box,
  tagName: 'div',
  children: 'Hello world',
  margin: 5,
}

export const FloatingBoxExample = FloatingBoxTemplate.bind({})
FloatingBoxExample.args = {
  children: 'Hello world',
  placement: 'auto',
  dark: false,
}

export const FormExample = FormTemplate.bind({})
FormExample.args = {
  dark: false
}

export default {
  component: BoxExample,
  title: 'Containers'
}
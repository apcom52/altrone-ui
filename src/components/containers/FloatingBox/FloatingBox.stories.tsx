import FloatingBox from './FloatingBox'
import {Button} from "../../button";
import clsx from "clsx";
import {useRef, useState} from "react";
import {Heading, Paragraph} from "../../typography";

export default {
  component: FloatingBox,
  title: 'Floating Box'
}

const Template = args => {
  const [isVisible, setIsVisible] = useState(false)
  const [buttonRef, setButtonRef] = useState(null)

  return <div
    style={{ padding: 100, backgroundImage: 'url(https://i.pinimg.com/474x/93/3c/61/933c6195d6c50705fd2d4e6d110916d3.jpg)' }}
    className={clsx('altrone', {
      'altrone--dark': args.dark
    })}
  >
    <Button onClick={() => {
      console.log('click', isVisible);
      setIsVisible(old => !old)
    }} ref={setButtonRef}>Open floating box</Button>
    {isVisible && <FloatingBox targetRef={buttonRef} onClose={() => setIsVisible(false)}>
      <Heading level={6}>Wants more?</Heading>
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aliquid amet consequuntur distinctio ducimus enim error et ex illum minus molestiae mollitia nemo nulla obcaecati, provident quia reprehenderit voluptatem!</Paragraph>
    </FloatingBox>}
  </div>
}

export const Default = Template.bind({})
Default.args = {
  children: 'Hello world',
  placement: 'auto',
  dark: false,
}
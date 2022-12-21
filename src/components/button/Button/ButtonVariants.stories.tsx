import {ButtonVariant} from "./Button";
import {Role, Size} from "../../../types";
import {Button} from "./index";
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer";
import {Icon} from "../../icons";

export const ButtonVariantsStory = ({dark = false, ...args}) => {
  const variants = [ButtonVariant.default, ButtonVariant.borders, ButtonVariant.transparent, ButtonVariant.text]
  const roles = [Role.default, Role.primary, Role.success, Role.danger]

  const onFocusClick = () => {
    const buttons = document.body.querySelectorAll('.altrone table button')

    let counter = 0;
    let interval = setInterval(() => {
      if (counter === buttons.length - 1) {
        clearInterval(interval)
      }

      buttons[counter].focus()
      counter++;
    }, 150)
  }

  return <>
    <ButtonContainer>
      <Button onClick={onFocusClick}>Run focus test</Button>
    </ButtonContainer>
    <hr/>
    <table style={{ border: '1px solid lightgray' }}>
      <tr>
        <th>-</th>
        {variants.map((variant, variantIndex) => (
          <th key={variantIndex}><strong>{variant}</strong></th>
        ))}
      </tr>
      {roles.map((role, roleIndex) => (
        <tr key={roleIndex}>
          <td><strong>{role}</strong></td>
          {variants.map((variant, variantIndex) => (
            <td key={variantIndex} style={{ border: '1px solid lightgray', padding: 10 }}>
              <ButtonContainer>
                <Button variant={variant} role={role}>Action</Button>
                <Button size={Size.small} variant={variant} role={role}>Action</Button>
                <Button size={Size.large} variant={variant} role={role}>Action</Button>
                <Button disabled variant={variant} role={role}>Action</Button>
                <Button leftIcon={<Icon i='check' />} variant={variant} role={role}>Action</Button>
                <Button rightIcon={<Icon i='check' />} variant={variant} role={role}>Action</Button>
                <Button leftIcon={<Icon i='check' />} rightIcon={<Icon i='check' />} variant={variant} role={role}>Action</Button>

                <Button size={Size.small} leftIcon={<Icon i='check' />} variant={variant} role={role}>Action</Button>
                <Button size={Size.small} rightIcon={<Icon i='check' />} variant={variant} role={role}>Action</Button>
                <Button size={Size.small} leftIcon={<Icon i='check' />} rightIcon={<Icon i='check' />} variant={variant} role={role}>Action</Button>

                <Button size={Size.large} leftIcon={<Icon i='check' />} variant={variant} role={role}>Action</Button>
                <Button size={Size.large} rightIcon={<Icon i='check' />} variant={variant} role={role}>Action</Button>
                <Button size={Size.large} leftIcon={<Icon i='check' />} rightIcon={<Icon i='check' />} variant={variant} role={role}>Action</Button>

                <Button variant={variant} role={role} isIcon><Icon i='laptop' /></Button>
                <Button size={Size.small} variant={variant} role={role} isIcon><Icon i='laptop' /></Button>
                <Button size={Size.large} variant={variant} role={role} isIcon><Icon i='laptop' /></Button>

                <Button variant={variant} role={role} indicator={{ position: 'baseline' }}>Action</Button>
                <Button variant={variant} role={role} indicator={{ position: 'corner' }}>Action</Button>
                <Button variant={variant} role={role} indicator={{ position: 'baseline', value: 99 }}>Action</Button>
                <Button variant={variant} role={role} indicator={{ position: 'corner', value: 99 }}>Action</Button>

                <Button isIcon variant={variant} role={role} indicator={{ position: 'baseline' }}><Icon i='face' /></Button>
                <Button isIcon variant={variant} role={role} indicator={{ position: 'corner' }}><Icon i='face' /></Button>
                <Button isIcon variant={variant} role={role} indicator={{ position: 'baseline', value: 99 }}><Icon i='face' /></Button>
                <Button isIcon variant={variant} role={role} indicator={{ position: 'corner', value: 99 }}><Icon i='face' /></Button>
              </ButtonContainer>
            </td>
          ))}
        </tr>
      ))}
    </table>
  </>
}
import {ButtonVariant} from "./Button";
import {Role, Size} from "../../../types";
import {Button} from "./index";
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer";
import {Icon} from "../../icons";

export const ButtonVariantsStory = args => {
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
            <td key={variantIndex}>
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
              </ButtonContainer>
            </td>
          ))}
        </tr>
      ))}
    </table>
  </>
}

export const testButtonVariants_focus = async ({ canvasElement }) => {
  // const canvas = within(canvasElement);
  //
  // const onFocus = jest.fn()
  // const onBlur = jest.fn()
  // const onClick = jest.fn()
  //
  // const button = canvas.getByTestId('alt-test-button')
  //
  // await button.focus()
}


export default ButtonVariantsStory
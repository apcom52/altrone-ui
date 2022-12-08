import {useState} from "react";
import {Altrone} from "../../../hocs";
import {Theme} from "../../../types";
import {Checkbox, CheckboxList} from "./index";

export const CheckboxStory = ({ dark = false, ...args }) => {
  const [checked, setChecked] = useState(false)

  return <Altrone theme={dark ? Theme.dark : Theme.light}>
    <Checkbox {...args} checked={checked} onChange={setChecked} />
  </Altrone>
}

export const CheckboxListStory = ({ dark = false, ...args }) => {
  const [checked, setChecked] = useState<string[]>([])

  const checkOption = (option: string) => {
    setChecked(old => [...old, option])
  }

  const uncheckOption = (option: string) => {
    setChecked(old => [...old.filter(o => o !== option)])
  }

  return <Altrone theme={dark ? Theme.dark : Theme.light}>
    <CheckboxList {...args}>
      {['Queue', 'Word', 'Eye', 'Rain', 'Tree', 'Yellow', 'Unique', 'Isolation', 'Ominous', 'Pepper'].map((label, labelIndex) => {
        return <Checkbox key={labelIndex} onChange={() => {
          checked.indexOf(label) > -1 ? uncheckOption(label) : checkOption(label)
        }} checked={checked.indexOf(label) > -1}>
          {label}
        </Checkbox>
      })}
    </CheckboxList>
  </Altrone>
}
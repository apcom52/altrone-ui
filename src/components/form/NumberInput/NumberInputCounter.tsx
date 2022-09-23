import {Icon} from "../../icons";
import {memo} from "react";
import './number-input-counter.scss'

const NumberInputCounter = () => {
  return <div className='alt-number-input-counter'>
    <button className='alt-number-input-counter__increase'><Icon i='expand_less' /></button>
    <button className='alt-number-input-counter__decrease'><Icon i='expand_more' /></button>
  </div>
}

export default memo(NumberInputCounter)
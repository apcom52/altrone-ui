import {memo} from "react";
import './toolbar.scss';

const Toolbar = ({ children }) => {
  return <div className='alt-toolbar'>
    {children}
  </div>
}

export default memo(Toolbar)
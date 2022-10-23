import {useMemo} from "react";
import {InputIslandType} from "./TextInput";

export function useInputIsland(island, icon, text, disabled = false) {
  return useMemo(() => {
    const { type, content } = island || {}

    if (text || type === InputIslandType.text) {
      return <div className='alt-text-input__text-island'>{text || content}</div>
    } else if (icon || type === InputIslandType.icon) {
      return <div className='alt-text-input__icon-island'>{icon || content}</div>
    } else if (type === InputIslandType.actions) {
      return <div className='alt-text-input__actions-island'>
        {content?.map((action, actionIndex) => (
          <button
            key={actionIndex}
            title={action.title}
            className='alt-text-input__action-button'
            onClick={action.onClick}
            disabled={disabled || action.disabled}
            type='button'
          >
            {action.icon}
          </button>
        ))}
      </div>
    } else if (type === InputIslandType.components) {
      return <div className='alt-text-input__components-island'>{content}</div>
    }

    return null
  }, [icon, text, island, disabled])
}
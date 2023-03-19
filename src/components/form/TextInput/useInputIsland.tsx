import { useMemo } from 'react';
import { InputIsland, InputIslandAction, InputIslandType } from './TextInput';

export function useInputIsland(
  island?: InputIsland,
  icon?: JSX.Element,
  text?: string,
  disabled = false
) {
  return useMemo(() => {
    const { type, content } = island || {};

    if (text || type === InputIslandType.text) {
      return <div className="alt-text-input__text-island">{text || String(content)}</div>;
    } else if (icon || type === InputIslandType.icon) {
      return <div className="alt-text-input__icon-island">{icon || (content as JSX.Element)}</div>;
    } else if (type === InputIslandType.actions) {
      return (
        <div className="alt-text-input__actions-island">
          {(content as InputIslandAction[])?.map((action, actionIndex) => (
            <button
              key={actionIndex}
              title={action.title}
              className="alt-text-input__action-button"
              onClick={action.onClick}
              disabled={disabled || action.disabled}
              type="button">
              {action.icon}
            </button>
          ))}
        </div>
      );
    } else if (type === InputIslandType.components) {
      return <div className="alt-text-input__components-island">{content as JSX.Element}</div>;
    }

    return null;
  }, [icon, text, island, disabled]);
}

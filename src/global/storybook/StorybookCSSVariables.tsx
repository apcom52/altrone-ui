import s from './variablesDisplay.module.scss';
import { Text, TextHeadingRoles } from '../../components';
import { useMediaMatch } from '../../utils';

interface StorybookCSSVariablesProps {
  title: string;
  data: (
    | {
        name: string;
        type: 'color' | 'surface' | 'text' | 'shadow' | 'border';
      }
    | string
  )[];
}

export const StorybookCSSVariables = ({
  title = '',
  data = [],
}: StorybookCSSVariablesProps) => {
  useMediaMatch('(prefers-color-scheme: dark)');

  const computedStyles = getComputedStyle(document.documentElement);

  return (
    <div>
      <Text.Heading role={TextHeadingRoles.heading}>{title}</Text.Heading>
      <div className={s.Grid}>
        {data.map((variable, index) => {
          let preview = null;

          const isSimpleVariable = typeof variable === 'string';

          if (isSimpleVariable || variable.type === 'color') {
            preview = (
              <div
                className={s.ColorPreview}
                style={{
                  background: `var(--${isSimpleVariable ? variable : variable.name})`,
                }}
              />
            );
          } else if (variable.type === 'border') {
            preview = (
              <div
                className={s.BorderPreview}
                style={{
                  borderColor: `var(--${variable.name})`,
                }}
              />
            );
          } else if (variable.type === 'text') {
            preview = (
              <div
                className={s.TextPreview}
                style={{
                  color: `var(--${variable.name})`,
                }}
              >
                Abc
              </div>
            );
          }

          const variableName = isSimpleVariable ? variable : variable.name;

          return (
            <div key={index} className={s.Item}>
              {preview}
              <div className={s.Label}>
                <div className={s.Name} title={variableName}>
                  {variableName}
                </div>
                <div className={s.Value}>
                  {computedStyles.getPropertyValue(`--${variableName}`)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

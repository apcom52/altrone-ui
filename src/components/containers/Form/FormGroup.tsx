import { useMemo } from 'react';
import './form-group.scss';
import { Align } from '../../../types';
import clsx from 'clsx';
import { FormContext, FormContextProps, useFormContext } from '../../../contexts';

export enum FormGroupVariant {
  default = 'default',
  linear = 'linear',
  row = 'row'
}

interface FormGroupProps extends React.HTMLProps<HTMLDivElement>, FormContextProps {
  variant?: FormGroupVariant;
  align?: Align;
  weights?: number[];
}

/**
 * This component is used to place group of form fields into the layout
 * @param variant
 * @param align
 * @param children
 * @param className
 * @param required
 * @param weights
 * @constructor
 */
const FormGroup = ({
  variant = FormGroupVariant.default,
  align = Align.start,
  children,
  className,
  required,
  weights = []
}: FormGroupProps) => {
  const context = useFormContext();

  const gridTemplateColumns = useMemo(() => {
    if (variant !== FormGroupVariant.linear) {
      return undefined;
    }

    if (!children?.length) {
      return '1fr';
    }

    if (weights.length === 0) {
      return `repeat(${children.length}, 1fr)`;
    }

    const sizes = [];
    for (let childrenIndex = 0; childrenIndex < children.length; childrenIndex++) {
      sizes.push((weights[childrenIndex] !== undefined ? weights[childrenIndex] : 1) + 'fr');
    }

    return sizes.join(' ');
  }, [variant, children, weights]);

  return (
    <FormContext.Provider
      value={{
        required: required || context.required
      }}>
      <div
        className={clsx('alt-form-group', className, {
          'alt-form-group--variant-linear': variant === FormGroupVariant.linear,
          'alt-form-group--variant-row': variant === FormGroupVariant.row,
          'alt-form-group--align-end': align === Align.end
        })}
        style={{ gridTemplateColumns }}
        data-testid="alt-test-form-group">
        {children}
      </div>
    </FormContext.Provider>
  );
};

export default FormGroup;

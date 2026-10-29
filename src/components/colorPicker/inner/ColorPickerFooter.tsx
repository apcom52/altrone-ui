import { Button } from 'components/button/Button.tsx';
import { Flex } from 'components/flex/Flex.tsx';
import { useLocalization } from 'components/application';

interface ColorPickerFooterProps {
  clearable?: boolean;
  onClear: () => void;
  onApply: () => void;
}

export const ColorPickerFooter = ({
  clearable,
  onClear,
  onApply,
}: ColorPickerFooterProps) => {
  const t = useLocalization();

  return (
    <Flex justify="center" gap="s">
      {clearable && <Button label={t('common.clear')} onClick={onClear} />}
      <Button label={t('common.apply')} variant="submit" onClick={onApply} />
    </Flex>
  );
};

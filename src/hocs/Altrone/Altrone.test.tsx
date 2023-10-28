import { useThemeContext } from '../../contexts';
import { Altrone } from './Altrone';
import { render, screen } from '@testing-library/react';
import { AltroneOptions } from '../AltroneConfig';
import { TEST_MATCH_MEDIA_FN } from '../../constants/_testUtils';

describe('Altrone', () => {
  window.matchMedia = TEST_MATCH_MEDIA_FN;

  test('Altrone Options should override correctly', () => {
    const InnerComponent = () => {
      const { options } = useThemeContext();

      return <div data-testid="comp">{String(options.global.reduceMotion)}</div>;
    };

    render(
      <Altrone options={{ global: { reduceMotion: false } }}>
        <InnerComponent />
        <AltroneOptions options={{ global: { reduceMotion: true } }}>
          <InnerComponent />
        </AltroneOptions>
      </Altrone>
    );

    const innerComponents = screen.getAllByTestId('comp').map((item) => item.innerHTML);
    expect(innerComponents).toStrictEqual(['false', 'true']);
  });
});

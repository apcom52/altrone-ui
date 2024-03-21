import { ReactElement } from 'react';

export type SafeReactElement = ReactElement | null | (ReactElement | null)[];

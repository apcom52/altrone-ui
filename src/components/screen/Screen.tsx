import { memo, useMemo, useState } from 'react';
import s from './screen.module.css';
import { ScreenProps } from './Screen.types';
import { ScreenSidebarContext } from './Screen.context';

export const Screen = memo<ScreenProps>(({ ref, children, sidebar, header, ...restProps }) => {

  const [sidebarVisible, setSidebarVisible] = useState(true);

  const hasSidebar = Boolean(sidebar && sidebarVisible);
  const hasHeader = Boolean(header);

  const contextValue = useMemo(
    () => ({
      visible: hasSidebar,
      setVisible: setSidebarVisible,
    }),
    [hasSidebar, sidebar],
  );

  return (
    <ScreenSidebarContext value={contextValue}>
      <div ref={ref} className={s.Screen} {...restProps}>
        {hasSidebar && <aside className={s.Sidebar}>{sidebar}</aside>}
        <div className={s.Layout}>
          {hasHeader && <header className={s.Header}>{header}</header>}
          <main className={s.Content}>{children}</main>
        </div>
        {hasHeader && <div className={s.HeaderBackdrop} />}
      </div>
    </ScreenSidebarContext>
  );
});

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Style from './layout.module.scss';
import PlayAlert from './components/play-alert/PlayAlert';
import Sidebar from './components/sidebar/Sidebar';
import Navigation from './components/nav/Navigation';
import useTheme from './hooks/useTheme';

function Layout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const themeClass = theme == 'dark' ? 'theme_dark' : 'theme_light';
  return (
    <div className={`${Style.root__layout} ${themeClass}`}>
      <Sidebar>
        <Navigation />
      </Sidebar>
      <div className={`main_content ${Style.main__content}`}>
        {children}
        <Toaster />
        <PlayAlert />
      </div>
    </div>
  );
}
export default Layout;

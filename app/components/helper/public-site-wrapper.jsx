"use client";
import { usePathname } from 'next/navigation';
import Navbar from '../navbar';
import Footer from '../footer';
import ScrollToTop from './scroll-to-top';
import ScrollProgress from './scroll-progress';
import CommandPalette from './command-palette';
import KonamiEasterEgg from './konami-easter-egg';
import MouseTrail from './mouse-trail';
import FloatingOrbs from './floating-orbs';
import ReturnVisitor from './return-visitor';
import SectionDotsSidebar from './section-dots-sidebar';
import KeyboardGuide from './keyboard-guide';
import QuickFloatContact from './quick-float-contact';
import AnnouncementBanner from './announcement-banner';
import ColorThemeSwitcher from './color-theme-switcher';
import CustomCursor from './custom-cursor';
import PageTransition from './page-transition';

export default function PublicSiteWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  // Admin routes: just render children, no public chrome at all
  if (isAdmin) {
    return <>{children}</>;
  }

  // Public routes: full site layout with all features
  return (
    <>
      <ScrollProgress />
      <CommandPalette />
      <KonamiEasterEgg />
      <MouseTrail />
      <FloatingOrbs />
      <ReturnVisitor />
      <SectionDotsSidebar />
      <KeyboardGuide />
      <QuickFloatContact />
      <ColorThemeSwitcher />
      <AnnouncementBanner />
      <CustomCursor />
      <main
        className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]"
        style={{ color: 'var(--text-primary)' }}
      >
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}

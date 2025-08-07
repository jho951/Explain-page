import dynamic from 'next/dynamic';
import { IconName, SvgComponent } from '@/components/atoms/Icon';

function getIconComponent(name: IconName): SvgComponent {
  switch (name) {
    case 'sun':
      return dynamic(() => import('@/assets/icons/sun.svg'), { ssr: false }) as SvgComponent;
    case 'logo':
      return dynamic(() => import('@/assets/icons/logo.svg'), { ssr: false }) as SvgComponent;
    case 'moon':
      return dynamic(() => import('@/assets/icons/moon.svg'), { ssr: false }) as SvgComponent;
    case 'arrow':
      return dynamic(() => import('@/assets/icons/arrow.svg'), { ssr: false }) as SvgComponent;
    case 'rss':
      return dynamic(() => import('@/assets/icons/rss.svg'), { ssr: false }) as SvgComponent;
    case 'git':
      return dynamic(() => import('@/assets/icons/git.svg'), { ssr: false }) as SvgComponent;
    case 'globe':
      return dynamic(() => import('@/assets/icons/globe.svg'), { ssr: false }) as SvgComponent;
    case 'window':
      return dynamic(() => import('@/assets/icons/window.svg'), { ssr: false }) as SvgComponent;
    case 'file':
      return dynamic(() => import('@/assets/icons/file.svg'), { ssr: false }) as SvgComponent;
    case 'play':
      return dynamic(() => import('@/assets/icons/play.svg'), { ssr: false }) as SvgComponent;
    case 'pause':
      return dynamic(() => import('@/assets/icons/pause.svg'), { ssr: false }) as SvgComponent;
    case 'google':
      return dynamic(() => import('@/assets/icons/google.svg'), { ssr: false }) as SvgComponent;
    case 'apple':
      return dynamic(() => import('@/assets/icons/apple.svg'), { ssr: false }) as SvgComponent;
    case 'kakao':
      return dynamic(() => import('@/assets/icons/kakao.svg'), { ssr: false }) as SvgComponent;
    case 'microsoft':
      return dynamic(() => import('@/assets/icons/microsoft.svg'), { ssr: false }) as SvgComponent;
    case 'search':
      return dynamic(() => import('@/assets/icons/search.svg'), { ssr: false }) as SvgComponent;
    case 'mic':
      return dynamic(() => import('@/assets/icons/mic.svg'), { ssr: false }) as SvgComponent;
    case 'slack':
      return dynamic(() => import('@/assets/icons/slack.svg'), { ssr: false }) as SvgComponent;
    case 'discord':
      return dynamic(() => import('@/assets/icons/discord.svg'), { ssr: false }) as SvgComponent;
    case 'linkedin':
      return dynamic(() => import('@/assets/icons/linkedin.svg'), { ssr: false }) as SvgComponent;
    case 'slide':
      return dynamic(() => import('@/assets/icons/slide.svg'), { ssr: false }) as SvgComponent;
    case 'gmail':
      return dynamic(() => import('@/assets/icons/gmail.svg'), { ssr: false }) as SvgComponent;
    case 'gpt':
      return dynamic(() => import('@/assets/icons/gpt.svg'), { ssr: false }) as SvgComponent;
    case 'plane':
      return dynamic(() => import('@/assets/icons/plane.svg'), { ssr: false }) as SvgComponent;
    case 'sync':
      return dynamic(() => import('@/assets/icons/sync.svg'), { ssr: false }) as SvgComponent;
    case 'knowledge':
      return dynamic(() => import('@/assets/icons/knowledge.svg'), { ssr: false }) as SvgComponent;
    case 'hamburger':
      return dynamic(() => import('@/assets/icons/hamburger.svg'), { ssr: false }) as SvgComponent;
    case 'close':
      return dynamic(() => import('@/assets/icons/close.svg'), { ssr: false }) as SvgComponent;
    case 'plus':
      return dynamic(() => import('@/assets/icons/plus.svg'), { ssr: false }) as SvgComponent;
    case 'minus':
      return dynamic(() => import('@/assets/icons/minus.svg'), { ssr: false }) as SvgComponent;
    case 'spinner':
      return dynamic(() => import('@/assets/icons/spinner.svg'), { ssr: false }) as SvgComponent;
    default:
      throw new Error(`Unknown icon: ${name}`);
  }
}

export { getIconComponent };

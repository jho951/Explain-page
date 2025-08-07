import { CAPTCHA_SITE_KEY } from '@/constants/security';

export default function CaptchaScript() {
  return (
    <script
      src={`https://www.google.com/recaptcha/api.js?render=${CAPTCHA_SITE_KEY}`}
      async
      defer
    />
  );
}

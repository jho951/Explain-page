import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, pw, token } = req.body;
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!token || !secret) {
    return res.status(400).json({ error: 'reCAPTCHA 토큰 누락' });
  }

  // 1. 점수 검증
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify`;
  const params = new URLSearchParams({
    secret,
    response: token,
  });

  const r = await fetch(verifyURL, {
    method: 'POST',
    body: params,
  });

  const data = await r.json();

  if (!data.success || data.action !== 'login' || data.score < 0.5) {
    return res.status(403).json({ error: '로봇 감지됨 (score too low)' });
  }

  // 2. 실제 로그인 로직 (예시)
  if (email === 'test@example.com' && pw === '1234') {
    return res.status(200).json({ ok: true });
  } else {
    return res.status(401).json({ error: '잘못된 정보' });
  }
}

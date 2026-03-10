import { OPENAI_API_KEY } from '@/constants/security';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function POST(req: Request) {
  const { history } = await req.json();

  const formatted = history
    .map((qa: { question: string; answer: string }) => `Q: ${qa.question}\nA: ${qa.answer}`)
    .join('\n\n');

  const prompt = `
다음은 한 사용자가 순서대로 대답한 질문과 답변입니다. 이를 요약하고, 해당 사용자의 성향을 분석한 간단한 피드백도 작성해 주세요.
또한 사용자가 입력한 정보(이름, 관심사 등)를 기반으로 JSON 형식으로 정리해 주세요.

${formatted}

요약:
- 응답 내용을 간단히 요약하세요.

성향 피드백:
- 사용자에 대한 간단한 성향이나 특징을 한두 문장으로 설명하세요.

추출 데이터 (JSON 형식):
{
  "name": "",
  "job": "",
  "interests": []
}
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  const output = completion.choices[0].message.content;
  return NextResponse.json({ summary: output });
}

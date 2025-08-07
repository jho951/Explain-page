import { OPENAI_API_KEY } from '@/constants/security';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function POST(req: Request) {
  const { previousAnswer } = await req.json();

  const prompt = `사용자가 "${previousAnswer}"라고 대답했을 때 이어서 할 수 있는 적절하고 자연스러운 다음 질문을 한 문장으로 생성해줘.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const nextQuestion = completion.choices[0]?.message?.content?.trim();
    return NextResponse.json({ nextQuestion });
  } catch {
    return NextResponse.json(
      { nextQuestion: '죄송합니다. 다음 질문을 생성할 수 없습니다.' },
      { status: 500 },
    );
  }
}

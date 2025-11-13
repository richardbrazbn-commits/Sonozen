import { NextRequest, NextResponse } from "next/server";
import type { AnalyzeRequest, AnalyzeResponse, SleepAnalysis } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();
    const { message } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Mensagem não pode estar vazia" },
        { status: 400 }
      );
    }

    // Verificar se API key existe
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Para usar a análise de sono com IA, você precisa configurar sua chave da OpenAI. Clique no banner laranja acima para adicionar a variável OPENAI_API_KEY." 
        },
        { status: 500 }
      );
    }

    // Chamar OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Você é um especialista em sono e saúde do sono. Analise a mensagem do usuário sobre seus problemas de sono e retorne um JSON com a seguinte estrutura:
{
  "mainIssues": ["problema 1", "problema 2", "problema 3"],
  "recommendations": ["recomendação 1", "recomendação 2", "recomendação 3", "recomendação 4", "recomendação 5"],
  "sleepScore": 75,
  "summary": "Um resumo detalhado da análise"
}

- mainIssues: 3-5 principais problemas identificados
- recommendations: 5-7 recomendações práticas e personalizadas
- sleepScore: pontuação de 0-100 baseada na gravidade dos problemas
- summary: resumo em 2-3 frases sobre a situação do sono do usuário

Seja empático, prático e focado em soluções baseadas em ciência do sono.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Erro ao chamar OpenAI API");
    }

    const data = await response.json();
    const analysisData = JSON.parse(data.choices[0].message.content);

    const analysis: SleepAnalysis = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      userMessage: message,
      analysis: analysisData,
    };

    const result: AnalyzeResponse = {
      success: true,
      analysis,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro na análise:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao processar análise",
      },
      { status: 500 }
    );
  }
}

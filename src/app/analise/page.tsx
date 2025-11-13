"use client";

import { useState } from "react";
import { Navbar } from "@/components/custom/navbar";
import { Moon, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { AnalyzeResponse } from "@/lib/types";
import AuthMiddleware from "@/components/auth-middleware";

export default function AnalisePage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError("Por favor, descreva seus problemas de sono.");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      const response = await fetch("/api/analyze-sleep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });

      const data: AnalyzeResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Erro ao analisar");
      }

      // Salvar no localStorage
      const analyses = JSON.parse(localStorage.getItem("sleepAnalyses") || "[]");
      analyses.unshift(data.analysis);
      localStorage.setItem("sleepAnalyses", JSON.stringify(analyses));

      // Redirecionar para dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar análise");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <AuthMiddleware>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300">Análise com IA</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Conte-nos sobre seu sono
            </h1>
            <p className="text-xl text-gray-400">
              Descreva o que está impedindo você de dormir bem e nossa IA criará um plano personalizado.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Descreva seus problemas de sono
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex: Tenho dificuldade para dormir, acordo várias vezes durante a noite, uso muito o celular antes de dormir..."
                  rows={8}
                  disabled={isAnalyzing}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isAnalyzing || !message.trim()}
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analisando com IA...
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    Analisar meu Sono
                  </>
                )}
              </button>
            </form>

            {/* Tips */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                Dicas para uma análise melhor:
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Seja específico sobre seus hábitos noturnos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Mencione há quanto tempo tem esses problemas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Inclua informações sobre seu ambiente de sono</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Descreva sua rotina antes de dormir</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AuthMiddleware>
  );
}

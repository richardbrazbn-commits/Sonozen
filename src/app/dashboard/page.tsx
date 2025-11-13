"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/custom/navbar";
import { Moon, TrendingUp, Lightbulb, AlertCircle, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { SleepAnalysis } from "@/lib/types";
import AuthMiddleware from "@/components/auth-middleware";

export default function DashboardPage() {
  const [analyses, setAnalyses] = useState<SleepAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("sleepAnalyses");
    if (stored) {
      setAnalyses(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const averageScore = analyses.length > 0
    ? Math.round(analyses.reduce((sum, a) => sum + a.analysis.sleepScore, 0) / analyses.length)
    : 0;

  const latestAnalysis = analyses[0];

  if (loading) {
    return (
      <AuthMiddleware>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 pt-24 flex items-center justify-center">
          <div className="text-center">
            <Moon className="w-12 h-12 text-indigo-400 animate-pulse mx-auto mb-4" />
            <p className="text-gray-400">Carregando...</p>
          </div>
        </div>
      </AuthMiddleware>
    );
  }

  if (analyses.length === 0) {
    return (
      <AuthMiddleware>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-12">
              <Moon className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Nenhuma análise ainda
              </h2>
              <p className="text-gray-400 mb-8">
                Comece sua jornada para um sono melhor fazendo sua primeira análise.
              </p>
              <Link
                href="/analise"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg shadow-indigo-500/50"
              >
                Fazer Primeira Análise
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </AuthMiddleware>
    );
  }

  return (
    <AuthMiddleware>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Seu Dashboard</h1>
              <p className="text-gray-400">Acompanhe seu progresso e recomendações</p>
            </div>
            <Link
              href="/analise"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg shadow-indigo-500/50"
            >
              Nova Análise
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Total Analyses */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{analyses.length}</div>
              <div className="text-sm text-gray-400">Análises Realizadas</div>
            </div>

            {/* Average Score */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{averageScore}/100</div>
              <div className="text-sm text-gray-400">Score Médio de Sono</div>
            </div>

            {/* Latest Score */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {latestAnalysis.analysis.sleepScore}/100
              </div>
              <div className="text-sm text-gray-400">Última Análise</div>
            </div>
          </div>

          {/* Latest Analysis Details */}
          {latestAnalysis && (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Última Análise</h2>
                  <p className="text-sm text-gray-400">
                    {new Date(latestAnalysis.date).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">Resumo</h3>
                <p className="text-gray-300 leading-relaxed">{latestAnalysis.analysis.summary}</p>
              </div>

              {/* Main Issues */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  Principais Problemas Identificados
                </h3>
                <div className="space-y-3">
                  {latestAnalysis.analysis.mainIssues.map((issue, index) => (
                    <div
                      key={index}
                      className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-gray-300"
                    >
                      {issue}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Recomendações Personalizadas
                </h3>
                <div className="space-y-3">
                  {latestAnalysis.analysis.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-gray-300 flex items-start gap-3"
                    >
                      <span className="text-indigo-400 font-bold">{index + 1}.</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* History */}
          {analyses.length > 1 && (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Histórico de Análises</h2>
              <div className="space-y-4">
                {analyses.slice(1).map((analysis) => (
                  <div
                    key={analysis.id}
                    className="p-6 bg-slate-800/50 border border-white/10 rounded-xl hover:bg-slate-800/70 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-gray-400">
                        {new Date(analysis.date).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-300 text-sm font-semibold">
                        Score: {analysis.analysis.sleepScore}/100
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-2">{analysis.analysis.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthMiddleware>
  );
}

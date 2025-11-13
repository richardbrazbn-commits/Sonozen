'use client';

import Link from "next/link";
import { Moon, Sparkles, Brain, TrendingUp, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/custom/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se usuário está autenticado (apenas se Supabase estiver configurado)
    const checkAuth = async () => {
      try {
        // Importação dinâmica do Supabase para evitar erros se não estiver configurado
        const { supabase } = await import("@/lib/supabase");
        
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            router.push('/dashboard');
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        // Se houver erro (ex: Supabase não configurado), apenas mostra a página
        console.log('Supabase não configurado ainda');
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-sm text-indigo-300">Powered by AI</span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Durma Melhor
                  </span>
                  <br />
                  <span className="text-white">Com Inteligência Artificial</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Descubra o que está impedindo seu sono perfeito. Nossa IA analisa seus hábitos e oferece recomendações personalizadas.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/auth"
                  className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg shadow-indigo-500/50 flex items-center gap-2"
                >
                  Começar Agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/auth"
                  className="px-8 py-4 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-all border border-white/10 backdrop-blur-sm"
                >
                  Entrar
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-24">
              {/* Feature 1 */}
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm hover:scale-105 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Análise Inteligente</h3>
                <p className="text-gray-400">
                  Nossa IA identifica padrões e problemas específicos que afetam seu sono.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm hover:scale-105 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                  <Moon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Recomendações Personalizadas</h3>
                <p className="text-gray-400">
                  Receba dicas customizadas baseadas nas suas necessidades específicas.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-indigo-500/10 border border-white/10 backdrop-blur-sm hover:scale-105 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Acompanhe seu Progresso</h3>
                <p className="text-gray-400">
                  Visualize sua evolução e melhore continuamente a qualidade do seu sono.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  98%
                </div>
                <div className="text-gray-400">Taxa de Satisfação</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  50k+
                </div>
                <div className="text-gray-400">Análises Realizadas</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  4.9★
                </div>
                <div className="text-gray-400">Avaliação Média</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

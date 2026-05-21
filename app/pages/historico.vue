<template>
  <div class="bg-slate-50 font-sans min-h-screen flex flex-col antialiased text-slate-800 overflow-x-hidden">

    <nav class="bg-[#05232A] text-white shadow-lg border-b border-[#46C38F]/30">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <NuxtLink to="/" class="flex items-center justify-center md:justify-start space-x-3 group">
          <div class="h-8 w-2 bg-[#46C38F] rounded-full group-hover:bg-cyan-300 transition-colors"></div>
          <span class="text-xl font-extrabold tracking-tight text-white uppercase">
            nexdom<span class="text-[#46C38F] font-light lowercase">.healthtech</span>
          </span>
        </NuxtLink>

        <div class="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3 sm:gap-6 text-sm font-semibold tracking-wide">
          <NuxtLink to="/" class="text-slate-300 hover:text-white transition-all pb-1 whitespace-nowrap">
            Validar Guia
          </NuxtLink>
          <NuxtLink to="/historico" class="text-[#46C38F] border-b-2 border-[#46C38F] pb-1 transition-all whitespace-nowrap">
            Histórico de Solicitações
          </NuxtLink>
        </div>
      </div>
    </nav>

    <main class="flex-grow max-w-5xl mx-auto w-full min-w-0 px-4 sm:px-6 py-12">

      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-[#2AA371] bg-[#46C38F]/10 px-3 py-1 rounded-full border border-[#46C38F]/20">
            REGISTROS PERSISTIDOS
          </span>
          <h2 class="text-3xl font-black text-[#05232A] tracking-tight mt-3 mb-1">Histórico de Solicitações</h2>
          <p class="text-slate-500 text-sm">Rastreabilidade completa de transações persistidas no gerenciamento de estado global.</p>
        </div>
        
        <button 
          type="button" 
          @click="handleAtualizar"
          class="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#05232A] bg-white border border-slate-200 rounded-xl shadow-sm hover:text-[#46C38F] hover:border-[#46C38F]/30 hover:bg-slate-50 transition-all duration-200 group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="2.5" 
            stroke="currentColor"
            :class="[
              'w-4 h-4 text-[#05232A]/60 group-hover:text-[#46C38F] transition-transform duration-500',
              atualizando ? 'rotate-180 animate-spin text-[#46C38F]' : 'group-hover:rotate-180'
            ]"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          {{ atualizando ? 'Atualizando...' : 'Atualizar Histórico' }}
        </button>
      </div>

      <div class="hidden md:block bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100">
              <th class="p-4 w-28 text-center">ID</th>
              <th class="p-4">Procedimento</th>
              <th class="p-4 text-center">Idade</th>
              <th class="p-4 text-center">Sexo</th>
              <th class="p-4 text-center">Status Parecer</th>
              <th class="p-4">Justificativa Administrativa</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm text-slate-600">
            <tr v-if="store.historicoSolicitacoes.length === 0">
              <td colspan="6" class="p-12 text-center text-slate-400 italic bg-slate-50/30">
                Nenhum registro de auditoria encontrado na base de dados local.
              </td>
            </tr>
            
            <tr 
              v-else 
              v-for="solicitacao in store.historicoSolicitacoes" 
              :key="solicitacao.id" 
              class="hover:bg-slate-50/50 transition-colors"
            >
              <td class="p-4 font-mono font-bold text-slate-400 text-center text-xs">
                #{{ solicitacao.id }}
              </td>
              <td class="p-4 font-bold text-slate-800">{{ solicitacao.procedimento }}</td>
              <td class="p-4 text-center font-medium">{{ solicitacao.idade }} anos</td>
              <td class="p-4 text-center">
                <span class="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-md border border-slate-200/60">
                  {{ formatarSexo(solicitacao.sexo) }}
                </span>
              </td>
              <td class="p-4 text-center">
                <span :class="['px-3 py-1 text-[9px] font-black rounded-full shadow-sm tracking-wide uppercase border', obterClassesBadge(solicitacao.status)]">
                  {{ solicitacao.status.toUpperCase() }}
                </span>
              </td>
              <td class="p-4 text-slate-500 font-medium text-xs">{{ solicitacao.justificativa }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="block md:hidden space-y-4">
        <div 
          v-if="store.historicoSolicitacoes.length === 0" 
          class="bg-white rounded-2xl p-8 text-center text-slate-400 italic border border-slate-100 shadow-md"
        >
          Nenhum registro de auditoria encontrado na base de dados local.
        </div>

        <div 
          v-else 
          v-for="solicitacao in store.historicoSolicitacoes" 
          :key="solicitacao.id" 
          class="bg-white rounded-2xl shadow-md border border-slate-100 p-5 space-y-4"
        >
          <div class="flex justify-between items-center border-b border-slate-100 pb-2.5">
            <span class="font-mono font-bold text-slate-400 text-xs">ID #{{ solicitacao.id }}</span>
            <span :class="['px-2.5 py-0.5 text-[8px] font-black rounded-full shadow-sm uppercase tracking-wide border whitespace-nowrap', obterClassesBadge(solicitacao.status)]">
              {{ solicitacao.status.toUpperCase() }}
            </span>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center bg-slate-50/60 p-3 rounded-xl border border-slate-100/80">
            <div class="flex flex-col justify-between">
              <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Procedimento</span>
              <strong class="text-slate-800 font-black text-sm mt-1">{{ solicitacao.procedimento }}</strong>
            </div>
            <div class="flex flex-col justify-between">
              <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Idade Informada</span>
              <strong class="text-slate-700 font-bold text-xs mt-1">{{ solicitacao.idade }} anos</strong>
            </div>
            <div class="flex flex-col justify-between">
              <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Sexo Biológico</span>
              <strong class="text-slate-700 font-bold text-xs mt-1">
                {{ formatarSexo(solicitacao.sexo) }}
              </strong>
            </div>
          </div>

          <div class="pt-1">
            <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider mb-1">Justificativa Administrativa</span>
            <p :class="['text-[11px] font-semibold p-2.5 rounded-xl border leading-relaxed bg-slate-50/50', obterClassesCaixa(solicitacao.status)]">
              {{ solicitacao.justificativa }}
            </p>
          </div>
        </div>
      </div>

    </main>

    <footer class="bg-white text-center py-5 border-t border-slate-100 text-xs text-slate-400 font-medium shadow-inner mt-8">
      &copy; 2026 Nexdom Hub. Desenvolvido por Clarissa de Cássia
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAutorizacaoGuiaStore } from '../stores/autorizacaoGuia'

const store = useAutorizacaoGuiaStore()
const atualizando = ref(false)

const formatarSexo = (sexo: 'M' | 'F'): string => {
  return sexo === 'M' ? 'Masculino' : 'Feminino'
}

const obterClassesBadge = (status: string): string => {
  return status === 'Autorizado' 
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
    : 'bg-rose-50 text-rose-700 border-rose-200'
}

const obterClassesCaixa = (status: string): string => {
  return status === 'Autorizado' 
    ? 'text-emerald-800 border-emerald-100' 
    : 'text-rose-800 border-rose-100'
}

const handleAtualizar = () => {
  atualizando.value = true
  setTimeout(() => {
    atualizando.value = false
  }, 300)
}
</script>
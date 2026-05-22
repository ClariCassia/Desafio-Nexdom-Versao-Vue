<template>
  <main class="max-w-5xl mx-auto w-full min-w-0 px-4 sm:px-6 py-12">

    <div class="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 mb-10 md:mb-8">

      <div class="text-center md:text-left flex flex-col items-center md:items-start">
        <span class="text-xs font-bold uppercase tracking-widest text-[#2AA371] bg-[#46C38F]/10 px-3 py-1 rounded-full border border-[#46C38F]/20">
          REGISTROS PERSISTIDOS
        </span>
        <h2 class="text-3xl font-black text-[#05232A] tracking-tight mt-3 mb-2 md:mb-1">
          Histórico de Solicitações
        </h2>
        <p class="text-slate-500 text-sm max-w-md">
          Rastreabilidade completa de transações persistidas no gerenciamento de estado global.
        </p>
      </div>

      <button type="button" @click="handleAtualizar"
        class="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#05232A] bg-white border border-slate-200 rounded-xl shadow-sm hover:text-[#46C38F] hover:border-[#46C38F]/30 hover:bg-slate-50 transition-all duration-200 group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" :class="[
          'w-4 h-4 text-[#05232A]/60 group-hover:text-[#46C38F] transition-transform duration-500',
          atualizando ? 'rotate-180 animate-spin text-[#46C38F]' : 'group-hover:rotate-180'
        ]">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        {{ atualizando ? 'Atualizando...' : 'Atualizar Histórico' }}
      </button>
    </div>


    <div class="bg-transparent md:bg-white md:rounded-2xl md:shadow-xl md:border md:border-slate-100 md:overflow-hidden">

      <div class="hidden md:grid grid-cols-12 gap-4 bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100 p-4 items-center">
        <div class="col-span-1 text-center">ID</div>
        <div class="col-span-2">Procedimento</div>
        <div class="col-span-2 text-center">Idade</div>
        <div class="col-span-2 text-center">Sexo</div>
        <div class="col-span-2 text-center">Status Parecer</div>
        <div class="col-span-3">Justificativa Administrativa</div>
      </div>

      <div class="space-y-4 md:space-y-0 md:divide-y md:divide-slate-100 text-sm text-slate-600">

        <div v-if="store.historicoSolicitacoes.length === 0"
          class="p-8 text-center text-slate-400 italic bg-white rounded-2xl md:rounded-none shadow-md md:shadow-none border border-slate-100 md:border-0">
          Nenhum registro de auditoria encontrado na base de dados local.
        </div>

        <div v-else v-for="solicitacao in store.historicoSolicitacoes" :key="solicitacao.id"
          class="bg-white rounded-2xl shadow-md border border-slate-100 p-5 md:p-4 md:rounded-none md:shadow-none md:border-0 hover:bg-slate-50/50 transition-colors flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center">
          <div class="flex justify-between items-center border-b border-slate-100 pb-3 mb-3 md:border-0 md:pb-0 md:mb-0 md:contents">
            <div class="font-mono font-bold text-slate-400 text-xs md:col-span-1 md:text-center md:text-sm">
              <span class="md:hidden">ID </span>#{{ solicitacao.id }}
            </div>
            <div class="md:col-span-2 md:order-5 md:flex md:justify-center">
              <BadgeStatus :status="solicitacao.status" />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center bg-slate-50/60 p-3 rounded-xl border border-slate-100/80 mb-3 md:bg-transparent md:p-0 md:border-0 md:mb-0 md:contents">
            <div class="flex flex-col justify-center md:col-span-2 md:order-2 md:text-left md:block">
              <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider md:hidden mb-1">Procedimento</span>
              <strong class="text-slate-800 font-black text-sm md:font-bold">{{ solicitacao.procedimento }}</strong>
            </div>
            <div class="flex flex-col justify-center md:col-span-2 md:order-3 md:text-center md:block">
              <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider md:hidden mb-1">Idade</span>
              <strong class="text-slate-700 font-bold text-xs md:font-medium md:text-sm">{{ solicitacao.idade }} anos</strong>
            </div>
            <div class="flex flex-col justify-center md:col-span-2 md:order-4 md:text-center md:block">
              <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider md:hidden mb-1">Sexo</span>
              <span class="text-slate-700 font-bold text-xs md:px-2 md:py-0.5 md:bg-slate-100 md:text-slate-600 md:rounded-md md:border md:border-slate-200/60 inline-block mt-1 md:mt-0">
                {{ formatarSexo(solicitacao.sexo) }}
              </span>
            </div>
          </div>

          <div class="pt-1 md:pt-0 md:col-span-3 md:order-6">
            <span class="text-slate-400 block text-[9px] uppercase font-bold tracking-wider mb-1 md:hidden">Justificativa Administrativa</span>
            <p :class="[
              'text-[11px] font-semibold p-2.5 rounded-xl border leading-relaxed',
              'md:text-xs md:font-medium md:p-0 md:border-0 md:bg-transparent md:text-slate-500',
              obterClassesCaixa(solicitacao.status)
            ]">
              {{ solicitacao.justificativa }}
            </p>
          </div>

        </div>
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAutorizacaoGuiaStore } from '../stores/autorizacaoGuia'

const store = useAutorizacaoGuiaStore()
const atualizando = ref(false)

const formatarSexo = (sexo: 'M' | 'F'): string => {
  return sexo === 'M' ? 'Masculino' : 'Feminino'
}

const obterClassesCaixa = (status: string): string => {
  return status === 'Autorizado'
    ? 'bg-emerald-50/50 text-emerald-800 border-emerald-100'
    : 'bg-rose-50/50 text-rose-800 border-rose-100'
}

const handleAtualizar = () => {
  atualizando.value = true
  setTimeout(() => {
    atualizando.value = false
  }, 300)
}
</script>
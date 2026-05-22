<template>
  <main class="flex-grow max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">

    <div class="mb-10 text-center md:text-left">
      <span class="text-xs font-bold uppercase tracking-widest text-[#2AA371] bg-[#46C38F]/10 px-3 py-1 rounded-full border border-[#46C38F]/20">
        Central de Validação de Guias
      </span>
      <h2 class="text-3xl font-black text-[#05232A] tracking-tight mt-3 mb-2">Validador de Diretrizes Contratuais</h2>
      <p class="text-slate-500 text-sm max-w-xl">
        Analise automaticamente a elegibilidade de guias médicas com base nas regras contratuais cadastradas.
      </p>
    </div>

    <div class="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 mb-8 transition-all hover:shadow-2xl hover:shadow-slate-100">
      <h3 class="text-lg font-bold text-[#05232A] mb-3">
        Dados para Validação da Guia
      </h3>
      <p class="text-slate-500 text-sm max-w-xl mb-6">
        Informe os dados da guia para verificar automaticamente a elegibilidade conforme as regras contratuais.
      </p>

      <form @submit.prevent="handleEnviar" class="space-y-6" novalidate>

        <div>
          <label for="procedimento" class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Código do Procedimento
          </label>

          <input type="text" id="procedimento" v-model="form.procedimento" placeholder="Informe o código do procedimento. Ex.: 1234" @blur="marcarComoTocado('procedimento')" @input="validarFormulario"
            class="w-full px-4 py-3 border rounded-xl outline-none transition-all text-sm font-medium bg-slate-50/50 focus:bg-white" :class="[
              erros.procedimento && tocados.procedimento
                ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/10'
                : 'border-slate-200 focus:ring-2 focus:ring-[#46C38F] focus:border-[#46C38F]'
            ]" />

          <p v-if="erros.procedimento && tocados.procedimento" class="text-rose-600 text-xs font-bold mt-1.5 flex items-center gap-1 animate-fade-in">
            <i class="pi pi-exclamation-circle text-[11px]"></i> {{ erros.procedimento }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="idade" class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Idade do Paciente
            </label>

            <input type="number" id="idade" v-model.number="form.idade" placeholder="Ex: 25" @blur="marcarComoTocado('idade')" @input="validarFormulario"
              class="w-full px-4 py-3 border rounded-xl outline-none transition-all text-sm font-medium bg-slate-50/50 focus:bg-white" :class="[
                erros.idade && tocados.idade
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/10'
                  : 'border-slate-200 focus:ring-2 focus:ring-[#46C38F] focus:border-[#46C38F]'
              ]" />

            <p v-if="erros.idade && tocados.idade" class="text-rose-600 text-xs font-bold mt-1.5 flex items-center gap-1">
              <i class="pi pi-exclamation-circle text-[11px]"></i> {{ erros.idade }}
            </p>
          </div>

          <div>
            <label for="sexo" class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Sexo do beneficiário na guia
            </label>

            <select id="sexo" v-model="form.sexo" @blur="marcarComoTocado('sexo')" @change="validarFormulario"
              class="w-full px-4 py-3 border rounded-xl outline-none transition-all text-sm font-medium text-slate-700 bg-slate-50/50 focus:bg-white" :class="[
                erros.sexo && tocados.sexo
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/10'
                  : 'border-slate-200 focus:ring-2 focus:ring-[#46C38F] focus:border-[#46C38F]'
              ]">
              <option value="" disabled>Selecione...</option>
              <option value="M">Masculino (M)</option>
              <option value="F">Feminino (F)</option>
            </select>

            <p v-if="erros.sexo && tocados.sexo" class="text-rose-600 text-xs font-bold mt-1.5 flex items-center gap-1">
              <i class="pi pi-exclamation-circle text-[11px]"></i> {{ erros.sexo }}
            </p>
          </div>
        </div>

        <button type="submit" :disabled="carregando || formularioInvalido" :class="[
          'w-full font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all duration-150 mt-2 text-sm uppercase tracking-wider flex items-center justify-center gap-2 transform',
          formularioInvalido || carregando
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none border border-slate-200/50'
            : 'bg-[#05232A] hover:bg-[#072a3a] text-white hover:shadow-xl hover:-translate-y-0.5'
        ]">

          <svg v-if="carregando" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>

          <span>{{ carregando ? 'Validando guia...' : 'Validar Guia Médica' }}</span>
        </button>
      </form>
    </div>

    <div v-if="resultado" class="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300">
      <div :class="[
        'p-4 sm:p-5 text-white flex justify-between items-center gap-4',
        resultado.status === 'Autorizado' ? 'bg-emerald-600' : 'bg-rose-600'
      ]">
        <span class="font-bold tracking-wider uppercase text-[10px] sm:text-xs">Parecer de Auditoria Técnica</span>

        <BadgeStatus :status="resultado.status" />

      </div>

      <div class="p-5 sm:p-6 space-y-5">

        <div class="grid grid-cols-3 gap-2 sm:gap-4 border-b border-slate-100 pb-4 text-center md:text-left">

          <div class="flex flex-col justify-between">
            <span class="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Procedimento</span>
            <strong class="text-slate-700 font-black text-sm sm:text-base mt-1">{{ resultado.procedimento }}</strong>
          </div>

          <div class="flex flex-col justify-between">
            <span class="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Idade informada</span>
            <strong class="text-slate-700 font-bold text-xs sm:text-base mt-1">{{ resultado.idade }} anos</strong>
          </div>

          <div class="flex flex-col justify-between">
            <span class="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">Sexo Biológico</span>
            <strong class="text-slate-700 font-bold text-xs sm:text-base mt-1">
              {{ resultado.sexo === 'M' ? 'Masculino' : 'Feminino' }}
            </strong>
          </div>

        </div>

        <div class="pt-1">
          <span class="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-1">Justificativa Administrativa</span>

          <p :class="[
            'text-xs sm:text-sm font-bold bg-slate-50 p-3 rounded-xl border',
            resultado.status === 'Autorizado' ? 'text-emerald-700 border-emerald-100' : 'text-rose-700 border-rose-100'
          ]">
            {{ resultado.justificativa }}
          </p>
          
        </div>
      </div>
    </div>

  </main>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAutorizacaoGuiaStore } from '../stores/autorizacaoGuia'
import type { SolicitacaoAutorizacao } from "../../types/autorizacaoGuia"

const store = useAutorizacaoGuiaStore()

const form = ref({
  procedimento: '',
  idade: null as number | null,
  sexo: '' as 'M' | 'F' | ''
})

const erros = ref({
  procedimento: '',
  idade: '',
  sexo: ''
})

const tocados = ref({
  procedimento: false,
  idade: false,
  sexo: false
})

const resultado = ref<SolicitacaoAutorizacao | null>(null)
const carregando = ref(false)

const marcarComoTocado = (campo: 'procedimento' | 'idade' | 'sexo') => {
  tocados.value[campo] = true
  validarFormulario()
}

const regrasValidacao = {
  procedimento: (valor: string): string => {
    if (!valor) return 'O código do procedimento é obrigatório.'
    if (valor.length < 4) return 'O código deve conter pelo menos 4 dígitos.'
    return ''
  },
  idade: (valor: number | null): string => {
    if (valor === null || valor === undefined) return 'A idade do paciente é obrigatória.'
    if (valor < 1 || valor > 110) return 'Informe uma idade válida entre 1 e 110 anos.'
    return ''
  },
  sexo: (valor: string): string => {
    if (!valor) return 'Selecione o sexo biológico do beneficiário.'
    return ''
  }
}

const validarFormulario = () => {
  form.value.procedimento = form.value.procedimento.replace(/[^0-9]/g, '')

  erros.value.procedimento = regrasValidacao.procedimento(form.value.procedimento)
  erros.value.idade = regrasValidacao.idade(form.value.idade)
  erros.value.sexo = regrasValidacao.sexo(form.value.sexo)
}

const formularioInvalido = computed(() => {
  return (
    !!erros.value.procedimento ||
    !!erros.value.idade ||
    !!erros.value.sexo ||
    !form.value.procedimento ||
    form.value.idade === null ||
    form.value.sexo === ''
  )
})

const handleEnviar = () => {
  tocados.value.procedimento = true
  tocados.value.idade = true
  tocados.value.sexo = true
  validarFormulario()

  if (formularioInvalido.value) return

  carregando.value = true
  resultado.value = null

  setTimeout(() => {
    resultado.value = store.processarAutorizacao(
      form.value.procedimento,
      form.value.idade!,
      form.value.sexo as 'M' | 'F'
    )
    carregando.value = false
  }, 450)
}
</script>
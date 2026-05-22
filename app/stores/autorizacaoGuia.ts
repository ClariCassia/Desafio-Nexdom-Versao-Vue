import { defineStore } from "pinia";
import { ref, watch, onMounted } from "vue";

import type { SolicitacaoAutorizacao, ResultadoAuditoria } from "../../types/autorizacaoGuia";

const validarProcedimento1234 = (idade: number, sexo: "M" | "F"): ResultadoAuditoria => {
  if (idade === 20 && sexo === "M") {
    return { status: "Autorizado", justificativa: "Procedimento autorizado com sucesso." };
  }
  return { status: "Não Autorizado", justificativa: "Idade ou sexo não elegíveis para este procedimento." };
};

const validarProcedimento4567 = (idade: number, sexo: "M" | "F"): ResultadoAuditoria => {
  const ehHomemElegivel = idade === 20 && sexo === "M";
  const ehMulherElegivel = idade === 30 && sexo === "F";

  if (ehHomemElegivel || ehMulherElegivel) {
    return { status: "Autorizado", justificativa: "Procedimento authorized com sucesso." };
  }
  return { status: "Não Autorizado", justificativa: "Combinação de idade e sexo não atende aos critérios de elegibilidade." };
};

const validarProcedimento6789 = (idade: number, sexo: "M" | "F"): ResultadoAuditoria => {
  if (idade === 10 && sexo === "M") {
    return { status: "Autorizado", justificativa: "Procedimento autorizado com sucesso." };
  }
  if (idade === 10 && sexo === "F") {
    return { status: "Não Autorizado", justificativa: "Procedimento não permitido para o sexo informado." };
  }
  return { status: "Não Autorizado", justificativa: "Idade não permitida para este procedimento." };
};

export const useAutorizacaoGuiaStore = defineStore("autorizacaoGuia", () => {
  const historicoSolicitacoes = ref<SolicitacaoAutorizacao[]>([]);
  const proximoId = ref(1);

  const estadoInicializado = ref(false);

  onMounted(() => {
    if (typeof window !== "undefined") {
      const dadosSalvos = localStorage.getItem("nexdom_historico");
      if (dadosSalvos) {
        historicoSolicitacoes.value = JSON.parse(dadosSalvos);

        if (historicoSolicitacoes.value.length > 0) {
          const maiorId = Math.max(...historicoSolicitacoes.value.map((s) => s.id));
          proximoId.value = maiorId + 1;
        }
      }
      estadoInicializado.value = true;
    }
  });

  watch(
    historicoSolicitacoes,
    (novoHistorico) => {
      if (estadoInicializado.value && typeof window !== "undefined") {
        localStorage.setItem("nexdom_historico", JSON.stringify(novoHistorico));
      }
    },
    { deep: true },
  );

  const processarAutorizacao = (procedimento: string, idade: number, sexo: "M" | "F") => {
    const procedimentoNormalizado = procedimento.trim();
    let resultado: ResultadoAuditoria;

    switch (procedimentoNormalizado) {
      case "1234":
        resultado = validarProcedimento1234(idade, sexo);
        break;
      case "4567":
        resultado = validarProcedimento4567(idade, sexo);
        break;
      case "6789":
        resultado = validarProcedimento6789(idade, sexo);
        break;
      default:
        resultado = { status: "Não Autorizado", justificativa: "Procedimento não encontrado na base de regras." };
    }

    const novaSolicitacao: SolicitacaoAutorizacao = {
      id: proximoId.value++,
      procedimento: procedimentoNormalizado,
      idade,
      sexo,
      status: resultado.status,
      justificativa: resultado.justificativa,
      dataHora: new Date().toLocaleString("pt-BR"),
    };

    historicoSolicitacoes.value.unshift(novaSolicitacao);
    return novaSolicitacao;
  };

  return {
    historicoSolicitacoes,
    processarAutorizacao,
  };
});

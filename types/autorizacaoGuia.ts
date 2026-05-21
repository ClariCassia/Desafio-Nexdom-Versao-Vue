export interface SolicitacaoAutorizacao {
  id: number;
  procedimento: string;
  idade: number;
  sexo: "M" | "F";
  status: "Autorizado" | "Não Autorizado";
  justificativa: string;
  dataHora: string;
}

export interface ResultadoAuditoria {
  status: "Autorizado" | "Não Autorizado";
  justificativa: string;
}

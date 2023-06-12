import { number, string, object, ref } from "prop-types";

export const cuenta = {
  noCuenta: string,
  tipoCuenta: object,
  usuario: object,
  saldo: number,
};

export const tipoCuenta = {
  type: ref("TipoCuenta"), // Referencia al modelo "TipoCuenta"
};

export const usuario = {
  type: ref("Usuario"), // Referencia al modelo "Usuario"
};

export const movimiento = {
  usuario: object,
  cuenta: object,
};

export const favorito = {
  usuario: object,
  cuenta: object,
};

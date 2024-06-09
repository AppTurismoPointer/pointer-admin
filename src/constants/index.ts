import {
  PaymentMethodType,
  TransportMethodType,
} from "@/services/spot.service";

export const regexIsAtLeastTwoWords = /^(?:\S+\s){1,}\S+$/;
export const regexMinimum8Characters = /[\S]{8,}/;
export const regexAtLeast1LetterUppercase = /[A-Z]/;
export const regexAtLeast1LetterLowercase = /[a-z]/;
export const regexAtLeast1SpecialCharacter = /[~!@#$%^&*+\-?,{}:;()></|[\]\\]/;
export const regexValidEmail =
  /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
export const regexDigt = /^\d+$/;

export const paymentMethods: Record<PaymentMethodType, string> = {
  PIX: "Pix",
  BOLETO: "Boleto",
  BANK_TRANSFER: "Transferência bancária",
};

export const transportMethods: Record<TransportMethodType, string> = {
  UBER: "Uber",
  TAXI: "Táxi",
  BIKE: "Bicicleta",
  TRANSFER: "Serviço de transfer",
  BUS: "Ônibus coletivo",
};

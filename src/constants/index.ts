import {
  PaymentMethodType,
  TransportMethodType,
} from "@/services/spot.service";

export const regexMinimum8Characters = /[\S]{8,}/;
export const regexAtLeast1LetterUppercase = /[A-Z]/;
export const regexAtLeast1LetterLowercase = /[a-z]/;
export const regexAtLeast1SpecialCharacter = /[~!@#$%^&*+\-?,{}:;()></|[\]\\]/;
export const regexValidEmail =
  /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
export const regexDigt = /^\d+$/;

export const paymentMethods: Record<PaymentMethodType, string> = {
  PIX: "Pix",
  CREDIT_CARD: "Cartão de crédito",
  CASH: "Dinheiro",
};

export const transportMethods: Record<TransportMethodType, string> = {
  UBER: "Uber",
  TAXI: "Táxi",
  BIKE: "Bicicleta",
  TRANSFER: "Serviço de transfer",
  BUS: "Ônibus coletivo",
};

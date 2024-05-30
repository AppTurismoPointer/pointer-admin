export const regexIsAtLeastTwoWords = /^(?:\S+\s){1,}\S+$/;
export const regexMinimum8Characters = /[\S]{8,}/;
export const regexAtLeast1LetterUppercase = /[A-Z]/;
export const regexAtLeast1LetterLowercase = /[a-z]/;
export const regexAtLeast1SpecialCharacter = /[~!@#$%^&*+\-?,{}:;()></|[\]\\]/;
export const regexValidEmail =
  /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
export const regexDigt = /^\d+$/;

import { AnswerType } from "../types";

export function sortBestAnswer(array: AnswerType[]) {
  for (let i = 0; i < array?.length; i++) {
    let aux = array[0];
    if (array[i].accepted) {
      array[0] = array[i];
      array[i] = aux;
    }
  }
  return array;
}

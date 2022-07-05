/**
 * Правила начисления баллов по значениям долей
 */

export default class ShareRuleModel {
  /** Максимальное значение для которого устанавливается правило */
  readonly maxValue: number;
  /** Количество баллов */
  readonly score: number;

  constructor(maxValue: number, score: number) {
    this.maxValue = maxValue;
    this.score = score;
  }
}

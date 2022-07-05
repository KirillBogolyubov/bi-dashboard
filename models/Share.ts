/**
 * Доля показателей
 */

import { NumericIndicatorModel } from '~/models/NumericIndicator';
import ShareRuleModel from '~/models/ShareRule';
import { ShareResponse } from '~/repositories/responses/Share';

export class ShareModel {
  private static instances: ShareModel[] = [];

  /** Доля в расчетах */
  public dividend: NumericIndicatorModel;

  /** Имя показателя */
  public divider: NumericIndicatorModel;

  /** Имя доли */
  public name: string;

  /** Условное обозначение показателя */
  public legend: string;

  /** Единица измерения */
  public unit: string;

  /** Коэффициент значимости доли */
  public coefficient: number;

  /** Правила начисления баллов в слое по конкретной доле */
  public rules: ShareRuleModel[] = [];

  /** Описание */
  public description?: string;

  /** Слой, в котором участвует доля */
  // public layer: LayerModel;

  private constructor(data: ShareResponse) {
    this.dividend = NumericIndicatorModel.createInstance(data.dividend);
    this.divider = NumericIndicatorModel.createInstance(data.divider);
    this.name = data.name;
    this.legend = data.legend;
    this.unit = data.unit;
    this.coefficient = data.coefficient;
    this.description = data.description;
    // this.rules = rules;
    // this.layer = layer;
  }

  public get value(): number | undefined {
    if (this.dividend.value && this.divider.value) {
      return (
        Math.round((this.dividend.value / this.divider.value) * 10000) / 100
      );
    }

    return undefined;
  }

  public get nullableValuesCount(): number {
    let count = 0;

    if (typeof this.dividend.value !== 'number') {
      count += 1;
    }

    if (typeof this.divider.value !== 'number') {
      count += 1;
    }

    return count;
  }

  static createInstance(data: ShareResponse): ShareModel {
    const res = this.instances.find(
      (instance) => instance.legend === data.legend,
    );

    if (res) {
      return res;
    } else {
      const newModel = new ShareModel(data);

      this.instances.push(newModel);

      return newModel;
    }
  }
}

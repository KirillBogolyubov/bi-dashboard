/**
 * Слой показателей
 */

import { EveryAtEnum } from '~/models/interfaces/EveryAtEnum';
import { ShareModel } from '~/models/Share';
import { LogicIndicatorModel } from '~/models/LogicIndicator';
import { ShareIndicatorModel } from '~/models/ShareIndicator';
import { ShareResponse } from '~/repositories/responses/Share';
import { LayerResponse } from '~/repositories/responses/Layer';
import { LogicIndicatorResponse } from '~/repositories/responses/LogicIndicator';
import { ShareIndicatorResponse } from '~/repositories/responses/ShareIndicator';

export class LayerModel {
  /** Частота ввода */
  public everyAt: EveryAtEnum;

  /** Наименование слоя */
  public name: string;

  /** Условное обозначение слоя */
  public legend: string;

  /** Единица измерения */
  public unit: string;

  /** Доли показателей по данному слою */
  public shares: ShareModel[] = [];

  /** Логические показатели по данному слою */
  public logicIndicators: LogicIndicatorModel[] = [];

  /** Логические показатели по данному слою */
  public shareIndicators: ShareIndicatorModel[] = [];

  public constructor(data: LayerResponse) {
    this.everyAt = data.every_at;
    this.name = data.name;
    this.legend = data.legend;
    this.unit = data.unit;
    this.shares = data.shares.map((share: ShareResponse) =>
      ShareModel.createInstance(share),
    );
    this.logicIndicators = data.logic_indicators.map(
      (indicator: LogicIndicatorResponse) =>
        LogicIndicatorModel.createInstance(indicator),
    );
    this.shareIndicators = data.share_indicators.map(
      (indicator: ShareIndicatorResponse) =>
        ShareIndicatorModel.createInstance(indicator),
    );
  }

  public get value(): number {
    const getSharesScores = () => {
      if (this.shares) {
        return this.shares
          .map((share: ShareModel) => {
            const sortedRules = share.rules.sort(
              (a, b) => a.maxValue - b.maxValue,
            );

            const filteredRules = sortedRules.filter(
              (item) => share.value && share.value <= item.maxValue,
            );

            return filteredRules.length
              ? filteredRules[0].score * share.coefficient
              : 0;
          })
          .reduce((a, b) => a + b);
      }

      return 0;
    };

    const getLogicIndicatorsScores = () => {
      if (this.logicIndicators) {
        return this.logicIndicators
          .map((indicator: LogicIndicatorModel) => {
            const filteredRules = indicator.rules.filter(
              (rule) => indicator.value && indicator.value === rule.forValue,
            );

            return filteredRules.length
              ? filteredRules[0].score * indicator.coefficient
              : 0;
          })
          .reduce((a, b) => a + b);
      }

      return 0;
    };

    const getShareIndicatorsScores = () => {
      if (this.shareIndicators) {
        return this.shareIndicators
          .map((indicator: ShareIndicatorModel) => {
            const sortedRules = indicator.rules.sort(
              (a, b) => a.maxValue - b.maxValue,
            );

            const filteredRules = sortedRules.filter(
              (item) => indicator.value && indicator.value <= item.maxValue,
            );

            return filteredRules.length
              ? filteredRules[0].score * indicator.coefficient
              : 0;
          })
          .reduce((a, b) => a + b);
      }

      return 0;
    };

    return (
      getSharesScores() +
      getLogicIndicatorsScores() +
      getShareIndicatorsScores()
    );
  }

  public get nullableValuesCount(): number {
    let count = this.shares
      .map((share) => share.nullableValuesCount)
      .reduce((prev, current) => prev + current, 0);

    count += this.logicIndicators.filter(
      (indicator) => typeof indicator.value !== 'boolean',
    ).length;

    count += this.shareIndicators.filter(
      (indicator) => typeof indicator.value !== 'number',
    ).length;

    return count;
  }
}

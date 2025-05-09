import { _decorator, Component, EventTarget, Label, Node } from 'cc';
import { Points } from './Points';
const { ccclass, property } = _decorator;

@ccclass('WbcManager')
export default class WbcManager extends Component {
  @property(Label)
  public healthLabel: Label = null;
  @property(Label)
  public speedLabel: Label = null;
  @property(Label)
  public strengthLabel: Label = null;
  @property(Label)
  public resistanceLabel: Label = null;
  @property(Label)
  public reproductionRateLabel: Label = null;
  @property(Points)
  public points: Points = null;

  private _heatlhValue: number = 0;
  private _speedValue: number = 0;
  private _strengthValue: number = 0;
  private _resistanceValue: number = 0;
  private _reproductionRateValue: number = 0;

  public onVariableChangeEventTarget = new EventTarget();

  public get healthValue(): number {
    return this._heatlhValue;
  }

  public set healthValue(value: number) {
    this._heatlhValue = value;
    this.healthLabel.string = 'Saúde: ' + value.toString();
  }

  public get speedValue(): number {
    return this._speedValue;
  }

  public set speedValue(value: number) {
    this._speedValue = value;
    this.speedLabel.string = 'Velocidade: ' + value.toString();
  }

  public get strengthValue(): number {
    return this._strengthValue;
  }

  public set strengthValue(value: number) {
    this._strengthValue = value;
    this.strengthLabel.string = 'Força: ' + value.toString();
  }

  public get resistanceValue(): number {
    return this._resistanceValue;
  }

  public set resistanceValue(value: number) {
    this._resistanceValue = value;
    this.resistanceLabel.string = 'Resistência: ' + value.toString();
  }

  public get reproductionRateValue(): number {
    return this._reproductionRateValue;
  }

  public set reproductionRateValue(value: number) {
    this._reproductionRateValue = value;
    this.reproductionRateLabel.string = 'Reprodução: ' + value.toString();
    // Necessário inserir essa linha nos outros setters também
    // para que o evento seja emitido quando o valor mudar
    this.onVariableChangeEventTarget.emit('onPropertyChange', value);
  }

  onLoad() {
    this.healthValue = 20;
    this.speedValue = 2;
    this.strengthValue = 2;
    this.resistanceValue = 10;
    this.reproductionRateValue = 5;
  }

  addPoint(
    _,
    property:
      | 'healthValue'
      | 'speedValue'
      | 'resistanceValue'
      | 'reproductionRateValue'
  ) {
    if (this.points && this.points.canSpendPoint()) {
      this[property]++;
      this.points.subtractPoints(1);
    } else {
      console.log('Pontos insuficientes para adicionar em', property);
    }
  }

  removePoint(
    _,
    property:
      | 'healthValue'
      | 'speedValue'
      | 'resistanceValue'
      | 'reproductionRateValue'
  ) {
    if (this[property] > 0) {
      this[property]--;
      this.points.addPoints(1);
    }
  }
}

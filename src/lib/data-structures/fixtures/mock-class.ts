// c8 ignore file
import IComparable from '../interfaces/comparable';

export default class MockClass implements IComparable {
  private _mockProperty: number;

  constructor(mockProperty: number) {
    this._mockProperty = mockProperty;
  }

  get mockProperty(): number {
    return this._mockProperty;
  }

  isEqual(item: MockClass): boolean {
    return this._mockProperty === item._mockProperty;
  }

  isGreaterThan(object: MockClass): boolean {
    return this._mockProperty > object.mockProperty;
  }

  isLesserThan(object: this): boolean {
    return this._mockProperty < object._mockProperty;
  }
}

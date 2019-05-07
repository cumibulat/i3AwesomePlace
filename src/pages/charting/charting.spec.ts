import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { ChartingPage } from './charting';

let fixture: ComponentFixture<ChartingPage> = null;
let instance: any = null;

describe('Pages: HelloIonic', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ChartingPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the hello ionic page', async(() => {
    expect(instance).toBeTruthy();
  }));
});
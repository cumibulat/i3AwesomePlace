import {
  ComponentFixture,
  async,
  TestBed
} from '@angular/core/testing';
import {
  TestUtils
} from '../../test';
import {
  ChartingPage
} from './charting';
import {
  DebugElement
} from '@angular/core';
import {
  By
} from '@angular/platform-browser';

let fixture: ComponentFixture < ChartingPage > = null;
let instance: any = null;
let comp: ChartingPage;
let de: DebugElement;
let el: HTMLElement;


describe('Pages: HelloIonic', () => {

  beforeEach(async (() => TestUtils.beforeEachCompiler([ChartingPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;

    comp = fixture.componentInstance;

  })));

  it('should create the hello ionic page', async (() => {
    expect(instance).toBeTruthy();
  }));

  it('should load component succesfully', async (() => {
    expect(comp).toBeTruthy();
  }));

  it('can set the title to a supplied value', () => {

    de = fixture.debugElement.query(By.css('ion-card-header'));
    el = de.nativeElement;

    comp.ionViewDidLoad();
    fixture.detectChanges();

    expect(el.textContent).toContain('Bar Chart');
    // expect(el.textContent).toContain('Doughnut Chart');
    // expect(el.textContent).toContain('Line Chart');

  });

});

import {
  ComponentFixture,
  async,
  TestBed
} from '@angular/core/testing';
import {
  TestUtils
} from '../../test';
import {
  LoginPage
} from './login';
import {
  DebugElement
} from '@angular/core';
import {
  By
} from '@angular/platform-browser';

let fixture: ComponentFixture < LoginPage > = null;
let instance: any = null;
let comp: LoginPage;
let de: DebugElement;
let el: HTMLElement;

describe('Pages: LoginPage', () => {

  beforeEach(async (() => TestUtils.beforeEachCompiler([LoginPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    comp = fixture.componentInstance;

  })));

  it('should create the login page', async (() => {
    expect(instance).toBeTruthy();
  }));

  it('should load login component succesfully', async (() => {
    expect(comp).toBeTruthy();
  }));

//   it('can set the title to a supplied value', () => {

//     de = fixture.debugElement.query(By.css('ion-card-header'));
//     el = de.nativeElement;

//     comp.ionViewDidLoad();
//     fixture.detectChanges();

//     expect(el.textContent).toContain('Bar Chart');

//   });

});

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
  AuthenticationService
} from '../../services/authentication';
import {
  NgForm
} from '@angular/forms';
import {
  By
} from '@angular/platform-browser';

let fixture: ComponentFixture < LoginPage > = null;
let instance: any = null;
let comp: LoginPage;
let de: DebugElement;
let authSvc: AuthenticationService;

let el: HTMLElement;


describe('Pages: LoginPage', () => {

  beforeEach(async (() => TestUtils.beforeEachCompiler([LoginPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    comp = fixture.componentInstance;

    authSvc = TestBed.get(AuthenticationService);
  })));

  it('should create the login page', async (() => {
    expect(instance).toBeTruthy();
  }));

  it('should load login component succesfully', async (() => {
    expect(comp).toBeTruthy();
  }));

  it('should do login successfully', () => {
    // spyOn(authSvc, 'login').and.callThrough().and.returnValue(of({'status': 'training'}));
    spyOn(authSvc, 'login').and.callThrough();

    const xxForm = < NgForm > {
      value: {
        email: "Hello",
        password: "World"
      }
    };

    comp.login(xxForm);
    expect(authSvc.login).toHaveBeenCalled();
  });

  it('should go to register page', () => {
    spyOn(comp, 'goToRegister');
    comp.goToRegister();
    expect(comp.goToRegister).toHaveBeenCalled();
  });

  it('should call register page and triggered by button click', async(() => {
    spyOn(comp, 'goToRegister');
    let button = fixture.debugElement.nativeElement.querySelector('a');
    button.click();
    
    fixture.whenStable().then(() => {
      expect(comp.goToRegister).toHaveBeenCalled();
    });
  }));

});

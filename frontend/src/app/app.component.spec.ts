<<<<<<< HEAD
import { TestBed, async } from '@angular/core/testing';
=======
import { TestBed } from '@angular/core/testing';
>>>>>>> 9f07836a94e805e2b507156ed16fd1e7aa15f0cd
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
<<<<<<< HEAD
  beforeEach(async(() => {
    TestBed.configureTestingModule({
=======
  beforeEach(async () => {
    await TestBed.configureTestingModule({
>>>>>>> 9f07836a94e805e2b507156ed16fd1e7aa15f0cd
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
<<<<<<< HEAD
  }));
=======
  });
>>>>>>> 9f07836a94e805e2b507156ed16fd1e7aa15f0cd

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

<<<<<<< HEAD
  it(`should have as title 'misere-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('misere-frontend');
=======
  it(`should have as title 'MiserereMei'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('MiserereMei');
>>>>>>> 9f07836a94e805e2b507156ed16fd1e7aa15f0cd
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
<<<<<<< HEAD
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('misere-frontend app is running!');
=======
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('MiserereMei app is running!');
>>>>>>> 9f07836a94e805e2b507156ed16fd1e7aa15f0cd
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadedFilesPage } from './uploaded-files.page';

describe('UploadedFilesPage', () => {
  let component: UploadedFilesPage;
  let fixture: ComponentFixture<UploadedFilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedFilesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadedFilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

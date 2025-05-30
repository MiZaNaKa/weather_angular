import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiServicesComponent } from './api-services.component';

describe('ApiServicesComponent', () => {
  let component: ApiServicesComponent;
  let fixture: ComponentFixture<ApiServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

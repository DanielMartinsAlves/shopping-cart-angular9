import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartService } from '../../cart.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../model/product';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('CartService', ['clearCart','getItems']);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ CartComponent ],
      providers: [
        { provide: CartService, useValue: spy },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve mostrar os itens na tela', () => {
    const item:Product={
      name:'Item A',
      description:'Descrição Item A',
      price:100
    };
    cartServiceSpy.getItems.and.returnValue([item]);
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div.cart-item span:first-child').textContent).toEqual('Item A');
  });

  it('deve mapear corretamente os elementos do formGroup', () => {
    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('#name');
    const addressInput: HTMLInputElement = fixture.nativeElement.querySelector('#address');
    nameInput.value = 'Daniel';
    nameInput.dispatchEvent(new Event('input'));
    addressInput.value = '1111111';
    addressInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.checkoutForm.get('name').value).toEqual('Daniel');
    expect(component.checkoutForm.get('address').value).toEqual('1111111');

  });
  it('deve limpar os campos ao clicar no botão Purchase', () => {
    const item:Product={
      name:'Item A',
      description:'Descrição Item A',
      price:100
    };
    component.items = [item];
    cartServiceSpy.clearCart.and.returnValue([]);
    component.checkoutForm.get('name').setValue('Daniel');
    component.checkoutForm.get('address').setValue('1111111')
    fixture.nativeElement.querySelector('#purchase').click();
    fixture.detectChanges();
    expect(cartServiceSpy.clearCart).toHaveBeenCalled();
    expect(component.checkoutForm.get('name').value).toEqual(null);
    expect(component.checkoutForm.get('address').value).toEqual(null);
    expect(component.items).toEqual([]);
    //component.ngOnInit();
    //fixture.detectChanges();
    //expect(fixture.nativeElement.querySelector('div.cart-item span:first-child').textContent).toEqual('Item A');
  });
});

import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ShippingPrice } from './model/shipping-price';
import { of, defer } from 'rxjs';
import { Product } from './model/product';




function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
describe('CartService', () => {
  let service: CartService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: HttpClient, useValue: spy },
        
      ]
    });
    service = TestBed.inject(CartService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve adicionar 1 item a lista e buscá-lo', () => {
    const product: Product ={
      name: "Produto A",
      description:"Descrição Produto A",
      price:100
      };
    service.addToCart(product);
    expect(service.getItems()[0]).toEqual(product);
  });

  it('Deve limpar a lista', () => {
    const product: Product ={
      name: "Produto A",
      description:"Descrição Produto A",
      price:100
      };
    service.addToCart(product);
    service.addToCart(product);
    service.clearCart();
    expect(service.getItems()).toEqual([]);
  });
  
  //terminar testes dos outros métodos

  it('Deve retornar os preços de envio', (done: DoneFn) => {
    const shippingPrices: ShippingPrice[] =[ {
    price:100,
    type:"tipo"
    }];

    httpClientSpy.get.and.returnValue(asyncData(shippingPrices));

    service.getShippingPrices().subscribe((sp:ShippingPrice[])=>{
      expect(sp).toEqual(shippingPrices);
      done();
    },erro=> done.fail("Caiu no erro quando deveria cair no sucesso"));

  });

  it('Deve retornar erro ao buscar preços de envio', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'Erro 404',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    service.getShippingPrices().subscribe(sp=>done.fail("Caiu no sucesso quando deveria cair no erro"),
    (error:HttpErrorResponse) => {
      expect(error.status).toEqual(404);
      done();
    });

  });
});

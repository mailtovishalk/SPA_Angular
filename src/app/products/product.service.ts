import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,tap, map } from 'rxjs/operators'
@Injectable({
    providedIn:'root'
})
export class ProductService{
    private productUrl = 'api/products/products.json';

    constructor(private http:HttpClient){}
    
    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts().pipe(
          map((products: IProduct[]) => products.find(p => p.productId === id))
        );
      }

      
getProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productUrl).pipe(
        tap(data=> console.log('All:'+JSON.stringify(data))),catchError(this.handleError)
    );
}
   private handleError(err:HttpErrorResponse){
       let errMessage = '';
       if(err.error instanceof ErrorEvent)
       {
           errMessage = `An error occured:${err.error.message}`;
       }
       else
       {
        errMessage = `Server returned code :${err.status},error message is:${err.message}`; 
       }
       console.error(errMessage);
       return throwError(errMessage);
   }
}
import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css'],
    providers:[ProductService]
})
export class ProductListComponent implements OnInit{
         
    ngOnInit(): void {
        this.productService.getProducts().subscribe(
          products=>{
            this.products = products,
            this.filteredProducts = this.products;
          },
          error => this.errorMessage = <any>error
        );
        
    }
  pageTitle:string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage : boolean = false;
  errorMessage: string;

  filteredProducts:IProduct[];
  _listFilter:string;
  get listFilter():string{
      return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter = value;
    this.filteredProducts = this._listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  onRatingClicked(message : string): void
  {
      this.pageTitle = 'Product List ' + message;
  }
  performFilter(filterBy:string): IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product :IProduct) =>
     product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
  }
  constructor(private productService: ProductService)
  {
   
  }
  products: IProduct[] = [];
  
  
  toggleImage(): void {
    this.showImage = !this.showImage;
    }
}
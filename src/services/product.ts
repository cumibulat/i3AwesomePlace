import {
  Injectable
} from "@angular/core";

import {
  HttpClient
} from "@angular/common/http";
@Injectable()
export class ProductService {

  constructor(
    private http: HttpClient
  ) {
  }

  fetchBestSeller() {
    return this.http.get('assets/data/products.json')
  }

}

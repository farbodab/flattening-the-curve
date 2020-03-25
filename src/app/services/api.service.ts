import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly results_endpoint : string = 'https://flatteningthecurve.herokuapp.com/covid/results'
  readonly phu_endpoint : string = 'https://flatteningthecurve.herokuapp.com/covid/phu';
  readonly test_results_endpoint : string = 'https://flatteningthecurve.herokuapp.com/covid/testresults';

  constructor(private http_client : HttpClient) {

  }

  get_results_data(on_success, on_error) {
    this.request_data(this.results_endpoint, on_success, on_error);
  }

  get_phu_data(on_success, on_error) {
    this.request_data(this.phu_endpoint, on_success, on_error);
  }

  get_test_results_data(on_success, on_error) {
    this.request_data(this.test_results_endpoint, on_success, on_error);
  }

  private request_data(endpoint, on_success, on_error) {
    const sub = this.http_client.get(endpoint).subscribe(response => {
      sub.unsubscribe();
      if(on_success) {
        on_success(response)
      }
    }, error => {
      sub.unsubscribe();
      if(on_error) {
        on_error(error);
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../providers/app-config.service';
import { AppConfigProperties } from '../interfaces/app-config';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  appConfigProperties: AppConfigProperties;

  constructor(private http_client: HttpClient, private config: AppConfigService) {
    this.appConfigProperties = this.config.getConfig();
  }

  get_reopening_obj() {
    return this.http_client.get(this.appConfigProperties.reopening_object_endpoint);
  }

  get_reopeneing_times() {
    return this.http_client.get(this.appConfigProperties.reopening_times_endpoint);

  }

  get_data_obj() {
    return this.http_client.get(this.appConfigProperties.data_object_endpoint);
  }

  get_plot_obj() {
    //this.request_data(this.viz_object_endpoint, on_success, on_error);
    return this.http_client.get(this.appConfigProperties.plot_object_endpoint);
  }

  get_viz_obj() {
    //this.request_data(this.viz_object_endpoint, on_success, on_error);
    return this.http_client.get(this.appConfigProperties.viz_object_endpoint);
  }

  get_team_obj() {
    //this.request_data(this.viz_object_endpoint, on_success, on_error);
    return this.http_client.get(this.appConfigProperties.team_object_endpoint);
  }

  get_summary_obj(HR_UID) {
    //this.request_data(this.viz_object_endpoint, on_success, on_error);
    return this.http_client.get(this.appConfigProperties.summary_object_endpoint + "?HR_UID=" + HR_UID);
  }

  get_epi_obj(HR_UID, filter) {
    //this.request_data(this.viz_object_endpoint, on_success, on_error);
    return this.http_client.get(this.appConfigProperties.epi_object_endpoint + "?HR_UID=" + HR_UID + "&filter=" + filter);
  }

  get_alert_obj() {
    return this.http_client.get(this.appConfigProperties.alert_object_endpoint);
  }

  get_vaccine_obj() {
      return this.http_client.get(this.appConfigProperties.vaccine_object_endpoint);
    }

  post_mail_obj(content) {
    //this.request_data(this.viz_object_endpoint, on_success, on_error);
    return this.http_client.post(this.appConfigProperties.mail_object_endpoint, content);
  }

  get_results_data(on_success, on_error) {
    this.request_data(this.appConfigProperties.results_endpoint, on_success, on_error);
  }

  get_phu_data(on_success, on_error) {
    this.request_data(this.appConfigProperties.phu_endpoint, on_success, on_error);
  }

  get_phunew_data(on_success, on_error) {
    this.request_data(this.appConfigProperties.phunew_endpoint, on_success, on_error);
  }

  get_test_results_data(on_success, on_error) {
    this.request_data(this.appConfigProperties.test_results_endpoint, on_success, on_error);
  }

  get_summary_data(on_success, on_error) {
    this.request_data(this.appConfigProperties.summary_object_endpoint, on_success, on_error);
  }

  private request_data(endpoint, on_success, on_error) {
    const sub = this.http_client.get(endpoint).subscribe(response => {
      sub.unsubscribe();
      if (on_success) {
        on_success(response);
      }
    }, error => {
      sub.unsubscribe();
      if (on_error) {
        on_error(error);
      }
    });

  }
}

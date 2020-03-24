import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  graph_data = null;

  constructor(private api_service : ApiService) { 
    
  }

  ngOnInit() {
    this.api_service.get_graph_data( data => {
      this.graph_data = data;
    }, error => {
      console.error(error);
    })
  }
}

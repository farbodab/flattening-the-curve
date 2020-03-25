import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-num-cases-time-graph',
  templateUrl: './num-cases-time-graph.component.html',
  styleUrls: ['./num-cases-time-graph.component.scss']
})
export class NumCasesTimeGraphComponent implements OnInit {

  @Input()
  graph_data : any;
  log_scale: boolean;
  graph = null;

  constructor() { }

  ngOnInit() {
    this.redraw();
  }

  private redraw() {
    const algoma = this.graph_data['Algoma'];
    const brant = this.graph_data['Brant'];
    const chatham = this.graph_data['Chatham-Kent'];
    const durham = this.graph_data['Durham'];
    const eastern = this.graph_data['Eastern'];
    const grey = this.graph_data['Grey Bruce'];
    const haliburton = this.graph_data['Haliburton Kawartha Pineridge'];
    const hamilton = this.graph_data['Hamilton'];
    const hastings = this.graph_data['Hastings Prince Edward'];
    const huron = this.graph_data['Huron Perth'];
    const kingston = this.graph_data['Kingston Frontenac Lennox & Addington'];
    const middlesex = this.graph_data['Middlesex-London'];
    const northwestern = this.graph_data['Northwestern'];
    const nr = this.graph_data['Not Reported'];
    const ottawa = this.graph_data['Ottawa'];
    const peel = this.graph_data['Peel'];
    const peterborough = this.graph_data['Peterborough'];
    const porcupine = this.graph_data['Porcupine'];
    const simcoe = this.graph_data['Simcoe Muskoka'];
    const sudbury = this.graph_data['Sudbury'];
    const toronto = this.graph_data['Toronto'];
    const waterloo = this.graph_data['Waterloo'];
    const wellington = this.graph_data['Wellington Dufferin Guelph'];
    const windsor = this.graph_data['Windsor-Essex'];
    const york = this.graph_data['York'];

    this.graph = null;

    this.graph = {
      data: [
        { x: Object.keys(algoma), y: Object.values(algoma), type: 'scatter', mode: 'lines+markers', name: 'algoma' },
        { x: Object.keys(brant), y: Object.values(brant), type: 'scatter', mode: 'lines+markers', name: 'brant' },
        { x: Object.keys(chatham), y: Object.values(chatham), type: 'scatter', mode: 'lines+markers', name: 'chatham' },
        { x: Object.keys(durham), y: Object.values(durham), type: 'scatter', mode: 'lines+markers', name: 'durham' },
        { x: Object.keys(eastern), y: Object.values(eastern), type: 'scatter', mode: 'lines+markers', name: 'eastern' },
        { x: Object.keys(grey), y: Object.values(grey), type: 'scatter', mode: 'lines+markers', name: 'grey' },
        { x: Object.keys(haliburton), y: Object.values(haliburton), type: 'scatter', mode: 'lines+markers', name: 'haliburton' },
        { x: Object.keys(hamilton), y: Object.values(hamilton), type: 'scatter', mode: 'lines+markers', name: 'hamilton' },
        { x: Object.keys(hastings), y: Object.values(hastings), type: 'scatter', mode: 'lines+markers', name: 'hastings' },
        { x: Object.keys(huron), y: Object.values(huron), type: 'scatter', mode: 'lines+markers', name: 'huron' },
        { x: Object.keys(kingston), y: Object.values(kingston), type: 'scatter', mode: 'lines+markers', name: 'kingston' },
        { x: Object.keys(middlesex), y: Object.values(middlesex), type: 'scatter', mode: 'lines+markers', name: 'middlesex' },
        { x: Object.keys(northwestern), y: Object.values(northwestern), type: 'scatter', mode: 'lines+markers', name: 'northwestern' },
        { x: Object.keys(nr), y: Object.values(nr), type: 'scatter', mode: 'lines+markers', name: 'nr' },
        { x: Object.keys(ottawa), y: Object.values(ottawa), type: 'scatter', mode: 'lines+markers', name: 'ottawa' },
        { x: Object.keys(peel), y: Object.values(peel), type: 'scatter', mode: 'lines+markers', name: 'peel' },
        { x: Object.keys(peterborough), y: Object.values(peterborough), type: 'scatter', mode: 'lines+markers', name: 'peterborough' },
        { x: Object.keys(porcupine), y: Object.values(porcupine), type: 'scatter', mode: 'lines+markers', name: 'porcupine' },
        { x: Object.keys(simcoe), y: Object.values(simcoe), type: 'scatter', mode: 'lines+markers', name: 'simcoe' },
        { x: Object.keys(sudbury), y: Object.values(sudbury), type: 'scatter', mode: 'lines+markers', name: 'sudbury' },
        { x: Object.keys(simcoe), y: Object.values(simcoe), type: 'scatter', mode: 'lines+markers', name: 'simcoe' },
        { x: Object.keys(toronto), y: Object.values(toronto), type: 'scatter', mode: 'lines+markers', name: 'toronto' },
        { x: Object.keys(waterloo), y: Object.values(waterloo), type: 'scatter', mode: 'lines+markers', name: 'waterloo' },
        { x: Object.keys(wellington), y: Object.values(wellington), type: 'scatter', mode: 'lines+markers', name: 'wellington' },
        { x: Object.keys(windsor), y: Object.values(windsor), type: 'scatter', mode: 'lines+markers', name: 'windsor' },
        { x: Object.keys(york), y: Object.values(york), type: 'scatter', mode: 'lines+markers', name: 'york' },
      ],
      layout: {yaxis:
        {
          title: 'Number of Cases',
          type: 'log',

        },
        grid: {rows:1, columns: 1, pattern: 'independent'}
      }
    };









  }

}

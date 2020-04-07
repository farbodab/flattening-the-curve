import {Component} from '@angular/core';

@Component({
    selector: 'app-analysis-regional',
    templateUrl: './analysis.capacity.component.html'
})
export class AnalysisCapacityComponent {
    toggleTextFlag = true;
    
    toggleText() {
        this.toggleTextFlag = !this.toggleTextFlag;
    }
}
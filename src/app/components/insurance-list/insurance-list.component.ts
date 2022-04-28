import { Observable } from 'rxjs';
import { InsuranceService } from './../../services/insurance.service';
import { Component, OnInit } from '@angular/core';
import { Insurance } from 'src/app/models/insurance.model';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.css']
})
export class InsuranceListComponent implements OnInit {

  public insurances$!: Observable<Insurance[]>;

  constructor(
    private insuranceService: InsuranceService
  ) { }

  ngOnInit(): void {
    this.insurances$ = this.insuranceService.list()
  }

}

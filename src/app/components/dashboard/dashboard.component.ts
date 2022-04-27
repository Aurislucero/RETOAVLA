import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InewListData } from 'src/app/interfaces/movements';
import { MovementsService } from 'src/app/services/movements.service';
import { IDropdownItem } from '../commpons/dropdown/dropdown.model';
import { listItemsMetrics } from './dashboard.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MovementsService]
})
export class DashboardComponent implements OnInit  {
  formData: FormGroup;
  itemsListFamily: any[] = [];
  itemsListMetrics: IDropdownItem[] = [];
  itemsListYears: any[] = [];
  listData:any={typeOperation:"Total",data:[]};
  typeFamily: any = "";
  typeMetric: any = "";
  typeYear: any = "";
  mensaje: any = ""
  displayedColumns: string[] = ['position', 'name'];
  constructor(
    private _movementsService: MovementsService,
    private _fb: FormBuilder,
  ) {
    this.getListTypeYears();
    this.getListTypeFamilies()

    this.formData = this._fb.group({
      selectTypeFamily: ['', Validators.required],
      selectTypeMetric: ['', Validators.required],
      selectTypeYear: ['', Validators.required],
    });

    this.formData.controls['selectTypeMetric'].setValue(listItemsMetrics[0].value);
    this.typeMetric = listItemsMetrics[0].value
    this.itemsListMetrics = listItemsMetrics

  }

  ngOnInit(): void {
  }



  getListTypeYears() {
    this._movementsService.listYears().subscribe(
      res => {
        res.map((elem:string)=>{this.itemsListYears.push({ value:elem })})
        this.formData.controls['selectTypeYear'].setValue(this.itemsListYears[0].value);
        this.typeYear = this.itemsListYears[0].value
      }
    )
  }

  getListTypeFamilies() {
    this._movementsService.listTypesOfFamily().subscribe(
      res => {
         res.map((elem:number)=>{this.itemsListFamily.push({ value:elem })})
        this.formData.controls['selectTypeFamily'].setValue(this.itemsListFamily[0].value);
        this.typeFamily = this.itemsListFamily[0].value
      }
    )
  }

  onChangeSelectTypeFamily(mensaje: any) {
    this.formData.controls['selectTypeFamily'].setValue(mensaje);

  }
  onChangeSelectTypeMetric(mensaje: any) {
    this.formData.controls['selectTypeMetric'].setValue(mensaje);
  }

  onChangeSelectTypeYear(mensaje: any) {
    this.formData.controls['selectTypeYear'].setValue(mensaje);
  }

  getList(){
    this._movementsService.get(
      this.typeFamily,
      this.typeMetric,
      this.typeYear).subscribe(
        data => {
          this.listData=data
        });
  }

  filter() {
      this._movementsService.get(
        this.formData.controls['selectTypeFamily'].value,
        this.formData.controls['selectTypeMetric'].value,
        this.formData.controls['selectTypeYear'].value).subscribe(
          data => {
            this.listData=data
          });
  }
}

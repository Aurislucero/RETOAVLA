import { Component, OnInit,Input } from '@angular/core';
import { InewListData } from 'src/app/interfaces/movements';
export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen'},
  {position: 2, name: 'Helium'},
  {position: 3, name: 'Lithium'},
  {position: 4, name: 'Beryllium'},
  {position: 5, name: 'Boron'},
  {position: 6, name: 'Carbon'},
  {position: 7, name: 'Nitrogen'},
  {position: 8, name: 'Oxygen'},
  {position: 9, name: 'Fluorine'},
  {position: 10, name: 'Neon'},
];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name'];
  @Input() newlistData:InewListData={typeOperation:"Total",data:[]}
  dataSource = ELEMENT_DATA;
  constructor() {
    this.dataSource
    this.newlistData={typeOperation:"Total",data:[]};
   }

  ngOnInit(): void {
  }

}

import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDropdownItem } from './dropdown.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() title: string = ""
  @Input() items: IDropdownItem[] = [];
  @Input() text: string | number = "";
  @Output() selectedItem: EventEmitter<any> = new EventEmitter();
  selectedValue: string | number = (this.items[0]) ? this.items[0].value : ""
  constructor() { }

  ngOnInit(): void {
  }
  public value: IDropdownItem | string = "";
  onChange = (_: any) => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(item: IDropdownItem | string): void {
    if (item) {
      this.value = item;
    }
  }

  selectValue() {
    this.selectedItem.emit(this.selectedValue);
    this.text = "";
  }
  getText(item: IDropdownItem | string) {
    return (typeof item === 'string' || typeof item === 'number') ? item : item.value;
  }

}

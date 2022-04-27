export interface IMovements {
    id: number;
    amount: number;
    date: string;
    family:number;
  }


  export interface InewArrayForMonth{
    month:string,
    operation:number
  }

  export interface InewListData{
    data:InewArrayForMonth[],
    typeOperation:string
  }
export interface IBrowser {  
  release_date:string,
  status: string,
  version:string,
  name:string,
}

export interface IBrowsers {
  date:string,
  browsers:IBrowser[],
}

export interface IYearItems {
  [key: string]: IBrowsers[] | boolean, 
}





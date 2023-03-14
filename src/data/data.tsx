import _, {Dictionary} from "underscore";
import {IBrowser} from "../data/interface";

// *************************************************************************************

function sortBasedOnDate(items:any , sortBy:string) {
  return items.sort(function (first:any, second:any) {
    const _first = new Date(first[sortBy]);
    const _second = new Date(second[sortBy]);
    return _first - _second;
  });
}

// *************************************************************************************

function getBrowsersBasedOnYear(items:Dictionary<IBrowser[]>, year:number) {
  const computedItems = Object
    .entries(items)
    .filter(function (item) {
      const [key, browsers] = item;
      const browserYear = new Date(Date.parse(key)).getFullYear();
      if (browserYear == year) return browsers;
    })
    .map(item => ({date: item.shift(), browsers: sortBasedOnDate(item.pop(), "release_date")}));

  return sortBasedOnDate(computedItems, "date");
}

// *************************************************************************************

export const transformStructure = (browsers:any) => { 

  const allBrowsers:IBrowser[] = [];
  const years:number[] = [] ;  

  Object.entries(browsers).map(item => {
    const key = item.shift();
    const values = item.pop();

    const {versions}:any = values;    

    Object.keys(versions).map(keyVersion => {
      const version = versions[keyVersion];
      if (version && version?.release_date) {
        const {release_date} = version;
        const year = new Date(Date.parse(release_date)).getFullYear();
        years.push(year);
        allBrowsers.push({...version, name: key});
      }
    });

  });

  const grouped = _.groupBy(allBrowsers, function (item) {
    return item.release_date;
  });  

  const uniqueSortedYears = [...new Set([...years])].sort((first, second) => first - second);

  const result = Array.from(uniqueSortedYears).map(year => ({expand:false,  [year]: getBrowsersBasedOnYear(grouped, year)})); 
  
  return result;

};

// *************************************************************************************

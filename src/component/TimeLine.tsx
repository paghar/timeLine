import React from "react";
import style from "./TimeLine.module.css";
import Link from "next/link";
import {IYearItems,IBrowsers,IBrowser} from "../data/interface";

interface IProps {
  items:IYearItems[],
  yearOnClick:(index:number)=> void
  expandAll:boolean,
  expandOnclick:()=>void,
}

const TimeLine = ({
  items,yearOnClick,
  expandAll,
  expandOnclick
}:IProps) => {  
 
  const renderBrowsers = (browserItems:IBrowser[]) => {
    return browserItems.map((item:IBrowser,index:number)=>(
      <Link target="_blank" key={index} href={{pathname: `https://canistop.net/b/${item.name}/${item.version}`}}>
        <label> {item.name} {item.version}</label>	
      </Link>    
    ));
  }; 

  const yearElement = (yearItems:IBrowsers[]) => {     
    return  yearItems.map ((yearItem:IBrowsers,index:number)=>(      
      <div key={index} className={style.content}>        
        <h3>{yearItem["date"]}</h3> 
        {renderBrowsers(yearItem["browsers"])}
      </div>
    ));
  };
  
  const renderItems = items.map((item:IYearItems,index:number) => {  
    const isExpand = item.expand;   
    const expandIcon = isExpand? "-" : "+" ;
    return Object.keys(item).map((key)=>{     
      if (key !== "expand" && key){
        return <li key={index}  >
          <> 
            <span onClick={()=>yearOnClick(index)}>
              {expandIcon}
              {key} 
            </span>           
            {isExpand && yearElement(item[key] as IBrowsers[] )}
          </>       
        </li>;
      }      
    });  
  });

  return(   
    <div className={style.timeline}>       
      <span className={style.expand} onClick={() =>expandOnclick()}> {!expandAll ? "Collapse--all" : "Expand--all" }</span>      
      <ul>
        {renderItems}                   	
      </ul>
    </div>    
  );
};

export default TimeLine;
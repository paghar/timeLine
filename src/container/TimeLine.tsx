import React, {useCallback, useEffect, useState} from "react";
import {transformStructure} from "../data/data";
import TimeLine from "../component/TimeLine";
import axios from "axios";
import {IYearItems} from "../data/interface";

const TimeLineContainer = () => {

  const [timelineItems, setTimeLineItems] = useState<IYearItems[]>([]);
  const [expandAll,setExpandAll] = useState<boolean>(true);

  const yearOnClick = useCallback((index:number)=>{   
    const updatedObj = {...timelineItems[index], expand: !timelineItems[index].expand};
    const updatedItems = [
      ...timelineItems.slice(0, index),
      updatedObj,
      ...timelineItems.slice(index + 1),
    ];

    setTimeLineItems(updatedItems);  

  },[timelineItems]);  

  const expandOnclick = useCallback(()=>{    
    const updatedObj = timelineItems.map((item:IYearItems) =>({...item, expand:expandAll}));
    setExpandAll(!expandAll);
    setTimeLineItems(updatedObj);
  },[timelineItems]);
   

  const fetchData = ()=>{   
    axios
      .get("https://canistop.net/storage/metadata.json")
      .then(response => {   
        const {browsers} = response.data;      
        setTimeLineItems(transformStructure(browsers));                               
      })
      .catch(error => {
        // error.message is the error message
        console.log(error);
      });    
  };  

  useEffect(()=>{
    fetchData();   
  },[]); 

  return(   
    <TimeLine items={timelineItems} yearOnClick={yearOnClick} expandAll={expandAll} expandOnclick={expandOnclick}/>
  );
  
};

export  default TimeLineContainer;
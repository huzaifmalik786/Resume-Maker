import React,{useState,useEffect, useRef, forwardRef} from 'react'
import { AtSign,Phone, GitHub, Linkedin, Calendar, Link, MapPin } from 'react-feather';
import styles from "./Resume.module.css";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const Resume = forwardRef((props, ref) => {
  const sections=props.sections;
  const information=props.information;
  const [columns,setcolumns]=useState([[],[]]);
  const containerref=useRef()

  const getdate=(value)=>{
    if(!value) return;
    const date= new Date(value);
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  }

  const info={
    workexp: information[sections.workexp],
    project: information[sections.project],
    education: information[sections.education],
    achievements: information[sections.achievements],
    summary: information[sections.summary],
    other: information[sections.other],
    basicinfo: information[sections.basicinfo]
  }

  const sectiondiv={
    [sections.workexp]:(
      <div key={"workexp"}
      className={`${styles.section} ${info.workexp?.sectionTitle? "": (styles.hidden)}`}>
        
        <div className={styles.sectiontitle}>{info.workexp.sectionTitle}</div>
        <div className={styles.content}>
          {info.workexp?.details?.map((item)=>(
             <div className={styles.item} key={item.title}>
               {item.title? (
                 <div className={styles.title}>{item.title}</div>
               ): (<span/>)}
               {item.companyname? (
                 <div className={styles.subtitle}>{item.companyname}</div>
               ): (<span/>)}
               {item.startdate && item.enddate? (
                 <div className={styles.date}><Calendar/>{getdate(item.startdate)} - {getdate(item.enddate)}</div>
               ): (<span/>)}
               {item.certification? (
                 <div className={styles.link}><Link/>{item.certification}</div>
               ): (<span/>)}
               {item.location? (
                 <div className={styles.location}><MapPin/>{item.location}</div>
               ): (<span/>)}
               {item.points?.length>0 ? (
                 <div className={styles.points}>
                   {item.points?.map((point,index) => (
                     point?.length>0? (
                      <li className={styles.point} key={point+index}>{point}</li>
                    ): <span/> 
                   ))}
                 </div>    
               ): (<span/>)}
           </div>
          ))}
        </div>
      </div>
    ),
    [sections.project]: (
      <div key={"project"} 
      className={`${styles.section} ${info.project?.sectionTitle? "": (styles.hidden)}`}>
        <div className={styles.sectiontitle}>{info.project.sectionTitle}</div>
        <div className={styles.content}>
          {info.project?.details?.map((item)=> (
            <div className={styles.item} key={item.title}>
              {item.title? (
                <div className={styles.title}>{item.title}</div>
              ): (<span/>)}
              {item.deployedlink? (
                <div className={styles.link}><Link/>{item.deployedlink}</div>
              ): <span/>}
              {item.github? (
                <div className={styles.location}><GitHub/>{item.github}</div>
              ):<span/> }
              {item.overview? (
                <div className={styles.overview}>{item.overview}</div>
              ): <span/>}
              {item.points?.length>0?(
                <div className={styles.points}>
                  {item.points?.map((point,index)=> (
                    point?.length>0? (
                      <li className={styles.point} key={point+index}>{point}</li>
                    ): <span/>
                  ))}
                </div>
              ):<span/>}
          </div>
          ))}
        </div>
      </div>
    ),
    [sections.education]: (
      <div key={"education"}
      className={`${styles.section} ${info.education?.sectionTitle? "": (styles.hidden)}` }>
        <div className={styles.sectiontitle}>{info.education?.sectionTitle}</div>
        <div className={styles.content}>
          {info.education?.details?.map((item)=>(
            <div className={styles.item}>
              {item.title? (
                <div className={styles.title}>{item.title}</div>
              ): <span/> }
              {item.college? (
                <div className={styles.subtitle}>{item.college}</div>
              ): <span/>}
              {item.startdate && item.enddate? (
                <div className={styles.date}><Calendar/> {getdate(item.startdate)} - {getdate(item.enddate)}</div>
              ): <span/>}
              </div>
              ))}
        </div>
      </div>
    ),
    [sections.achievements]: (
      <div key={"achievment"}
      className={`${styles.section} ${info.achievements?.sectionTitle? "": (styles.hidden)}` }>
        <div className={styles.sectiontitle}>{info.achievements?.sectionTitle}</div>
        <div className={styles.content}>
          {info.achievements?.points?.length>0? (
            <div className={styles.points}>
              {info.achievements?.points?.map((point,index)=> (
                point?.length>0? (
                  <li className={styles.point} key={point+index}>{point}</li>
                ): <span/> 
              ))}
            </div>
          ): (<span/>)}
        </div>
      </div>
    ),
    [sections.other]: (
      <div key={"other"}
      className={`${styles.section} ${info.other?.sectionTitle? "": (styles.hidden)}` }>
        <div className={styles.sectiontitle}>{info.other?.sectionTitle}</div>
        <div className={styles.content}>
        {info.other?.list?.length>0? (
            <div className={styles.points}>
              {info.other?.list?.map((point,index)=> (
                point?.length>0? (
                  <li className={styles.point} key={point+index}>{point}</li>
                ): <span/> 
              ))}
            </div>
          ): (<span/>)}
        </div>
      </div>
    ),
    [sections.summary]: (
      <div key={"summary"}
      className={`${styles.section} ${info.summary?.sectionTitle? "": (styles.hidden)}` }>
        <div className={styles.sectiontitle}>{info.summary?.sectionTitle}</div>
        <div className={styles.content}>
        {info.summary?.detail? (
            <div className={styles.overview}>{info.summary?.detail}</div>
          ): (<span/>)}
        </div>
      </div>
    )
  }

  const swapsection=(source,target,srcdrop,tardrop)=>{
    if(!srcdrop || !tardrop) return;
    const tempcolumns=[[...columns[0]],[...columns[1]]];
    const srcsection= tempcolumns[srcdrop-1][source+0];
    const tarsection=tempcolumns[tardrop-1][target+0];
    tempcolumns[tardrop-1][target+0]=srcsection;
    tempcolumns[srcdrop-1][source+0]=tarsection; 
    setcolumns(tempcolumns);
  }

  useEffect(() => {
    setcolumns([
      [sections.project,sections.education,sections.summary],
      [sections.workexp,sections.achievements,sections.other]
    ])
  }, []);
  useEffect(()=>{
    const container=containerref.current;
    if(!props.color || !container) return;
    container.style.setProperty("--color", props.color);
  },[props.color])

  return (
    <DragDropContext onDragEnd={(param)=>{
      const source=param.source?.index? param.source.index: "";
      const target=param.destination?.index? param.destination.index: "";
      const srcdrop=param.source?.droppableId? param.source.droppableId=='droppable1'? 1: 2: "";
      const tardrop=param.destination?.droppableId? param.destination.droppableId=='droppable1'? 1: 2: "";
      swapsection(source,target,srcdrop,tardrop);
    }}>
      <div ref={ref}>
        <div className={styles.container} ref={containerref}>
          <div className={styles.header}>
            <p className={styles.heading}>{info.basicinfo?.detail.name}</p>
            < p className={styles.subheading}>{info.basicinfo?.detail.title}</p>
            <div className={styles.links}>
              {info.basicinfo?.detail?.email? (
                <p className={styles.link}><AtSign/> {info.basicinfo?.detail?.email}</p>
              ) : (<span/>)}
              {info.basicinfo?.detail?.phone? (
                <p className={styles.link}><Phone/> {info.basicinfo?.detail?.phone}</p>
              ): (<span/>)}
              {info.basicinfo?.detail?.github? (
                <p className={styles.link}><GitHub/>{info.basicinfo?.detail?.github}</p>
              ): (<span/>)}
              {info.basicinfo?.detail?.linkedin? (
                <p className={styles.link}><Linkedin/>{info.basicinfo?.detail?.linkedin}</p> 
              ): (<span/>)}
            </div>
          </div>
          <div className={styles.main} >
            <Droppable droppableId="droppable1">
              {(provided, _)=> (
                <div className={styles.col1} ref={provided.innerRef} {...provided.droppableProps}>
                  {columns[0].map((item,index)=>(
                    <Draggable key={item+index} draggableId={item} index={index}>
                      {(provided, snapshot)=>(
                        <div className={styles.colitem} ref={provided.innerRef} 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{...provided.draggableProps.style,
                          border: snapshot.isDragging? "1px dotted black": "none",
                          opacity: snapshot.isDragging? "0.4": "1"}}
                        >{sectiondiv[item]}</div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
            )}
            </Droppable>

            <Droppable droppableId="droppable2">
            {(provided, _)=> (
                <div className={styles.col2} ref={provided.innerRef} {...provided.droppableProps}>
                  {columns[1].map((item,index)=> (
                    <Draggable key={item+index} draggableId={item} index={index}>
                      {(provided, snapshot)=> (
                        <div className={styles.colitem} ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{...provided.draggableProps.style,
                          border: snapshot.isDragging? "1px dotted black": "none", 
                          opacity: snapshot.isDragging? "0.4": "1"}}
                        >{sectiondiv[item]}</div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
            )}
            </Droppable>      
          </div>
        </div>
      </div>
    </DragDropContext>
  )
});

export default Resume
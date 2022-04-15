import React,{useState, useEffect} from 'react'
import styles from "./Editor.module.css";
import {X} from "react-feather";
import InputControl from "../InputControl/InputControl";
import { Feather } from 'react-feather';

function Editor(props) {
    const sections=props.sections;
    const information=props.information;
    const [activesection,setactivesection]= useState(Object.keys(sections)[0]);
    const [activeInformation,setactiveInformation]= useState(information[sections[Object.keys(sections)[0]]]);
    const [sectiontitle, setsectiontitle] = useState(sections[Object.keys(sections)[0]]);
    const [activechipindex,setactivechipindex]= useState(0);
    const [values,setvalues] = useState({
        title: activeInformation?.detail?.title || "",
        name: activeInformation?.detail?.name || "",
        github: activeInformation?.detail?.github || "",
        linkedin: activeInformation?.detail?.linkedin || "",
        phone: activeInformation?.detail?.phone || "",
        email: activeInformation?.detail?.email || "",
    })
    const handlepointupdate=(value,index)=>{
        const tempvalues={...values};
        if(!Array.isArray(tempvalues.points)) tempvalues.points=[];
        tempvalues.points[index]=value;
        setvalues(tempvalues);
    };

    const handlelistupdate=(value,index)=>{
        const tempvalues={...values};
        if(!Array.isArray(tempvalues.list)) tempvalues.list=[];
        tempvalues.list[index]=value;
        setvalues(tempvalues);
    };

    const workexpbody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl label="Title" value={values.title} placeholder="Enter title e.g Frontend Developer" 
                onChange={(event)=>(
                    setvalues((prev)=> ({...prev,title: event.target.value}))
                )}/>
                <InputControl label="Company Name" value={values.companyname} placeholder="Enter company name" 
                 onChange={(event)=>(
                    setvalues((prev)=> ({...prev,companyname: event.target.value}))
                )}/>
            </div>
            <div className={styles.row}>
                <InputControl label="Certificate Link(if any)" value={values.certification} 
                placeholder="Certificate Link if any"
                onChange={(event)=>(
                    setvalues((prev)=> ({...prev,certification: event.target.value}))
                )}/>
                <InputControl label="Location" value={values.location} placeholder="Enter location of company"
                 onChange={(event)=>(
                    setvalues((prev)=> ({...prev,location : event.target.value}))
                )}/>
            </div>
            <div className={styles.row}>
                <InputControl label="Start Date" value={values.startdate} type="date"
                 placehoder="Enter start date"
                 onChange={(event)=>(
                    setvalues((prev)=> ({...prev, startdate: event.target.value}))
                )}/>
                <InputControl label="End Date" value={values.enddate} type="date" placehoder="Enter end date"
                 onChange={(event)=>(
                    setvalues((prev)=> ({...prev,enddate : event.target.value}))
                )}/>
            </div>
            <div className={styles.column}>
                <label>Enter Work Description</label>
                <InputControl value={values.points? values.points[0] || "": ""} placeholder="Line 1"
                onChange={(event)=>(
                    handlepointupdate(event.target.value,0)
                )}/>
                <InputControl value={values.points? values.points[1] || "": ""} placeholder="Line 2"
                 onChange={(event)=>(
                    handlepointupdate(event.target.value,1)
                )}/>
                <InputControl value={values.points? values.points[2] || "": ""} placeholder="Line 3"
                 onChange={(event)=>(
                    handlepointupdate(event.target.value,2)
                )}/>
                <InputControl value={values.points? values.points[3] || "": ""} placeholder="Line 4"
                 onChange={(event)=>(
                    handlepointupdate(event.target.value,3)
                )}/>
            </div>
        </div>
    );
    const projectbody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl label="Title" value={values.title} 
                placeholder="Enter title of your project e.g Chat app"
                onChange={(event)=>(
                    setvalues((prev)=> ({...prev,title : event.target.value}))
                )}/>
            </div>
            <InputControl label="Overview" value={values.overview} 
            placeholder="Enter basic overview of project"
            onChange={(event)=>(
                setvalues((prev)=> ({...prev,overview : event.target.value}))
            )}/>
            <div className={styles.row}>
                <InputControl label="Deployed Link" value={values.deployedlink} 
                placeholder="Enter link to your project"
                onChange={(event)=>(
                    setvalues((prev)=> ({...prev,deployedlink : event.target.value}))
                )}/>
                <InputControl label="GitHub Link" value={values.github}
                 placeholder="Enter your GitHub link"
                 onChange={(event)=>(
                    setvalues((prev)=> ({...prev,github : event.target.value}))
                )}/>
            </div>
            <div className={styles.column}>
                <label>Enter Project Description</label>
                <InputControl value={values.points? values.points[0] || "": ""} placeholder="Line 1"
                onChange={(event)=>(
                    handlepointupdate(event.target.value,0)
                )}/>
                <InputControl value={values.points? values.points[1] || "": ""} placeholder="Line 2"
                onChange={(event)=>(
                    handlepointupdate(event.target.value,1)
                )}/>
                <InputControl value={values.points? values.points[2] || "": ""} placeholder="Line 3" 
                onChange={(event)=>(
                    handlepointupdate(event.target.value,2)
                )}/>
                <InputControl value={values.points? values.points[3] || "": ""} placeholder="Line 4"
                onChange={(event)=>(
                    handlepointupdate(event.target.value,3)
                )}/>
            </div>
        </div>
    );

    const educationbody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl label="Title" value={values.title} placeholder="Enter title e.g B-tech"
                 onChange={(event)=>(
                    setvalues((prev)=> ({...prev, title : event.target.value}))
                )}/>
            </div>
            <InputControl label="College/School Name" value={values.college} 
            placeholder="Enter name of institute"
            onChange={(event)=>(
                setvalues((prev)=> ({...prev,college : event.target.value}))
            )}/>
            <div className={styles.row}>
                <InputControl label="Start Date" value={values.startdate} 
                type="date" placeholder="Enter start date"
                onChange={(event)=>(
                    setvalues((prev)=> ({...prev,startdate : event.target.value}))
                )}/>
                <InputControl label="End Date" value={values.enddate} 
                type="date" placeholder="Enter end date"
                onChange={(event)=>(
                    setvalues((prev)=> ({...prev,enddate : event.target.value}))
                )}/>
            </div>
        </div>
    )
    const basicinfobody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl label="Name" value={values.name} 
                placeholder="Enter your name"
                onChange={(event)=>(
                    setvalues((prev)=> ({...prev,name : event.target.value}))
                )}/>
                <InputControl label="Title" value={values.title} 
                placeholder="Enter title e.g Web Developer"
                onChange={(event)=>(
                    setvalues((prev)=> ({...prev,title : event.target.value}))
                )}/>
            </div>
            <div className={styles.row}>
                <InputControl label="GitHub Link" value={values.github} 
                placeholder="Enter your GitHub Link"
                onChange={(event)=>(
                    setvalues((prev)=> ({...prev,github : event.target.value}))
                )}/>
                <InputControl label="Linkedin Link" value={values.linkedin} 
                placeholder="Enter your Linkedin Link"
                onChange={(event)=>(
                    setvalues((prev)=> ({...prev,linkedin : event.target.value}))
                )}/>
            </div>
            <div className={styles.row}>
                <InputControl label="Phone No." value={values.phone} 
                placeholder="Enter your phone no."
                onChange={(event)=>(
                    setvalues((prev)=> ({...prev,phone : event.target.value}))
                )}/>
                <InputControl label="E-Mail" value={values.email} 
                placeholder="Enter your tilte E-Mail"
                onChange={(event)=>(
                    setvalues((prev)=> ({...prev,email : event.target.value}))
                )}/>
            </div>
        </div>
    )
    const achievementsbody=(
        <div className={styles.detail}>
            <div className={styles.column}>
                <label>List Your Achievements</label>
                <InputControl value={activeInformation?.points? activeInformation?.points[0]: ""} placeholder="Line 1"
                onChange={(event)=>(
                    handlepointupdate(event.target.value,0)
                )}/>
                <InputControl value={activeInformation?.points? activeInformation?.points[1]: ""} placeholder="Line 2"
                onChange={(event)=>(
                    handlepointupdate(event.target.value,1)
                )}/>
                <InputControl value={activeInformation?.points? activeInformation?.points[2]: ""} placeholder="Line 3"
                onChange={(event)=>(
                    handlepointupdate(event.target.value,2)
                )}/>
                <InputControl value={activeInformation?.points? activeInformation?.points[3]: ""} placeholder="Line 4"
                onChange={(event)=>(
                    handlepointupdate(event.target.value,3)
                )}/>
            </div>
        </div>
    )

    const summarybody=(
        <div className={styles.detail}>
            <InputControl label="Summary" value={values.summary} 
            placeholder="Enter your Objective/Summary"
            onChange={(event)=>(
                setvalues((prev)=> ({...prev,summary : event.target.value}))
            )}/>
        </div>
    )

    const otherbody=(
        <div className={styles.detail}>
            <div className={styles.column}>
                <label>List Your Skills</label>
                <InputControl value={values?.list? values.list[0]: ""} placeholder="Skill 1"
                onChange={(event)=>(
                    handlelistupdate(event.target.value,0)
                )}/>
                <InputControl value={values?.list? values.list[1]: ""} placeholder="Skill 2"
                onChange={(event)=>(
                    handlelistupdate(event.target.value,1)
                )}/>
                <InputControl value={values?.list? values.list[2]: ""} placeholder="Skill 3"
                onChange={(event)=>(
                    handlelistupdate(event.target.value,2)
                )}/>
                <InputControl value={values?.list? values.list[3]: ""} placeholder="Skill 4"
                onChange={(event)=>(
                    handlelistupdate(event.target.value,3)
                )}/>
            </div>
        </div>
    )

    const generateBody=()=>{
        switch (sections[activesection]){
            case sections.basicinfo:
                return basicinfobody  
            case sections.workexp:
                return workexpbody
            case sections.project:
                return projectbody
            case sections.education:
                return educationbody
            case sections.achievements:
                return achievementsbody
            case sections.summary:
                return summarybody
            case sections.other:
                return otherbody
        }
    }

    useEffect(() => {
        const activeinfo = information[sections[activesection]];
        setactiveInformation(activeinfo);
        setactivechipindex(0)
        setsectiontitle(activeinfo.sectionTitle)
        setvalues({
            name : activeinfo?.detail? activeinfo?.detail?.name || "": "",
            title : activeinfo?.details? activeinfo?.details[0]?.title || "": activeinfo?.detail?.title,
            github : activeinfo?.details? activeinfo?.details[0]?.github || "": activeinfo?.detail?.github,
            linkedin : activeinfo?.detail? activeinfo?.detail.linkedin || "": "",
            phone : activeinfo?.detail? activeinfo?.detail?.phone || "": "",
            email : activeinfo?.detail? activeinfo?.detail?.email || "": "",
            companyname : activeinfo?.details? activeinfo?.details[0]?.companyname || "": "",
            certification : activeinfo?.details? activeinfo?.details[0]?.certification || "": "",
            location : activeinfo?.details? activeinfo?.details[0]?.location || "": "",
            startdate : activeinfo?.details? activeinfo?.details[0]?.startdate || "": "",
            enddate : activeinfo?.details? activeinfo?.details[0]?.enddate || "": "",
            deployedlink : activeinfo?.details? activeinfo?.details[0]?.deployedlink || "": "",
            overview : activeinfo?.details? activeinfo?.details[0]?.overview || "": "",
            startdate : activeinfo?.details? activeinfo?.details[0]?.startdate || "": "",
            college : activeinfo?.details? activeinfo?.details[0]?.college || "": "",
            points : activeinfo?.details? activeinfo?.details[0]?.points? [...activeinfo?.details[0]?.points] || "":
            activeinfo?.points? [...activeinfo?.points]: "": "",
            list: activeinfo?.list? [...activeinfo?.list] || "": "",
            summary : typeof activeinfo?.detail!= Object? activeinfo?.detail || "":""
            // other : typeof activeinfo?.detail!= Object? activeinfo?.detail || "":""
        })
    }, [activesection]);

    useEffect(() => {

        const activeinfo = information[sections[activesection]];
        setvalues({
            name : activeinfo?.detail? activeinfo?.detail?.name || "": "",
            title : activeinfo?.details? activeinfo?.details[activechipindex]?.title || "": activeinfo?.detail?.title,
            github : activeinfo?.details? activeinfo?.details[activechipindex]?.github || "":
             activeinfo?.detail?.github,
            linkedin : activeinfo?.detail? activeinfo?.detail.linkedin || "": "",
            phone : activeinfo?.detail? activeinfo?.detail?.phone || "": "",
            email : activeinfo?.detail? activeinfo?.detail?.email || "": "",
            companyname : activeinfo?.details? activeinfo?.details[activechipindex]?.companyname || "": "",
            certification : activeinfo?.details? activeinfo?.details[activechipindex]?.certification || "": "",
            location : activeinfo?.details? activeinfo?.details[activechipindex]?.location || "": "",
            startdate : activeinfo?.details? activeinfo?.details[activechipindex]?.startdate || "": "",
            enddate : activeinfo?.details? activeinfo?.details[activechipindex]?.enddate || "": "",
            deployedlink : activeinfo?.details? activeinfo?.details[activechipindex]?.deployedlink || "": "",
            overview : activeinfo?.details? activeinfo?.details[activechipindex]?.overview || "": "",
            startdate : activeinfo?.details? activeinfo?.details[activechipindex]?.startdate || "": "",
            college : activeinfo?.details? activeinfo?.details[activechipindex]?.college || "": "",
            points : activeinfo?.details? activeinfo?.details[activechipindex]?.points?
             [...activeinfo?.details[activechipindex]?.points] || "": "": "",
            summary : typeof activeinfo?.detail!= Object? activeinfo?.detail || "":""
            // other : typeof activeinfo?.detail!= Object? activeinfo?.detail || "":""
        })
    }, [activechipindex]);

    useEffect(() => {
        setactiveInformation(information[sections[activesection]])
    }, [information]);

    const handleaddnew=()=>{
        const details=activeInformation?.details;
        const lastdetail=details.slice(-1)[0];
        if(!Object.keys(lastdetail).length) return;
        details.push({});

        props.setinformation((prev)=>({...prev,
            [sections[activesection]]: {...information[sections[activesection]],details: details}
        }))
        setactivechipindex(details?.length-1)
    };

    const handledelete=(index)=>{
        const details = activeInformation?.details?[...activeInformation?.details]:"";
        if(!details)return;
        details.splice(index,1);
        props.setinformation((prev)=>({...prev,
            [sections[activesection]]: {...information[sections[activesection]],details: details}}));
        setactivechipindex(prev=>prev=== index? prev==0? 1:0 : prev-1);
    }

    const handleSubmission=()=>{
        switch (sections[activesection]){
            case sections.basicinfo:{
                const tempdetails={
                    name: values?.name,
                    title: values?.title,
                    github: values?.github,
                    linkedin: values?.linkedin,
                    phone: values?.phone,
                    email: values?.email
                }
                props.setinformation((prev)=>({
                    ...prev,[sections.basicinfo]: {
                        ...prev[sections.basicinfo],
                        detail: tempdetails,
                        sectionTitle: sectiontitle
                    }
                }))
                break;
            }
            case sections.workexp:{
                const tempdetail={
                    title: values?.title,
                    companyname: values?.companyname,
                    certification: values?.certification,
                    location: values?.location,
                    startdate: values?.startdate,
                    enddate: values?.enddate,
                    points: values?.points,
                }
                const tempdetails=[...information[sections.workexp]?.details];
                tempdetails[activechipindex]=tempdetail;
                props.setinformation((prev)=>({
                    ...prev,[sections.workexp]:{
                    details: tempdetails,
                    sectionTitle: sectiontitle
                    }
                }))
                break;
            }
            case sections.project:{
                const tempdetail={
                    title: values?.title,
                    overview: values?.overview,
                    certification: values?.certification,
                    github: values?.github,
                    deployedlink: values?.deployedlink,
                    points: values?.points,
                }
                const tempdetails=[...information[sections.project]?.details];
                tempdetails[activechipindex]=tempdetail;
                props.setinformation((prev)=>({
                    ...prev,[sections.project]:{
                    details: tempdetails,
                    sectionTitle: sectiontitle
                    }
                }))
                break;
            }
            case sections.education:{
                const tempdetail={
                    title: values?.title,
                    college: values?.college,
                    startdate: values?.startdate,
                    enddate: values?.enddate,
                }
                const tempdetails=[...information[sections.education]?.details];
                tempdetails[activechipindex]=tempdetail;
                props.setinformation((prev)=>({
                    ...prev,[sections.education]:{
                    details: tempdetails,
                    sectionTitle: sectiontitle
                    }
                }))
                break;
            }
            case sections.achievements:{
                const tempdetail=values?.points;
                props.setinformation((prev)=>({
                    ...prev,[sections.achievements]:{
                    points: tempdetail,
                    sectionTitle: sectiontitle
                    }
                }))
                break;
            }
            case sections.summary:{
                const tempdetail= values?.summary  
                props.setinformation((prev)=>({
                    ...prev,[sections.summary]:{
                    detail: tempdetail,
                    sectionTitle: sectiontitle
                    }
                }))
                break;
            }
            case sections.other:{
                const tempdetail= values?.list;
                props.setinformation((prev)=>({
                    ...prev,[sections.other]:{
                    list: tempdetail,
                    sectionTitle: sectiontitle
                    }
                }))
                break;
            }
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            {Object.keys(sections).map((key)=>(
                <div className={`${styles.section} ${activesection=== key ? styles.active : ""}`} key={key}
                 onClick={()=> setactivesection(key)}>
                    {sections[key]}
                </div>
            ))}
        </div>
        <div className={styles.body}>
            <InputControl label="Section Title (**Clear and save to remove the section from resume)" value={sectiontitle} placeholder="Enter title" 
            onChange={(event)=> setsectiontitle(event.target.value)} />
            <div className={styles.chips}>
                {
                    activeInformation?.details? 
                    activeInformation?.details?.map((item,index)=>(
                        <div className={`${styles.chip} ${activechipindex===index? styles.active:""}`}
                         key={item.sectionTitle+index}
                         onClick={()=>setactivechipindex(index)}>
                            <p>{sections[activesection]} {index+1}</p>
                            < X onClick={(event)=>{
                                event.stopPropagation();
                                handledelete(index)}}/>
                        </div>
                        )): ""
                }
                {
                    activeInformation?.details && activeInformation?.details?.length>0?
                    <div className={styles.add} onClick={handleaddnew}>+Add</div>
                    :""
                }
                
            </div>
            {generateBody()}
            <button onClick={handleSubmission}>Save</button>
        </div>
    </div>
  )
}

export default Editor;
import React,{useState, useEffect, useRef} from 'react';
import styles from "./Body.module.css";
import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";
import ReactToPrint from 'react-to-print';

function Body() {
    const colors=["#E3720E", "#069E08", "#0E13B2", "#B0099C", "#A40806"];

    const sections= {
        basicinfo: "Basic Info",
        workexp: "Working Experience",
        project: "Projects",
        education: "Education",
        achievements: "Achievements",
        summary: "Summary",
        other: "Skills"
    };
    const resumeref=useRef();
    
    const [activecolor,setactivecolor]= useState(colors[0]);
    
    const [resumeinformation,setresumeinformation]=useState({
        [sections.basicinfo]: {
            id:sections.basicinfo,
            sectionTitle: sections.basicinfo,
            detail: {}
        },
        [sections.workexp]: {
            id:sections.workexp,
            sectionTitle: sections.workexp,
            details: []
        },
        [sections.project]: {
            id:sections.project,
            sectionTitle: sections.project,
            details: []
        },
        [sections.education]:{
            id:sections.education,
            sectionTitle: sections.education,
            details: []
        },
        [sections.achievements]: {
            id:sections.achievements,
            sectionTitle: sections.achievements,
            points: []
        },
        [sections.summary]: {
            id:sections.summary,
            sectionTitle: sections.summary,
            detail: "" 
        },
        [sections.other]: {
            id: sections.other,
            sectionTitle: sections.other,
            list: []
        }
    });

    useEffect(() => {
        console.log(resumeinformation)
    }, [resumeinformation]);

  return (
    <div className={styles.container}>
        <p className={styles.heading}>Resume Buider</p>
        <div className={styles.main}>
            <Editor sections={sections} information={resumeinformation} setinformation={setresumeinformation}/>
        </div>
            <div className={styles.toolbar}>
                <div className={styles.colors}>
                    {colors.map((item)=>(
                        <span key={item}
                        style={{backgroundColor: item}}
                        className={`${styles.color} ${activecolor===item? styles.active: ""}`}
                        onClick={()=>setactivecolor(item)}
                        />
                    ))}
                </div>
                <ReactToPrint
                 trigger={() => {
                    return <button>Download</button>;
                }}
                content={() => resumeref.current}
                />
            </div>
            <p className={styles.comment}>
                ** Long hold or double tap on sections in the resume to move it and change its position **</p>
            <Resume ref={resumeref} information={resumeinformation} sections={sections} color={activecolor}/>
       
    </div>
  )
}
export default Body;
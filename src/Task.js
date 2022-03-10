import { ReactComponent as IconCheck } from "./images/icon-check.svg";
import { ReactComponent as IconCross } from "./images/icon-cross.svg";
import React,{useContext} from 'react';
import { actions } from "./App.js";
import "./main-styles/task.css";
import { ActiveTask,contexFromIndex} from "./Context";
import { useState, useRef, useEffect } from "react";


function Task({ task, dispatch, mode, listTasks }) {
    const arrayTest = useRef(null);
    const { active, setActive } = useContext(ActiveTask);
    const [activeInd, setActiveInd] = useState(false);
    const {fromIndex,setFromIndex}=useContext(contexFromIndex);
    useEffect(() => {
        arrayTest.current = [...listTasks];

    }, [listTasks]);
    function arraymove(arr, fromIndex, toIndex) {
        let element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
    function handleDragStart() {
        setFromIndex(handleFromIndex(arrayTest.current,task.id));

    }
    function findIndex(array,value)
    {
        let count=0;
        console.log("arrray pasado es: ",array[count].id);
        console.log("value pasado es:",value);
        while(array[count].id!==value)
        {
            count++;
            console.log(count);
        }
        return count;
    }
    function handleFromIndex(array,value)
    {
        let count=0;
        while(array[count].id!==value)
        {
            count++;
        }
        return count;
    }
    function handleDragEnter(e) {
        setFromIndex(handleFromIndex(arrayTest.current,task.id));
        
            console.log("me entraron, soy:", task.id);
       let index=findIndex(arrayTest.current,task.id)
       console.log("the enter index is",index);
       /* let fromindex=handleFromIndex(arrayTest.current,task.id); */
            console.log("from indez:",fromIndex);
        arraymove(arrayTest.current,fromIndex,index);
        console.log("asi quedo el array:",arrayTest.current);
        dispatch({type:actions.copy,payLoad:arrayTest.current});
        
     }
   
    return <div className={mode === "dark" ? "taskBoxDark" : "taskBoxLigth"} draggable="true" onDragStart={handleDragStart} onDragEnter={handleDragEnter}>
        <button className={activeInd ? "doneBtnOn" : "doneBtnOff"} onClick={() => { dispatch({ type: actions.toggle, payLoad: { id: task.id } }); setActiveInd(!activeInd); setActive(!active) }}><IconCheck className="done" /></button>
        <p className={task.complete ? "taskComplete" : "taskOnCourse"}>{task.task}</p>
        {console.log(mode)}
        <button className="crossBtn" onClick={() => dispatch({ type: actions.delete, payLoad: { id: task.id } })}><IconCross className="cross" /></button>
    </div>;
}

export default Task;

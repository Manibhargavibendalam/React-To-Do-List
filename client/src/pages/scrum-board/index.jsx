import React, { Fragment, useEffect } from "react";
import { TaskManagerContext } from "../../context";
import { scrumBoardOptions } from "../../config";
import { getAllTaskApi, updateTaskApi } from "../../services";
import { useContext } from "react";
import CommonCard from "../../components/common-card";


function ScrumboardPage() {
  const { user, taskslist, setaskslist } = useContext(TaskManagerContext);

  async function fetchlistofTasks() {
    
    const response = await getAllTaskApi(user?._id);

    if (response?.success) {
      setaskslist(response?.tasksList);
     
    }
  }

  async function updateTaskByStatus(getTask) {
    await updateTaskApi(getTask);
    await fetchlistofTasks();
  }

  function onDragStart(event,getTaskId){
    event.dataTransfer.setData("id",getTaskId);
    // console.log(event);
  }



   //function to handle drag and drop
   function onDrop(event,getCurrentStatus){
    const getDraggedTaskId=event.dataTransfer.getData("id");

    let findcurrenttask=taskslist.find(item=>item._id.toString()===getDraggedTaskId);
    findcurrenttask={
      ...findcurrenttask,
      status:getCurrentStatus
    }
    updateTaskByStatus(findcurrenttask);

   }


  //function to render tasks by status
  // this function will return an object with keys as task status and values as array of task
  // this will be used to render tasks in the scrum board
  function renderTaskByTaskStatus() {
    const taskStatuses = {
      todo: [],
      inProgress: [],
      blocked: [],
      review: [],
      done: [],
    };
    taskslist.forEach((taskItem) => {
      taskStatuses[taskItem.status].push(
        <div
        onDragStart={
          taskItem.status !== "done" ? (event)=> onDragStart(event,taskItem._id) : null
        }
        draggable={taskItem?.status !== "done" ? true : false}
        className="mb-2"
        >
        <CommonCard  extraTextStyles={taskItem?.status ==="done" ? "line-through" : ""} title={taskItem?.title}
            description={scrumBoardOptions.find(boardOption=> boardOption.id===taskItem?.status).label}/>
    
      </div>
      );
    });
    console.log(taskStatuses);
    
    return taskStatuses;
  }


  useEffect(() => {
    if (user !== null) {
      fetchlistofTasks();
    }
  }, [user]);

  return (
    <Fragment>
      <div className="grid grid-cols-5 gap-2 h-full">
        {scrumBoardOptions.map((item) => (
          <div
            className="border border-[#333333] rounded overflow-auto"
            key={item.id}
            onDrop={(event)=>onDrop(event, item.id)}
            onDragOver={(event) => event.preventDefault()}
          >
            <div className="px-1 py-3 text-center bg-black border-none mb-3">
              <h3 className="text-2xl font-extrabold text-white ">
                {item.label}
              </h3>
            </div>
            {/* <div>{renderTodoByStatus()[item.id]}</div> */}
            <div className="p-3">{renderTaskByTaskStatus()[item.id]}</div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default ScrumboardPage;

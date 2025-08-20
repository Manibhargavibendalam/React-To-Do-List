import CommonButton from "../../components/common-button";
import { Fragment, use, useContext, useEffect, useState } from "react";
import AddNewTask from "../../components/tasks/add-new-tasks";
import { TaskManagerContext } from "../../context";
import { getAllTaskApi, addNewTaskApi, deleteTaskApi, updateTaskApi } from "../../services";
import Skeleton from "../../components/ui/skeleton";
import TaskItem from "../../components/tasks/task-item";

function TasksPage() {
  const [showDialog, setShowDialog] = useState(false);
  const { taskslist, setaskslist, loading, setLoading, user, taskFormData, currentEditedId, setcurrentEditedId } =
    useContext(TaskManagerContext);

  async function fetchlistofTasks() {
    setLoading(true);
    const response = await getAllTaskApi(user?._id);

    if (response?.success) {
      setaskslist(response?.tasksList);
      setLoading(false);
    }

    // console.log(response,"taskslist");
  }

  async function handleSubmit(getData) {
    // console.log(getData, user);

    const response = currentEditedId !== null 
    ?  await updateTaskApi({
      ...getData,
      _id: currentEditedId,
      userId: user?._id,
    })
    : await addNewTaskApi({
      ...getData,
      userId: user?._id,
    });
    // console.log(response);

    if (response) {
      fetchlistofTasks();
      setShowDialog(false);
      taskFormData.reset();
      setcurrentEditedId(null);
    }
  }

  async function handleDelete(getTaskId) {
    console.log(getTaskId);
    // Call the API to delete the task

    const response = await deleteTaskApi(getTaskId);
    if (response?.success) {
      fetchlistofTasks();
    }
  }

  useEffect(() => {
    if (user !== null) {
      fetchlistofTasks();
    }
  }, [user]);

  console.log(taskslist);

  if (loading) {
    return (
      <Skeleton className="w-full h-[550px] rounded-[6px] bg-black opacity-50" />
    );
  }

  return (
    <Fragment>
      <div className="mb-5">
        <CommonButton
          onClick={() => setShowDialog(true)}
          buttonText={"Add New Task"}
        />
      </div>
      <div className="mt-5 flex flex-col">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {taskslist?.length > 0 ? (
            taskslist.map((taskItem) => (
              <TaskItem
                setShowDialog={setShowDialog}
                handleDelete={handleDelete}
                item={taskItem}
                setcurrentEditedId={setcurrentEditedId}
                taskFormData={taskFormData}
              />
            ))
          ) : (
            <h1>No tasks added!Please add one</h1>
          )}
        </div>
      </div>

      <AddNewTask
        showDialog={showDialog}
        handleSubmit={handleSubmit}
        setShowDialog={setShowDialog}
        taskFormData={taskFormData}
        currentEditedId={currentEditedId}
        setcurrentEditedId={setcurrentEditedId}
      />
    </Fragment>
  );
}

export default TasksPage;

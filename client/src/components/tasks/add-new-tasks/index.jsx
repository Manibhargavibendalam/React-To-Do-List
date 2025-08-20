import { set } from "react-hook-form";
import { addNewTaskFormControls } from "../../../config";

import CommonDialog from "../../common-dialog";
// import { addNewTaskApi } from "../../../services";
// import { useContext } from "react";
// import { TaskManagerContext } from "../../../context";

function AddNewTask({ showDialog, currentEditedId, setShowDialog, taskFormData, handleSubmit,setcurrentEditedId }) {

  // const { taskFormData, user } = useContext(TaskManagerContext);


 
  return (
    <CommonDialog
      formControls={addNewTaskFormControls}
      showDialog={showDialog}
      onOpenChange={()=>{
        setShowDialog(false);
        currentEditedId? taskFormData.reset():null;
        setcurrentEditedId(null);
      }}
      title={currentEditedId ? "Edit Task" :  "Post New Task"}
      btnText={"Add"}
      handleSubmit={handleSubmit}
      formData={taskFormData}
    />
  );
}

export default AddNewTask;

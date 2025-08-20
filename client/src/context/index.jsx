import { createContext, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { callUserAuthApi } from "../services";

export const TaskManagerContext = createContext(null);

function TaskManagerProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [taskslist, setaskslist] = useState([]);
  const [currentEditedId, setcurrentEditedId] = useState(null);

  const taskFormData = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
    },
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUserCookie = async () => {
      const data = await callUserAuthApi();

      console.log(data, "verifyUserCookie data");

      if (data?.userInfo) {
        setUser(data.userInfo);
      }

      return data?.success
        ? navigate(
            location.pathname === "/auth" || location.pathname === "/"
              ? "/tasks/list"
              : `${location.pathname}`
          )
        : navigate("/auth");
    };
    verifyUserCookie();
  }, [navigate, location.pathname]);

  return (
    <TaskManagerContext.Provider
      value={{
        taskslist,
        setaskslist,
        loading,
        setLoading,
        user,
        setUser,
        taskFormData,
        currentEditedId,
        setcurrentEditedId,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
}

export default TaskManagerProvider;

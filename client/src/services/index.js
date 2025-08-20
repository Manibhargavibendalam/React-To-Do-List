import axios from "axios";

export const callRegisterUserApi = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/user/register",
    formData,
    {
      withCredentials: true,
    }
  );

  return response?.data;
};

export const callLoginUserApi = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/user/login",
    formData,
    {
      withCredentials: true,
    }
  );

  return response?.data;
};

export const callUserAuthApi = async () => {
  const response = await axios.post(
    "http://localhost:5000/api/user/auth",
    {},
    { withCredentials: true }
  );
  return response?.data;
};

export const callLogoutApi = async (req, res) => {
  const response = await axios.post(
    "http://localhost:5000/api/user/logout",
    {},
    { withCredentials: true }
  );
  return response?.data;
};


export const addNewTaskApi = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/task/add-new-task",
    formData
  );
  return response?.data;
};


export const getAllTaskApi = async (getcurrentuserId) => {
  const response = await axios.get(
    `http://localhost:5000/api/task/get-all-tasks-by-userid/${getcurrentuserId}`
   
  );
  return response?.data;
};



export const updateTaskApi = async (formData) => {
  console.log(formData, "updateTaskApi");
  const response = await axios.put(
    "http://localhost:5000/api/task/update-task",
    formData
  );
  return response?.data;

};



export const deleteTaskApi = async (getcurrentTaskId) => {
  const response = await axios.delete(
    `http://localhost:5000/api/task/delete-task/${getcurrentTaskId}`
  );
  return response?.data;



   
};

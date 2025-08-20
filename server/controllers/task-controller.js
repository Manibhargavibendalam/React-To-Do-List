//add a new task
//get all task by userid
//delete task
//edit a task

const Task = require("../models/task");

const addNewTask = async (req, res) => {
  const { title, description, status, userId, priority } = await req.body;

  //validate the schema

  try {
    const newlycreatedtask = await Task.create({
      title,
      description,
      status,
      userId,
      priority,
    });
    if (newlycreatedtask) {
      return res.status(200).json({
        success: true,
        message: "Task added successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "some error occurred!please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "some error occurred!please try again",
    });
  }
};

const getAllTasks = async (req, res) => {
  const { id } = req.params;

  const extractAllTasksByUserId = await Task.find({ userId: id });

  try {
    if (extractAllTasksByUserId) {
      return res.status(200).json({
        success: true,
        tasksList: extractAllTasksByUserId,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "some error occurred!please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "some error occurred!please try again",
    });
  }
};

const updateTask = async (req, res) => {
  const formData = req.body;
  try {
    const updateTask = await Task.findByIdAndUpdate(
      { _id: formData._id },
      {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        userId: formData.userId,
      },
      { new: true }
    );
    if(updateTask) {
      return res.status(200).json({
        success: true,
        message: "Task updated successfully",
      });
    }
    else{
        return res.status(400).json({
            success: false,
            message: "some error occurred!please try again",
        });
    }
  }
  
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "some error occurred!please try again",
    });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (deletedTask) {
      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "some error occurred!please try again",
    });
  }
};

module.exports = { addNewTask, getAllTasks, deleteTask, updateTask };

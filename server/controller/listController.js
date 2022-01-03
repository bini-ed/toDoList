const { List, validateList } = require("../models/listModel");

const addList = async (req, res) => {
  const { listName, user_id, isCompleted } = req.body;
  const { error } = validateList(req.body);
  if (error) return res.status(400).send(error.message);

  const checkIfListExist = await List.findAll({ where: { listName } }); //check if the to-do list is already added

  if (checkIfListExist[0]) {
    return res.status(400).send("You have already added this task to the list"); //if so show error message
  } else {
    const lists = await List.create({ listName, user_id, isCompleted }); //if the to-do list is not already registered then save the to-do list to db
    if (!lists) return res.status(400).send("To-do list creation failed");
    //show error message if to-do list creation fails
    else {
      res.send("To-do list created"); //send success message to notify that the to-do list is created
    }
  }
};
const getList = async (req, res) => {
  const { user_id } = req.params;
  const getLists = await List.findAll({
    where: { isCompleted: false, user_id },
  }); //fetch all to-do list which are not completed
  if (!getLists[0]) {
    //check if the list is empty
    return res
      .status(400)
      .json({ noProduct: "You don't have new task in your list" }); //return an error message and terminate
  } else {
    res.send(getLists); //returns array of to-do list that are not completed
  }
};
const getCompletedList = async (req, res) => {
  const { user_id } = req.params;
  const getLists = await List.findAll({
    where: { isCompleted: true, user_id },
  }); //fetch all to-do list which are completed
  if (!getLists[0]) {
    //check if the list is empty
    return res
      .status(400)
      .json({ noProduct: "You don't have completed task in the list" }); //return an error message and terminate
  } else {
    res.send(getLists); //returns array of to-do list that are completed
  }
};
const editList = async (req, res) => {
  const { list_id, listName, isCompleted } = req.body; //recieve list_id, listName, isCompleted from user
  const checkIfListExist = await List.findOne({ where: { list_id } }); //check if the to-do list exist or not

  if (!checkIfListExist) {
    return res.status(400).send("You don't have any to-do list"); //if it doesn't exist, show error message
  } else {
    const updateList = {
      listName: listName ? listName : checkIfListExist.listName, //checking if the user send listName if so update listName with the received listName value otherwise keep the listName from db. This will prevent undefined value error if the user only update listName or isCompleted columns

      isCompleted:
        //checking if the user send isCompleted value if so update isCompleted with the recieved isCompleted value otherwise keep the isCompleted from db
        isCompleted == checkIfListExist.isCompleted ? isCompleted : isCompleted,
    };
    const updatedList = await List.update(updateList, { where: { list_id } }); //update the selected to-do list
    if (!updatedList) {
      return res.status(400).send("Update list failed");
    } else {
      res.send("To-do list updated");
    }
  }
};
const deleteList = async (req, res) => {
  const { list_id } = req.params; //receive list_id through query parameter from user

  const checkIfListExist = await List.findOne({ where: { list_id } }); //check if the to-do list exist or not

  if (!checkIfListExist) {
    return res.status(400).send("You don't have any task in the to-do list"); //if it doesn't exist, show error message
  } else {
    const deletLists = await List.destroy({ where: { list_id } }); //if it exist delete that to-do list from the db
    if (!deletLists) {
      return res.status(400).send("Delete list failed");
    } else {
      res.send("Task deleted");
    }
  }
};
module.exports = { addList, getList, editList, deleteList, getCompletedList };

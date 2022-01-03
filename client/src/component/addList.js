import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "./context";
import "../css/list.css";

function List() {
  const context = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [inCompletetasks, setIncompleteTasks] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");
  const [newError, setNewError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [success, setSuccess] = useState("");

  console.log(success);
  useEffect(() => {
    async function getTask() {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/getList/${context.user.user_id}`)
        .then((res) => {
          setError("");
          setTasks(res.data);
        })
        .catch((err) => {
          setError(err.data ? err.data : err.response.data.noProduct);
          setTasks(err.response.data.noProduct ? [] : tasks);
        });
      await axios
        .get(`http://localhost:5000/getCompletedList/${context.user.user_id}`)
        .then((res) => {
          setNewError("");
          setIncompleteTasks(res.data);
        })
        .catch((err) => {
          setNewError(err.data ? err.data : err.response.data.noProduct);
          setIncompleteTasks(
            err.response.data.noProduct ? [] : inCompletetasks
          );
        });
      setLoading(false);
    }
    getTask();
  }, [
    context.user.user_id,
    addLoading,
    updateLoading,
    newError,
    error,
    addError,
    deleteLoading,
    deleteError,
  ]);

  const [list, setList] = useState({
    listName: "",
    user_id: context.user.user_id,
    isCompleted: false,
  });

  const handleComplete = async (list_id, isCompleted) => {
    setUpdateLoading(true);
    const data = { list_id, isCompleted };
    await axios
      .put("http://localhost:5000/editList", data, {
        headers: {
          "user-auth-token": localStorage.getItem("user"),
        },
      })
      .then((res) => setSuccess(res.data))
      .catch((err) => setError(err.data ? err.data : err.response.data));
    setUpdateLoading(false);
  };

  const handleChange = ({ currentTarget: input }) => {
    setList({ ...list, listName: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    await axios
      .post("http://localhost:5000/addList", list, {
        headers: {
          "user-auth-token": localStorage.getItem("user"),
        },
      })
      .then((res) => {
        setAddError("");
        setSuccess(res.data);
      })
      .catch((err) => {
        setAddError(err.data ? err.data : err.response.data);
      });
    setAddLoading(false);
  };
  const handleDelete = async (list_id) => {
    setSuccess("");
    setDeleteError("");
    setDeleteLoading(true);
    await axios
      .delete(`http://localhost:5000/deleteList/${list_id}`, {
        headers: {
          "user-auth-token": localStorage.getItem("user"),
        },
      })
      .then((res) => setSuccess(res.data))
      .catch((err) => setDeleteError(err.data ? err.data : err.response.data));
    setDeleteLoading(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "89.1vh",
      }}
    >
      {addLoading && <h2>Loading....</h2>}
      {addError && (
        <h3 style={{ textAlign: "center", color: "red", fontSize: 25 }}>
          {addError}
        </h3>
      )}
      {deleteError && (
        <h3 style={{ textAlign: "center", color: "red", fontSize: 25 }}>
          {deleteError}
        </h3>
      )}
      <form style={{ width: "50%" }}>
        <label htmlFor="labelName">Task</label>
        <input
          type="text"
          className="form-control"
          value={list.listName}
          name="listName"
          onChange={handleChange}
        ></input>
        <input
          type="submit"
          value="Add Task"
          className="btn btn-primary"
          onClick={handleSubmit}
        ></input>
      </form>
      {loading || updateLoading || deleteLoading ? (
        <h2>Loading ...</h2>
      ) : (
        <div className="new">
          <>
            <div style={{ display: "flex" }}>
              <div className="newTable">
                <h4>New Task</h4>
                {error ? (
                  <h3 style={{ textAlign: "center", fontSize: 25 }}>{error}</h3>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Task</th>
                        <th scope="col"> Mark as completed</th>
                        <th scope="col"> </th>
                      </tr>
                    </thead>

                    <tbody>
                      {tasks?.map((item) => (
                        <tr key={item.list_id}>
                          <td>{item.listName}</td>
                          <td>
                            <input
                              type="submit"
                              value="Complete This Task"
                              className="btn btn-secondary"
                              onClick={() => handleComplete(item.list_id, true)}
                            ></input>
                          </td>
                          <td>
                            <input
                              type="submit"
                              value="Delete this Task"
                              className="btn btn-danger"
                              onClick={() => handleDelete(item.list_id)}
                            ></input>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="completedTable">
                <h4>Completed Task</h4>
                {newError ? (
                  <h3 style={{ textAlign: "center", fontSize: 25 }}>
                    {newError}
                  </h3>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Task</th>
                        <th scope="col">InComplete Task</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {inCompletetasks?.map((item) => (
                        <tr key={item.list_id}>
                          <td>{item.listName}</td>
                          <td>
                            <input
                              type="submit"
                              value="Incomplete This Task"
                              className="btn btn-secondary"
                              onClick={() =>
                                handleComplete(item.list_id, false)
                              }
                            ></input>
                          </td>
                          <td>
                            <input
                              type="submit"
                              value="Delete this Task"
                              className="btn btn-danger"
                              onClick={() => handleDelete(item.list_id)}
                            ></input>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
}

export default List;

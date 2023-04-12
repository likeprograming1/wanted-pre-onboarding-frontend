import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const TodoBox = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div > ul > li {
    display: flex;
    align-items: center;
  }
`;

const Todo = () => {
  const navigate = useNavigate();
  const [TodoS, setTodoS] = useState("");
  const [TodoU, setTodoU] = useState("");
  const [TodoList, setTodoList] = useState([]);
  const [Edit, setEdit] = useState(false);
  const login = localStorage.getItem("access_token");
  const hadleClick = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };
  const hadleTodoCreate = () => {
    axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          todo: TodoS,
        },
        {
          headers: {
            Authorization: `Bearer ${login}`,
            "Content-type": "application/json",
          },
        }
      )
      .then(() =>
        axios
          .get("https://www.pre-onboarding-selection-task.shop/todos", {
            headers: {
              Authorization: `Bearer ${login}`,
            },
          })
          .then((res) => {
            setTodoList(res.data);
          })
      );
  };
  const handleTodoDelete = (id) => {
    axios
      .delete("https://www.pre-onboarding-selection-task.shop/todos/" + id, {
        headers: {
          Authorization: `Bearer ${login}`,
        },
      })
      .then(() => {
        axios
          .get("https://www.pre-onboarding-selection-task.shop/todos", {
            headers: {
              Authorization: `Bearer ${login}`,
            },
          })
          .then((res) => {
            setTodoList(res.data);
          });
      });
  };
  const handleTodoUpdate = (id, check, Todo) => {
    axios
      .put(
        "https://www.pre-onboarding-selection-task.shop/todos/" + id,
        {
          todo: Todo,
          isCompleted: !check,
        },
        {
          headers: {
            Authorization: `Bearer ${login}`,
            "Content-type": "application/json",
          },
        }
      )
      .then(() =>
        axios
          .get("https://www.pre-onboarding-selection-task.shop/todos", {
            headers: {
              Authorization: `Bearer ${login}`,
            },
          })
          .then((res) => {
            setTodoList(res.data);
          })
      );
  };
  const onClickhandle = (id) => {
    TodoList[id].bool = !TodoList[id].bool;
    setTodoList(TodoList);
    setEdit(!Edit);
  };
  const handleTodoUp = (id, check, Todo) => {
    axios
      .put(
        "https://www.pre-onboarding-selection-task.shop/todos/" + id,
        {
          todo: Todo,
          isCompleted: check,
        },
        {
          headers: {
            Authorization: `Bearer ${login}`,
            "Content-type": "application/json",
          },
        }
      )
      .then(() => {
        axios
          .get("https://www.pre-onboarding-selection-task.shop/todos", {
            headers: {
              Authorization: `Bearer ${login}`,
            },
          })
          .then((res) => {
            setTodoList(res.data);
            setEdit(!Edit);
          });
      });
  };
  useEffect(() => {
    axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          Authorization: `Bearer ${login}`,
        },
      })
      .then((res) => {
        setTodoList(
          res.data.map((data) => {
            return { ...data, bool: false };
          })
        );
      });
  }, []);
  return (
    <TodoBox>
      <button
        onClick={() => {
          hadleClick();
        }}
      >
        로그아웃
      </button>
      <p>오늘의 할일을 추가해주세요.</p>
      <div>
        <input
          data-testid="new-todo-input"
          value={TodoS}
          onChange={(e) => {
            setTodoS(e.target.value);
          }}
        />
        <button
          data-testid="new-todo-add-button"
          onClick={() => {
            hadleTodoCreate();
          }}
        >
          추가
        </button>
      </div>
      <div>
        {TodoList
          ? TodoList.map((data, idx) => {
              return (
                <ul>
                  <li>
                    <input
                      type={"checkbox"}
                      checked={data.isCompleted}
                      onClick={() => {
                        handleTodoUpdate(data.id, data.isCompleted, data.todo);
                      }}
                    ></input>
                    {data.bool ? (
                      <>
                        <input
                          data-testid="modify-input"
                          defaultValue={data.todo}
                          onChange={(e) => {
                            setTodoU(e.target.value);
                          }}
                        ></input>
                        <button
                          data-testid="submit-button"
                          onClick={() => {
                            handleTodoUp(data.id, data.isCompleted, TodoU);
                          }}
                        >
                          제출
                        </button>
                        <button
                          data-testid="cancel-button"
                          onClick={() => onClickhandle(idx)}
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        {" "}
                        <p>{data.todo}</p>
                        <button
                          data-testid="modify-button"
                          onClick={() => onClickhandle(idx)}
                        >
                          수정
                        </button>
                        <button
                          data-testid="delete-button"
                          onClick={() => {
                            handleTodoDelete(data.id);
                          }}
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </li>
                </ul>
              );
            })
          : null}
      </div>
    </TodoBox>
  );
};

export default Todo;

import { useState } from "react"
import CreateForm from "./CreateForm"
import Todo from "./Todo"

function TodoWrapper() {

    //因為有N個todo，所以使用陣列存取
    // const [todos, setTodos] = useState(['list1', 'list2']);
    //因為陣列需要key屬性，所以要加上id
    // const [todos, setTodos] = useState([
    //     { content: 'list1', id: 1 },
    //     { content: 'list2', id: 2 },
    // ]);
    //^因為要判定todo是否被點擊，所以要增加一個標記屬性=>isCompleted
    //新增陣列屬性 isEdit =>判別是否編輯中
    const [todos, setTodos] = useState([
        { content: 'list1', id: Math.random(), isCompleted: false, isEdit: false },
        { content: 'list2', id: Math.random(), isCompleted: false, isEdit: false },
    ]);

    // console.log(todos);
    //建立加入新的todo內容
    //1.使用...其餘運算子來保留原陣列內容
    //2.再加入新的物件內容
    const addTodo = (content) => {
        setTodos([...todos, {
            content: content, id: Math.random(),
            isCompleted: false,
            isEdit: false
        }])
    }

    //建立刪除todo函式，傳給Todo元件使用
    //使用filter方法，去除被刪除的todo
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => {
            //檢查目前的id是否為被刪除的id
            //如果不是，則保留
            return todo.id !== id
        }))
    }

    //建立雙向(toggle)切換「完成與取消」的函式
    const toggleCompleted = (id) => {
        setTodos(todos.map((todo) => {
            //檢查被點擊的id是否跟目前陣列中的id一樣
            //Yes=>1.取出todo 2.將isCompleted屬性值反向處理(true->flase / flase->true)
            //No =>todo不變
            return todo.id === id
                ? { ...todo, isCompleted: !todo.isCompleted }
                : todo
        }))
    }

    //建立是否修改的函式(雙向)
    const toggleIsEdit = (id) => {
        setTodos(todos.map((todo) => {
            //逐筆檢查目前的todo.id是否等於被修改的id
            //Yes=>1.取出todo資料 2.將isEdit屬性值反向處理(true->flase / flase->true)
            //No =>todo不變
            return todo.id === id
                ? { ...todo, isEdit: !todo.isEdit }
                : todo
            //if-else寫法
            // if (todo.id === id) {
            //     return { ...todo, isEdit: !todo.isEdit }
            // }
            // else {
            //     return todo
            // }
        }))
    }

    //建立完成修改的程式(按下完成的動作)
    //1.異動content為新內容
    //2.isEdit改回false
    const editTodo=(id,newContent)=>{
        setTodos(todos.map((todo)=>{
            return todo.id===id
            ?{...todo,content:newContent,isEdit:false}
            :todo
        }))
    }

    return (
        <div className="wrapper">
            <h1>待辦事項</h1>
            <CreateForm addTodo={addTodo} />
            {
                todos.map((todo) => {
                    return <Todo todo={todo} key={todo.id}
                        deleteTodo={deleteTodo}
                        toggleCompleted={toggleCompleted}
                        toggleIsEdit={toggleIsEdit}
                        editTodo={editTodo}
                    />
                })
            }
        </div>
    )
}

export default TodoWrapper
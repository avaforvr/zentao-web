import React from 'react';
import {connect, Dispatch} from 'dva';
import {Table, Button} from 'antd';
import {TodoListType, TodoItemType} from "@/models/todos";
import TodoAdd from "./components/TodoAdd";
import StatusConf from './StatusConf';

// 定义 props 和 state 结构
interface todoListProps {
    todos: TodoListType,
    dispatch: Dispatch
}

interface todosState {
    todos: TodoListType
}

// TodoList 函数组件
const TodoList = ({todos, dispatch}: todoListProps) => {
    // 触发 model 中的 reducer
    function handleRemove(id: number) {
        dispatch({
            type: 'todos/remove',
            payload: id,
        });
    }

    const columns = [
        {title: '标题', dataIndex: 'title'},
        {
            title: '状态',
            render: (todo: TodoItemType) => StatusConf[todo.status]
        },
        {
            title: '操作',
            render: (todo: TodoItemType) => (
                <div>
                    <Button>编辑</Button>
                    <Button
                        onClick={() => handleRemove(todo.id)}
                        style={{marginLeft: '10px'}}
                    >
                        删除
                    </Button>
                </div>
            ),
        }
    ];

    return (
        <div>
            <h1>待完成事项</h1>
            <Table
                dataSource={todos}
                columns={columns}
                rowKey="id"
                pagination={false}
                style={{marginBottom: '32px'}}
            />
            <TodoAdd/>
        </div>
    )
};

// 将命名空间为 todos 的 state 对象作为 props 传入 TodoList 组件
export default connect(({todos}: todosState) => ({
    todos,
}))(TodoList);

import React, {useState} from 'react';
import {connect, Dispatch} from 'dva';
import {Button, Table, Modal} from "antd";
import {TodoListType, TodoItemType} from "@/models/todos";
import TodoForm from "./components/TodoForm";

// 定义 props 和 state 结构
interface TodosProps {
    todos: TodoListType,
    loading: boolean
    dispatch: Dispatch,
}

interface TodosState {
    todos: TodoListType;
    loading: {
        models: {
            todos: boolean
        }
    }
}

const newTodo: TodoItemType = {
    id: 0,
    title: '',
    status: '未开始'
};

const Todos = ({todos, dispatch, loading}: TodosProps) => {
    const [formVisible, setFormVisible] = useState(false);
    const [formValues, setFormValues] = useState(newTodo);

    // 点击新建或编辑按钮
    function showForm(todo: TodoItemType) {
        setFormValues(todo);
        setFormVisible(true);
    }

    // 编辑表单时更新 props
    function handleFormChange(changedValues: TodoItemType) {
        setFormValues({...formValues, ...changedValues});
    }

    // 提交表单
    function handleSubmit() {
        setFormVisible(false);
        dispatch({
            type: `todos/${formValues.id === 0 ? 'add' : 'edit'}`,
            payload: formValues
        });
    }

    // 移除一行
    function hancleRemove(id: number) {
        dispatch({
            type: 'todos/remove',
            payload: id
        });
    }

    const columns = [
        {title: '标题', dataIndex: 'title'},
        {title: '状态', dataIndex: 'status'},
        {
            title: '操作',
            dataIndex: 'id',
            render: (id: number, todo: TodoItemType) => (
                <div>
                    <Button onClick={() => showForm(todo)}>编辑</Button>
                    <Button
                        onClick={() => hancleRemove(id)}
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
                loading={loading}
                style={{marginBottom: '32px'}}
            />
            <Button type="primary" onClick={() => showForm(newTodo)}>新增</Button>
            <Modal
                visible={formVisible}
                onOk={handleSubmit}
                onCancel={() => setFormVisible(false)}
                closable={false}
            >
                <TodoForm formValues={formValues} onSubmit={handleSubmit} onChange={handleFormChange}/>
            </Modal>
        </div>
    )
};

// 将命名空间为 todos 的 state 对象作为 props 传入 Todos 组件
export default connect(({todos, loading}: TodosState) => {
    return ({
        todos,
        loading: loading.models.todos
    })
})(Todos);

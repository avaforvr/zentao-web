import React from 'react';
import {connect, Dispatch} from 'dva';
import {Button, Table} from "antd";
import {TodoListType, TodoItemType} from "@/models/todos";

// 定义 props 和 state 结构
interface TodosProps {
    todos: TodoListType,
    dispatch: Dispatch
}

interface todosState {
    todos: TodoListType
            }

            const Todos = ({todos}: TodosProps) => {
                const columns = [
            {title: '标题', dataIndex: 'title'},
            {title: '状态', dataIndex: 'status'},
            {
                title: '操作',
                render: () => (
                <div>
                <Button>编辑</Button>
                <Button style={{marginLeft: '10px'}}>删除</Button>
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
            <Button type="primary">新增</Button>
        </div>
    )
};

// 将命名空间为 todos 的 state 对象作为 props 传入 Todos 组件
export default connect(({todos}: todosState) => ({
    todos
}))(Todos);

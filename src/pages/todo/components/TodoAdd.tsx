import React from 'react';
import {Form, Input, Button, Select} from 'antd';
import {FormComponentProps} from 'antd/es/form';
import StatusConf from '../StatusConf';
import {connect, Dispatch} from "dva";
import {TodoListType} from "@/models/todos";

const {Option} = Select;

// 定义 props 和 state 结构
interface TodoAddProps {
    dispatch: Dispatch
    form: FormComponentProps['form'];
}

interface TodoAddState {
    todos: TodoListType
}

// TodoList 函数组件
const TodoAdd = (props: TodoAddProps) => {
    const {form, dispatch} = props;
    const {getFieldDecorator} = form;

    function handleSubmit(e: any) {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                // 表单校验通过，values 是一个 json 对象
                dispatch({
                    type: 'todos/add',
                    payload: values
                })
            }
        });
    }

    // @ts-ignore
    return (
        <Form layout="inline" onSubmit={handleSubmit}>
            <Form.Item>
                {getFieldDecorator('title', {
                    rules: [{required: true, message: '请输入标题'}],
                })(
                    <Input placeholder="标题" style={{width: "500px"}}/>,
                )}
            </Form.Item>

            <Form.Item>
                {getFieldDecorator('status', {
                    initialValue: 'todo',
                })(
                    <Select style={{width: "100px"}}>
                        {Object.keys(StatusConf).map(key => (
                            <Option value={key} key={key}>{StatusConf[key]}</Option>
                        ))}
                    </Select>
                )}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    新增
                </Button>
            </Form.Item>
        </Form>
    )
};

// 将命名空间为 todos 的 state 对象作为 props 传入 TodoAdd 组件
export default connect(({todos}: TodoAddState) => ({
    todos,
}))(Form.create<TodoAddProps>()(TodoAdd));

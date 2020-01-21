import React from 'react';
import {Form, Input, Select} from 'antd';
import {FormComponentProps} from 'antd/es/form';
import {TodoItemType} from "@/models/todos";

const {Option} = Select;

// 组件接收到的 props
interface TodoFormProps {
    form: FormComponentProps['form'];
    formValues: TodoItemType;
    onSubmit: () => void;
    onChange: (changedValues: TodoItemType) => void;
}

// TodoList 函数组件
const TodoForm = (props: TodoFormProps) => {
    const {form} = props;
    const {getFieldDecorator} = form;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        form.validateFields(err => {
            if (!err) {
                props.onSubmit();
            }
        });
    }

    return (
        <Form onSubmit={e => handleSubmit(e)}>
            <Form.Item>
                {getFieldDecorator('title', {
                    rules: [{required: true, message: '请输入标题'}],
                })(
                    <Input placeholder="标题"/>,
                )}
            </Form.Item>

            <Form.Item style={{marginBottom: 0}}>
                {getFieldDecorator('status', {
                    initialValue: '未开始'
                })(
                    <Select>
                        {['未开始', '进行中', '已完成'].map(item => (
                            <Option value={item} key={item}>{item}</Option>
                        ))}
                    </Select>
                )}
            </Form.Item>
        </Form>
    )
};

// 经过 Form.create 包装的组件将会自带 props.form 属性
export default Form.create<TodoFormProps>({
    // 设置表单域内字段 id 的前缀
    name: 'todoForm',
    // 把 props 映射到表单项上
    mapPropsToFields(props) {
        const {formValues} = props;
        const fields = {};
        Object.keys(formValues).forEach(field => {
            fields[field] = Form.createFormField({
                value: formValues[field]
            });
        });
        return fields;
    },
    // 任一表单域的值发生改变时的回调
    onValuesChange(props, changedValues) {
        props.onChange(changedValues);
    },
})(TodoForm);

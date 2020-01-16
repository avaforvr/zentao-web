import React from 'react';

const TodoDetail = () => (
    <div>
        <h1 style={{float: "left"}}>处理新邮件</h1>
        <button style={{float: "left", marginLeft: "20px"}} type="button">编辑</button>
        <div style={{clear:"both"}}/>
        <select name="" id="" style={{width: "200px"}}>
            <option value="todo">未开始</option>
            <option value="doing">进行中</option>
            <option value="done">已完成</option>
        </select>
    </div>
);

export default TodoDetail;

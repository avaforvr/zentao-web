import {Request, Response} from 'express';

let todos = [
    {id: 1, title: '处理新邮件', status: '已完成'},
    {id: 2, title: '文档编写', status: '进行中'},
    {id: 3, title: '日报邮件', status: '未开始'},
];

// todo.id 自增，添加新项时获取新的 id
function getNewId(): number {
    let maxId: number = 0;
    todos.forEach(todo => {
        maxId = Math.max(maxId, todo.id);
    });
    return maxId + 1;
}


export default {
    'GET /api/todos/fetch': (req: Request, res: Response) => {
        setTimeout(() => {
            res.send({
                status: 'ok',
                data: todos
            });
        }, 1000);
    },

    'POST /api/todos/add': (req: Request, res: Response) => {
        const todo = req.body;
        setTimeout(() => {
            todo.id = getNewId();
            todos.push(todo);
            res.send({
                status: 'ok',
                data: todos
            });
        }, 2000);
    },

    'POST /api/todos/edit': (req: Request, res: Response) => {
        const todo = req.body;
        todos = todos.map(item =>
            item.id === todo.id ? {...item, ...todo} : item
        );

        setTimeout(() => {
            res.send({
                status: 'ok',
                data: todos
            });
        }, 2000);
    },

    'POST /api/todos/remove': (req: Request, res: Response) => {
        const {id} = req.body;
        todos = todos.filter(todo => todo.id !== parseInt(id, 10));
        setTimeout(() => {
            res.send({
                status: 'ok',
                data: todos
            });
        }, 2000);
    },
};

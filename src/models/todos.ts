import {Reducer, AnyAction} from "redux";

export interface TodoItemType {
    id: number,
    title: string,
    status: 'todo' | 'doing' | 'done'
}

export type TodoListType = Array<TodoItemType>;

export interface TodosModelType {
    namespace: string;
    state: TodoListType;
    reducers: {
        add: Reducer<Array<TodoItemType>>;
        remove: Reducer<TodoListType>;
        update: Reducer<TodoListType>;
    };
}

// todo.id 自增，添加新项时获取新的 id
function getNewId(list: TodoListType): number {
    let maxId: number = 0;
    list.forEach(item => {
        maxId = Math.max(maxId, item.id);
    });
    return maxId + 1;
}

const Model: TodosModelType = {
    // 该 model 的命名空间
    namespace: 'todos',

    // 初始值
    state: [
        {id: 1, title: '处理新邮件', status: 'done'},
        {id: 2, title: '文档编写', status: 'doing'},
        {id: 3, title: '日报邮件', status: 'todo'},
    ],

    reducers: {
        // 添加
        add(state: TodoListType = [], {payload}: AnyAction): TodoListType {
            return [
                ...state,
                {
                    id: getNewId(state),
                    ...payload
                }
            ];
        },
        // 删除
        remove(state: TodoListType = [], {payload: id}: AnyAction): TodoListType {
            return state.filter(todo => todo.id !== id)
        },
        // 更新
        update(state: TodoListType = [], {payload}: AnyAction): TodoListType {
            return state.map(todo =>
                todo.id === payload.id ? {...todo, ...payload} : todo
            );
        },
    }
};

export default Model;

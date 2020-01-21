import {Reducer, AnyAction} from "redux";
import {Effect, Subscription} from "dva";
import {fetchTodos, addTodo, editTodo, removeTodo} from '@/services/todos';

export interface TodoItemType {
    id: number,
    title: string,
    status: '未开始' | '进行中' | '已完成'
}

export type TodoListType = Array<TodoItemType>;

export interface ResponseType {
    status: string,
    data: any
}

export interface TodosModelType {
    namespace: string;
    state: TodoListType;
    effects: {
        fetch: Effect;
        add: Effect;
        edit: Effect;
        remove: Effect;
    };
    reducers: {
        update: Reducer<TodoListType>;
    };
    subscriptions: {
        setup: Subscription;
    };
}

const Model: TodosModelType = {
    // 该 model 的命名空间
    namespace: 'todos',

    // 初始值
    state: [],

    effects: {
        // 获取初始列表
        * fetch(_, {put, call}) {
            const response: ResponseType = yield call(fetchTodos);
            yield put({type: 'update', payload: response.data});
        },
        // 添加
        * add({payload}: AnyAction, {put, call}) {
            const response: ResponseType = yield call(addTodo, payload);
            yield put({type: 'update', payload: response.data});
        },
        // 更新
        * edit({payload}, {put, call}) {
            const response: ResponseType = yield call(editTodo, payload);
            yield put({type: 'update', payload: response.data});
        },
        // 删除
        * remove({payload: id}, {put, call}) {
            const response: ResponseType = yield call(removeTodo, {id});
            yield put({type: 'update', payload: response.data});
        },
    },

    reducers: {
        // 更新 todos 数组
        update(_: any, {payload: todos}: AnyAction): TodoListType {
            return todos;
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(({pathname}) => {
                if (pathname === '/todos') {
                    dispatch({
                        type: 'fetch',
                    });
                }
            });
        },
    },
};

export default Model;

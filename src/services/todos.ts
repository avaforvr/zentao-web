import request from '@/utils/request';
import {TodoItemType} from "@/models/todos";

export interface LoginParamsType {
    userName: string;
    password: string;
    mobile: string;
    captcha: string;
}

export async function fetchTodos(): Promise<any> {
    return request('/api/todos/fetch');
}

export async function addTodo(params: TodoItemType): Promise<any> {
    return request('/api/todos/add', {
        method: 'POST',
        data: params,
    });
}

export async function editTodo(params: TodoItemType): Promise<any> {
    return request('/api/todos/edit', {
        method: 'POST',
        data: params,
    });
}

export async function removeTodo(todoId: number): Promise<any> {
    return request('/api/todos/remove', {
        method: 'POST',
        data: todoId,
    });
}


import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { Todo, DelectionTodo } from './todo.type';
import { NewTodo, NextTodo } from './todo.input';
import TodoService from '../../service/todo.service';

@Resolver(of => Todo)
@Service()
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo])
  public todos() {
    return this.todoService.getTodos();
  }

  @Mutation(() => Todo)
  public createTodo(@Arg('todo') todo: NewTodo) {
    return this.todoService.createTodo(todo);
  }

  @Mutation(() => Todo)
  public updateTodo(@Arg('todo') todo: NextTodo) {
    return this.todoService.updateTodo(todo);
  }

  @Mutation(() => DelectionTodo)
  public async deleteTodo(@Arg('todoId') todoId: string) {
    const isDelete = await this.todoService.deleteTodo(todoId);

    return {
      isDelete
    };
  }
}

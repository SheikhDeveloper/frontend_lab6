export interface TodoTask {
  id: number
  title: string
  completed: boolean
  userId: number
}

export interface NewTodoTask {
  title: string
  completed?: boolean
  userId: number
}
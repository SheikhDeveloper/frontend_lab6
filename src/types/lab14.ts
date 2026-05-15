export interface Lab14Task {
  id: number
  title: string
  completed: boolean
  createdAt: Date
}

export interface NewLab14Task {
  title: string
  completed?: boolean
}
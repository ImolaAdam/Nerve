
export interface User { 
    email: string
    password: string
    userName: string
    birthday: Date
    role: 'Beginner' | 'Medium' | 'Expert'
}
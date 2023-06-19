export interface UserProfile {
    id: number
    email: string
    password: string
    name: string
    role: "customer" | "admin"
    avatar: string
}
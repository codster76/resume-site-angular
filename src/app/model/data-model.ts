export interface Item {
    id: string,
    name: string,
    description: string,
    value: number,
    weight: number,
    quantity: number,
    tags?: string[]
}

export interface BagDetails {
    bagName: string,
    bagPassword: string
}
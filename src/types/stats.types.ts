interface IPerDay {
    date: string,
    count: number,
    totalAmount: number
}

export interface IStats {
    usersPerDay: IPerDay[]
    ,
    agentsPerDay: IPerDay[],
    transactionsPerDay: IPerDay[],
    thisWeekCount: {
        users: {
            count: number,
            totalAmount: number
        },
        agents: {
            count: number,
            totalAmount: number
        },
        transactions: {
            count: number,
            totalAmount: number
        }
    },
    growth: {
        users: string;
        agents: string;
        transactions: string;
        transactionAmount: string;
        totalUsersAndAgents: string;
    }
}

export interface IData { key: string, value: number };
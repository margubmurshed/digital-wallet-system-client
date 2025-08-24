export interface addMoneyInfo {
    amount: number
}

export interface withdrawMoneyInfo {
    amount: number
}

export interface cashoutInfo {
    agentPhoneNumber: string;
    amount: number;
}

export interface sendMoneyInfo {
    receiverPhoneNumber: string;
    amount: number;
}

export interface cashinInfo {
    receiverPhoneNumber: string;
    amount: number;
}

export interface ITransactionResponseData {
    type: string
    from: null | {
        name:string;
        phone: string;
        _id: string;
    };
    to: null | {
        name:string;
        phone: string;
        _id: string;
    }
    initiatedBy: string
    amount: number
    fee: number
    commission: number
    status: string
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
    balance: number
}

export interface IWalletData {
    _id: string,
    user: {
        _id: string,
        name: string,
        phone: string
    },
    balance: number,
    status: "ACTIVE" | "BLOCKED",
    createdAt: string
    updatedAt: string
    __v: number
}
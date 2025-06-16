export interface User {
    id: number;
    name: string;
    cpf: string;
    password: string;
    creditCardSimulations: CreditCardSimulation[];
    token?: string;
}

export interface CreditCardSimulation {
    id: number;
    user: User;
    initialAmount: number;
    interestRate: number;
    paymentType: 'minimum' | 'partial' | 'full';
    months: number;
    totalAmountToPay: number;
}

export interface FinancingSimulation {
    id: number,
    itemPrice: number,
    downPayment: number,
    months: number,
    monthlyInterestRate: number,
    additionalFees: number,
    totalAmountPaid: number,
    cet: number
}

export interface InterestComparisonSimulation {
    id: number;
    initialAmount: number;
    interestRate: number;
    months: number;
    simpleInterestTotal: number;
    compoundInterestTotal: number;
    user: User[]
}

export interface SmallExpenseSimulation {
    id: number;
    itemPrice: number;
    frequqnecyPerWeek: number;
    monthlyInterestRate: number;
    user: User[];
    annualSpent: number;
    investedAmount: number;
    finalAmountWithInterest: number;
}
import { CreditCardSimulation, FinancingSimulation, InterestComparisonSimulation } from './models';

export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor?: string | string[];
        borderColor?: string | string[];
        borderWidth?: number;
    }[];
}

/**
 * Calculates the payment evolution for a credit card simulation.
 * Returns the data array for charting and the labels.
 */
export function calculateCreditCardChartData(sim: CreditCardSimulation): ChartData {
    const { months, initialAmount, totalAmountToPay, interestRate, paymentType, id } = sim;
    const data: number[] = [];
    for (let i = 0; i < months; i++) {
        if (i === 0) {
            data.push(initialAmount);
            continue;
        }
        const valueWithRate = data[i - 1] + (data[i - 1] * (interestRate / 100));
        if (valueWithRate >= totalAmountToPay) {
            data.push(totalAmountToPay);
            break;
        }
        data.push(Number(valueWithRate.toFixed(2)));
    }
    return {
        labels: Array.from({ length: data.length }, (_, i) => `Parcela ${i + 1}`),
        datasets: [
            {
                label: `Valor da dívida`,
                data,
                backgroundColor: paymentType === 'partial' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 99, 132, 0.2)',
                borderColor: paymentType === 'partial' ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };
}

/**
 * Calculates the payment evolution for a financing simulation.
 * Returns the data array for charting and the labels.
 */
export function calculateFinancingChartData(
    sim: FinancingSimulation,
    type: 'price' | 'sac' = 'price',
    showTotalPaid: boolean = true
): ChartData {
    const { months, itemPrice, downPayment, monthlyInterestRate, additionalFees, id } = sim;
    const financiedPrice = itemPrice - downPayment;
    const rate = monthlyInterestRate / 100;
    const fees = additionalFees;
    const totalPaidData: number[] = [];
    const installmentData: number[] = [];
    const amortizationData: number[] = [];
    const interestData: number[] = [];
    let totalPaid = downPayment;
    let remainingPrincipal = financiedPrice;

    if (type === 'price') {
        // Price formula (parcela fixa)
        const installment = rate > 0 ? (financiedPrice * rate) / (1 - Math.pow(1 + rate, -months)) : financiedPrice / months;
        for (let month = 1; month <= months; month++) {
            const interest = remainingPrincipal * rate;
            const amortization = installment - interest;
            remainingPrincipal -= amortization;
            totalPaid += installment;
            totalPaidData.push(Number(totalPaid.toFixed(2)));
            installmentData.push(Number(installment.toFixed(2)));
            amortizationData.push(Number(amortization.toFixed(2)));
            interestData.push(Number(interest.toFixed(2)));
        }
    } else {
        // SAC: amortização constante
        const amortization = financiedPrice / months;
        for (let month = 1; month <= months; month++) {
            const interest = remainingPrincipal * rate;
            const parcelaMes = amortization + interest;
            remainingPrincipal -= amortization;
            totalPaid += parcelaMes;
            totalPaidData.push(Number(totalPaid.toFixed(2)));
            installmentData.push(Number(parcelaMes.toFixed(2)));
            amortizationData.push(Number(amortization.toFixed(2)));
            interestData.push(Number(interest.toFixed(2)));
        }
    }
    if (fees > 0) {
        totalPaidData[totalPaidData.length - 1] = Number((totalPaidData[totalPaidData.length - 1] + fees).toFixed(2));
    }
    return {
        labels: Array.from({ length: months }, (_, i) => `Parcela ${i + 1}`),
        datasets: [
            ...(showTotalPaid ? [{
                label: `Valor total pago`,
                data: totalPaidData,
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1,
            }] : []),
            {
                label: `Valor da parcela`,
                data: installmentData,
                backgroundColor: 'rgba(34,197,94,0.15)',
                borderColor: 'rgba(34,197,94,1)',
                borderWidth: 1,
            },
            {
                label: `Amortização`,
                data: amortizationData,
                backgroundColor: 'rgba(59,130,246,0.15)',
                borderColor: 'rgba(59,130,246,1)',
                borderWidth: 1,
            },
            {
                label: `Juros`,
                data: interestData,
                backgroundColor: 'rgba(239,68,68,0.15)',
                borderColor: 'rgba(239,68,68,1)',
                borderWidth: 1,
            }
        ],
    };
}

/**
 * Calculates the data for interest comparison charts (simple vs compound interest).
 * Returns the data array for charting and the labels.
 */
export function calculateInterestComparisonChartData(sim: InterestComparisonSimulation): ChartData {
    const { months, initialAmount, interestRate, simpleInterestTotal, compoundInterestTotal, id } = sim;
    const simpleData: number[] = [];
    const compoundData: number[] = [];
    for (let i = 0; i < months; i++) {
        // Simple interest: A = P(1 + rt)
        simpleData.push(Number((initialAmount * (1 + (interestRate / 100) * (i + 1))).toFixed(2)));
        // Compound interest: A = P(1 + r)^t
        compoundData.push(Number((initialAmount * Math.pow(1 + (interestRate / 100), i + 1)).toFixed(2)));
    }
    return {
        labels: Array.from({ length: months }, (_, i) => `Mês ${i + 1}`),
        datasets: [
            {
                label: `Simples`,
                data: simpleData,
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 1,
            },
            {
                label: `Composto`,
                data: compoundData,
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                borderColor: 'rgba(168, 85, 247, 1)',
                borderWidth: 1,
            }
        ],
    };
}

import App from "./App";
import { render, screen, fireEvent } from "@testing-library/react";

test('Unit Tests', () => {
    render(<App/>);

    const incomeInput = screen.getByTestId('monthly-income');
    const partnerIncomeInput = screen.getByTestId('partner-income');
    const monthlyDebtInput = screen.getByTestId('monthly-payment');
    const termInput = screen.getByTestId('term');
    const zipCodeInput = screen.getByTestId('zipcode');
    const studentDebtCheckbox = screen.getByTestId('student-dept');
    const calculateButton = screen.getByText('Calculate Max Mortgage');

    // Simulate user input by changing the value of the input field
    fireEvent.change(incomeInput, { target: { value: '25000' } });
    fireEvent.change(partnerIncomeInput, { target: { value: '15000' } });
    fireEvent.change(monthlyDebtInput, { target: { value: '500' } });
    fireEvent.change(termInput, { target: { value: '20' } });
    fireEvent.change(zipCodeInput, { target: { value: '6641' } });
    fireEvent.click(studentDebtCheckbox);
    fireEvent.click(calculateButton);

    expect(incomeInput.value).toBe('25000');
    expect(partnerIncomeInput.value).toBe('15000');
    expect(monthlyDebtInput.value).toBe('500');
    expect(termInput.value).toBe('20');
    expect(zipCodeInput.value).toBe('6641');
    expect(studentDebtCheckbox).toBeChecked();
    
})

test('Integration Test', () => {
    render(<App/>);

    const incomeInput = screen.getByTestId('monthly-income');
    const partnerIncomeInput = screen.getByTestId('partner-income');
    const monthlyDebtInput = screen.getByTestId('monthly-payment');
    const termInput = screen.getByTestId('term');
    const zipCodeInput = screen.getByTestId('zipcode');
    const studentDebtCheckbox = screen.getByTestId('student-dept');
    const calculateButton = screen.getByText('Calculate Max Mortgage');

    fireEvent.change(incomeInput, { target: { value: '25000' } });
    fireEvent.change(partnerIncomeInput, { target: { value: '15000' } });
    fireEvent.change(monthlyDebtInput, { target: { value: '500' } });
    fireEvent.change(termInput, { target: { value: '20' } });
    fireEvent.change(zipCodeInput, { target: { value: '6641' } });
    fireEvent.click(studentDebtCheckbox);
    fireEvent.click(calculateButton);

    // Assertions for the results
    const maxMortgageResult = screen.getByTestId('max-mortgage').textContent;
    const monthlyPaymentResult = screen.getByTestId('monthly-payment-result').textContent;
    const interestPerMonthResult = screen.getByTestId('interest-per-month').textContent;
    const principalPerMonthResult = screen.getByTestId('principal-per-month').textContent;
    const totalCostResult = screen.getByTestId('total-cost').textContent;

    // Expect the result values to match the expected values
    expect(maxMortgageResult).toBe('Maximum Allowed Mortgage: $13538.699999999999');
    expect(monthlyPaymentResult).toBe('Monthly Payment: $85.65');
    expect(interestPerMonthResult).toBe('Interest Paid Each Month: $29.24');
    expect(principalPerMonthResult).toBe('Principal Repaid Each Month: $56.41');
    expect(totalCostResult).toBe('Total Cost Over the Full Term: $20556.60');
})
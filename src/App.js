import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      income: '',
      partnerIncome: '',
      monthlyDebt: '',
      term: '30',
      hasStudentDebt: false,
      zipCode: '',
      maxMortgage: 0,
      errorMessage: '',
      monthlyPayment: 0,
      interestPerMonth: 0,
      principalPerMonth: 0,
      totalCost: 0,
    };
  }

  handleIncomeChange = (event) => {
    this.setState({ income: event.target.value });
  }

  handlePartnerIncomeChange = (event) => {
    this.setState({ partnerIncome: event.target.value });
  }

  handleMonthlyDebtChange = (event) => {
    this.setState({ monthlyDebt: event.target.value });
  }

  handleTermChange = (event) => {
    this.setState({ term: event.target.value });
  }

  handleStudentDebtChange = (event) => {
    this.setState({ hasStudentDebt: event.target.checked });
  }

  handleZipCodeChange = (event) => {
    this.setState({ zipCode: event.target.value });
  }

  calculateMaxMortgage = () => {
    const { income, partnerIncome, monthlyDebt, term, hasStudentDebt, zipCode } = this.state;
  
    if (!income || !partnerIncome || !monthlyDebt || !zipCode) {
      this.setState({ errorMessage: 'Please fill in all required fields.' });
      return;
    }
  
    const incomeNum = parseFloat(income);
    const partnerIncomeNum = parseFloat(partnerIncome);
    const monthlyDebtNum = parseFloat(monthlyDebt);
    const termInYears = parseInt(term);
  
    if (!isNaN(incomeNum) && !isNaN(monthlyDebtNum) && !isNaN(termInYears)) {
      const zipCodesToReject = ['9679', '9681', '9682'];
      if (zipCodesToReject.includes(zipCode)) {
        this.setState({ errorMessage: 'Mortgages in this area are not accepted due to earthquake risk and declining home values.' });
      } else {
        const monthsInYear = 12;
        let interestRate;
  
        switch (termInYears) {
          case 2:
            interestRate = 0.02;
            break;
          case 5:
            interestRate = 0.03;
            break;
          case 10:
            interestRate = 0.035;
            break;
          case 20:
            interestRate = 0.045;
            break;
          case 30:
            interestRate = 0.05;
            break;
          default:
            interestRate = 0.04;
            break;
        }
  
        const totalIncome = incomeNum + partnerIncomeNum;
        const monthlyRate = interestRate / monthsInYear;
        const totalMonths = termInYears * monthsInYear;
  
        let maxMortgage = ((totalIncome * 0.28 - monthlyDebtNum) / (1 - Math.pow(1 + monthlyRate, -totalMonths))).toFixed(2);
        

        if (hasStudentDebt) {
          maxMortgage *= 0.75;
        }
  
        this.setState({ maxMortgage, errorMessage: '' });
  
        const monthlyPayment = (maxMortgage * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
        const totalCost = monthlyPayment * totalMonths;
        const interestPerMonth = monthlyPayment - (maxMortgage / totalMonths);
        const principalPerMonth = maxMortgage / totalMonths;
  
        this.setState({ monthlyPayment, interestPerMonth, principalPerMonth, totalCost });
  
        // Clear the error message when calculations are successful
        this.setState({ errorMessage: '' });
      }
    }
  }
  

  render() {
    return (
      <div className="calculator">
        <h2>Hypo</h2>
        <div className="input-container">
          <label>Your Monthly Income:</label>
          <input
            type="number"
            value={this.state.income}
            onChange={this.handleIncomeChange}
            data-testid="monthly-income"
          />
        </div>
        <div className="input-container">
          <label>Partner's Monthly Income:</label>
          <input
            type="number"
            value={this.state.partnerIncome}
            onChange={this.handlePartnerIncomeChange}
            data-testid="partner-income"
          />
        </div>
        <div className="input-container">
          <label>Monthly Debt Payments:</label>
          <input
            type="number"
            value={this.state.monthlyDebt}
            onChange={this.handleMonthlyDebtChange}
            data-testid="monthly-payment"
          />
        </div>
        <div className="input-container">
          <label>Mortgage Term (years):</label>
          <select
            value={this.state.term}
            onChange={this.handleTermChange}
            data-testid="term"
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <div className="input-container">
          <label>Zip Code:</label>
          <input
            type="text"
            value={this.state.zipCode}
            onChange={this.handleZipCodeChange}
            data-testid="zipcode"
          />
        </div>
        <div className="input-container">
          <label>Do you have student debt?</label>
          <input
            type="checkbox"
            checked={this.state.hasStudentDebt}
            onChange={this.handleStudentDebtChange}
            data-testid="student-dept"
          />
        </div>
        <button onClick={this.calculateMaxMortgage}>Calculate Max Mortgage</button>
        <div className="result">
          {this.state.errorMessage ? (
            <p className="error-message">{this.state.errorMessage}</p>
          ) : (
            this.state.maxMortgage > 0 && (
              <div>
                <p data-testid="max-mortgage">Maximum Allowed Mortgage: ${this.state.maxMortgage}</p>
                <p data-testid="monthly-payment-result">Monthly Payment: ${this.state.monthlyPayment.toFixed(2)}</p>
                <p data-testid="interest-per-month">Interest Paid Each Month: ${this.state.interestPerMonth.toFixed(2)}</p>
                <p data-testid="principal-per-month">Principal Repaid Each Month: ${this.state.principalPerMonth.toFixed(2)}</p>
                <p data-testid="total-cost">Total Cost Over the Full Term: ${this.state.totalCost.toFixed(2)}</p>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;

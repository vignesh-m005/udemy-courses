import { calculateInvestmentResults } from "../util/investment";
import { formatter } from "../util/investment";

export default function DisplayInvestments({ investment }) {
  const annualData = calculateInvestmentResults(investment);
  let investedCapital =
    investment.initialInvestment + investment.annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <td key="year">Year</td>
          <td key="inv-value">Investment value</td>
          <td key="interest">Interest(Year)</td>
          <td key="total">Total Interest</td>
          <td key="cap">Invested Capital</td>
        </tr>
      </thead>
      <tbody>
        {annualData.map((inv) => {
          if (inv.valueEndOfYear - investedCapital !== inv.interest) {
            investedCapital = investedCapital + investment.annualInvestment;
          }
          let totalInterest = inv.valueEndOfYear - investedCapital;

          return (
            <tr key={inv.year}>
              <td key="year">{inv.year}</td>
              <td key="inv-value">{formatter.format(inv.valueEndOfYear)}</td>
              <td key="interest">{formatter.format(inv.interest)}</td>
              <td key="total">{formatter.format(totalInterest)}</td>
              <td key="cap">{formatter.format(investedCapital)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

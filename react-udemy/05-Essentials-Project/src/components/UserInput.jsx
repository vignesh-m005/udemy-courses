import { useState } from "react";
import DisplayInvestments from "./DisplayInvestments";

export default function UserInput() {
  const [investment, setInvestment] = useState({
    initialInvestment: 0,
    annualInvestment: 0,
    expectedReturn: 0,
    duration: 0,
  });

  function handleInputChange(valueIdentifier, newValue) {
    setInvestment((prev) => {
      return { ...prev, [valueIdentifier]: Number(newValue) };
    });
  }

  return (
    <>
      <form id="user-input">
        <table>
          <tbody>
            <tr className="input-group">
              <td>
                <p>
                  <label>Initial Investment</label>
                  <input
                    type="number"
                    required
                    onChange={(event) =>
                      handleInputChange("initialInvestment", event.target.value)
                    }
                  />
                </p>
              </td>
              <td>
                <p>
                  <label>Annual Investment</label>
                  <input
                    type="number"
                    required
                    onChange={(event) =>
                      handleInputChange("annualInvestment", event.target.value)
                    }
                  />
                </p>
              </td>
            </tr>
            <tr className="input-group">
              <p>
                <td>
                  <label>Expected Return</label>
                  <input
                    type="number"
                    required
                    onChange={(event) =>
                      handleInputChange("expectedReturn", event.target.value)
                    }
                  />
                </td>
              </p>
              <p>
                <td>
                  <label>Duration</label>
                  <input
                    type="number"
                    required
                    onChange={(event) =>
                      handleInputChange("duration", event.target.value)
                    }
                  />
                </td>
              </p>
            </tr>
          </tbody>
        </table>
      </form>
      {investment.duration > 0 ? (
        <DisplayInvestments investment={investment} />
      ) : (
        <p className="center">Please Enter Duration greater than zero.</p>
      )}
    </>
  );
}

import Layout from "@/layout";
import Step2 from "./pages/Step2";
import StepIndicator from "./components/StepIndicator";
import Step1 from "./pages/Step1";
import Step3 from "./pages/Step3";

function App() {
  return (
    <Layout>
      <StepIndicator>
        <StepIndicator.Step title="Step 1">
          <Step1 />
        </StepIndicator.Step>
        <StepIndicator.Step title="Step 2">
          <Step2 />
        </StepIndicator.Step>
        <StepIndicator.Step title="Step 3">
          <Step3 />
        </StepIndicator.Step>
      </StepIndicator>
    </Layout>
  );
}

export default App;

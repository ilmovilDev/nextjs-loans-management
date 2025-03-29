import Header from "@/components/layout/header";
import Layout from "@/components/layout/layout";
import AddLoanButton from "./_components/add-loan-button";

export default function Loans() {
  return (
    <Layout>
      <Header title="Empréstimos">
        <AddLoanButton />
      </Header>
    </Layout>
  );
}

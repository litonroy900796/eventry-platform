import PaymentForm from "@/components/payments/PaymentForm";

const PaymentPage = async ({ params }) => {
  const { eventId } = await params;   // 🔥 MUST await এখানে

  console.log("eventId:", eventId);

  return (
    <section className="container">
      <div className="bg-[#242526] p-6 rounded-lg max-w-xl mx-auto my-12">
        <h2 className="font-bold text-xl mb-8">Payment Details</h2>
        <PaymentForm eventId={eventId} />
      </div>
    </section>
  );
};

export default PaymentPage;
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 lg:px-12 pt-32 pb-20">
        <h1 className="font-serif text-4xl lg:text-5xl tracking-wider text-foreground mb-4">
          Shipping &amp; Returns
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Last updated: April 7, 2026
        </p>

        <div className="max-w-3xl mx-auto space-y-10 font-sans text-muted-foreground text-lg leading-relaxed text-justify">
          {/* ── Shipping ── */}
          <section>
            <h2 className="font-serif text-2xl tracking-wider text-foreground mb-4">
              Shipping Policy
            </h2>

            <h3 className="font-serif text-xl tracking-wider text-foreground mb-2">
              Free Worldwide Shipping
            </h3>
            <p>
              We offer <span className="text-foreground font-medium">complimentary standard shipping on every order</span>, worldwide — no minimum purchase required. All orders are dispatched from our atelier in India.
            </p>

            <h3 className="font-serif text-xl tracking-wider text-foreground mt-6 mb-2">
              Estimated Delivery Times
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-foreground font-medium">India:</span> 3–7 business days</li>
              <li><span className="text-foreground font-medium">Asia &amp; Middle East:</span> 7–12 business days</li>
              <li><span className="text-foreground font-medium">Europe &amp; UK:</span> 10–18 business days</li>
              <li><span className="text-foreground font-medium">North America:</span> 12–20 business days</li>
              <li><span className="text-foreground font-medium">Rest of World:</span> 14–25 business days</li>
            </ul>
            <p className="mt-3 text-sm">
              Delivery times are estimates and may vary due to customs processing or carrier delays. You will receive a tracking number via email once your order ships.
            </p>

            <h3 className="font-serif text-xl tracking-wider text-foreground mt-6 mb-2">
              Duties, Taxes &amp; Import Charges (DAP)
            </h3>
            <p>
              All international orders are shipped on a <span className="text-foreground font-medium">Delivered At Place (DAP)</span> basis. This means:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>The price you pay at checkout covers the product and shipping only.</li>
              <li>Any import duties, taxes, or customs fees levied by your country are the <span className="text-foreground font-medium">responsibility of the customer</span> and are payable upon delivery or clearance.</li>
              <li>Verve has no control over these charges and cannot predict their amount; they vary by country and product category.</li>
              <li>We recommend checking with your local customs office before ordering if you are unsure about potential charges.</li>
            </ul>

            <h3 className="font-serif text-xl tracking-wider text-foreground mt-6 mb-2">
              Order Processing
            </h3>
            <p>
              Orders are processed within 1–3 business days (Monday–Saturday, excluding Indian public holidays). During peak seasons or product launches, processing may take an additional 1–2 days. Once dispatched, you will receive a shipping confirmation email with tracking details.
            </p>
          </section>

          {/* ── Returns ── */}
          <section>
            <h2 className="font-serif text-2xl tracking-wider text-foreground mb-4">
              Return &amp; Refund Policy
            </h2>

            <h3 className="font-serif text-xl tracking-wider text-foreground mb-2">
              30-Day Hassle-Free Returns
            </h3>
            <p>
              We want you and your furry companion to be completely satisfied. If you're not happy with your purchase, you may return it within <span className="text-foreground font-medium">30 days of delivery</span> for a full refund or exchange, subject to the conditions below.
            </p>

            <h3 className="font-serif text-xl tracking-wider text-foreground mt-6 mb-2">
              Eligibility
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Items must be unused, unworn, and in their original condition with all tags and packaging intact.</li>
              <li>Personalised, engraved, or custom-made products are <span className="text-foreground font-medium">non-returnable</span> unless they arrive damaged or defective.</li>
              <li>Sale and clearance items are final sale unless defective.</li>
            </ul>

            <h3 className="font-serif text-xl tracking-wider text-foreground mt-6 mb-2">
              How to Initiate a Return
            </h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Email us at <span className="text-foreground font-medium">support@vervepets.com</span> with your order number, the item(s) you wish to return, and the reason.</li>
              <li>Our team will respond within 48 hours with a Return Merchandise Authorisation (RMA) number and shipping instructions.</li>
              <li>Pack the item securely in its original packaging and ship it to the address provided.</li>
            </ol>

            <h3 className="font-serif text-xl tracking-wider text-foreground mt-6 mb-2">
              Return Shipping
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-foreground font-medium">Domestic returns (within India):</span> We provide a prepaid return shipping label at no cost.</li>
              <li><span className="text-foreground font-medium">International returns:</span> Return shipping costs are borne by the customer. We recommend using a trackable shipping method, as we cannot be held responsible for items lost in return transit.</li>
              <li>If the return is due to a manufacturing defect or an error on our part, we will cover return shipping regardless of your location.</li>
            </ul>

            <h3 className="font-serif text-xl tracking-wider text-foreground mt-6 mb-2">
              Refund Processing
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Once we receive and inspect the returned item, we will notify you via email.</li>
              <li>Approved refunds are processed to the original payment method within <span className="text-foreground font-medium">7–10 business days</span>.</li>
              <li>Original shipping charges (if any promotional shipping was not applied) are non-refundable.</li>
              <li>Any import duties or taxes paid by the customer on the original shipment are not refundable by Verve; you may apply for a duty refund with your local customs authority.</li>
            </ul>

            <h3 className="font-serif text-xl tracking-wider text-foreground mt-6 mb-2">
              Exchanges
            </h3>
            <p>
              We are happy to exchange items for a different size or colour, subject to availability. To request an exchange, follow the same return process above and specify your preferred replacement. If the replacement has a price difference, we will charge or refund the difference accordingly.
            </p>

            <h3 className="font-serif text-xl tracking-wider text-foreground mt-6 mb-2">
              Damaged or Defective Items
            </h3>
            <p>
              If your order arrives damaged, defective, or incorrect, please contact us within <span className="text-foreground font-medium">48 hours of delivery</span> with photographs of the issue. We will arrange a replacement or full refund — including return shipping costs — at no extra charge.
            </p>

            <h3 className="font-serif text-xl tracking-wider text-foreground mt-6 mb-2">
              Cancellations
            </h3>
            <p>
              You may cancel an order within <span className="text-foreground font-medium">12 hours of placing it</span>, provided it has not yet been dispatched. Once an order is shipped, it cannot be cancelled — you may return it after delivery per the policy above.
            </p>
          </section>

          {/* ── Contact ── */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">
              Questions?
            </h2>
            <p>
              For any shipping or return enquiries, reach us at{" "}
              <span className="text-foreground font-medium">support@vervepets.com</span>.
              We're here to help.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingReturns;

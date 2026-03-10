import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 lg:px-12 pt-32 pb-20">
        <h1 className="font-serif text-4xl lg:text-5xl tracking-wider text-foreground mb-4">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: March 10, 2026</p>

        <div className="prose prose-neutral max-w-3xl space-y-8 text-foreground/80 font-sans text-sm leading-relaxed text-justify">
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">1. Agreement to Terms</h2>
            <p>By accessing or using the Verve website and purchasing our products, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">2. Products & Pricing</h2>
            <p>All product descriptions, images, and prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time. Prices are displayed in your selected currency and include applicable taxes unless otherwise stated.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">3. Orders & Payment</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>All orders are subject to acceptance and availability.</li>
              <li>We reserve the right to refuse or cancel any order for any reason, including suspected fraud.</li>
              <li>Payment is processed securely through our payment providers at the time of order.</li>
              <li>You agree to provide accurate and complete payment information.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">4. Shipping & Delivery</h2>
            <p>We aim to dispatch orders within 2–5 business days. Delivery times vary by location. We are not responsible for delays caused by shipping carriers or customs. Risk of loss passes to you upon delivery to the carrier.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">5. Returns & Refunds</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You may return unused, unworn items within 30 days of delivery for a full refund.</li>
              <li>Items must be in original condition with all tags attached.</li>
              <li>Personalised or custom-made items are non-refundable.</li>
              <li>Return shipping costs are the responsibility of the customer unless the item is defective.</li>
              <li>Refunds are processed within 10 business days of receiving the returned item.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">6. Intellectual Property</h2>
            <p>All content on this website — including text, images, logos, graphics, and designs — is the property of Verve and protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our written permission.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">7. User Accounts</h2>
            <p>When you create an account, you are responsible for maintaining the confidentiality of your credentials and for all activity under your account. You must notify us immediately of any unauthorised use.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Verve shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the relevant product.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">9. Consumer Rights (EU/UK)</h2>
            <p>If you are a consumer in the European Union or United Kingdom, you have statutory rights under consumer protection laws, including a 14-day cooling-off period for distance purchases. Nothing in these terms affects your statutory rights.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">10. Governing Law</h2>
            <p>These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction in which Verve operates. Any disputes shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">11. Changes to Terms</h2>
            <p>We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with a revised "Last updated" date. Continued use of the website constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">12. Contact</h2>
            <p>For questions about these Terms of Service, please contact us at <span className="text-foreground font-medium">support@vervepets.com</span>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 lg:px-12 pt-32 pb-20">
        <h1 className="font-serif text-4xl lg:text-5xl tracking-wider text-foreground mb-4">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: March 10, 2026</p>

        <div className="prose prose-neutral max-w-3xl space-y-8 text-foreground/80 font-sans text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">1. Introduction</h2>
            <p>Verve ("we", "our", "us") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and share your information when you visit our website or purchase our products, in accordance with the General Data Protection Regulation (GDPR) and other applicable data protection laws.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">2. Data Controller</h2>
            <p>Verve is the data controller responsible for your personal data. If you have questions about this policy or your data, please contact us at <span className="text-foreground font-medium">privacy@vervepets.com</span>.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">3. Information We Collect</h2>
            <p>We may collect the following categories of personal data:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Identity Data:</strong> First name, last name.</li>
              <li><strong>Contact Data:</strong> Email address, shipping and billing addresses, phone number.</li>
              <li><strong>Transaction Data:</strong> Details of orders and payments.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies.</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on site, referral source.</li>
              <li><strong>Marketing Data:</strong> Preferences for receiving communications from us.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">4. Legal Basis for Processing (GDPR)</h2>
            <p>We process your personal data on the following legal bases:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Contract:</strong> Processing necessary to fulfil your order.</li>
              <li><strong>Legitimate Interest:</strong> Improving our products and services, fraud prevention.</li>
              <li><strong>Consent:</strong> Marketing communications and non-essential cookies.</li>
              <li><strong>Legal Obligation:</strong> Tax and accounting requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">5. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Processing and fulfilling orders.</li>
              <li>Sending order confirmations and shipping updates.</li>
              <li>Providing customer support.</li>
              <li>Sending marketing communications (with your consent).</li>
              <li>Improving our website and products.</li>
              <li>Fraud detection and prevention.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">6. Data Sharing</h2>
            <p>We may share your data with trusted third parties, including:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Payment processors (e.g., Shopify Payments, Stripe).</li>
              <li>Shipping and logistics providers.</li>
              <li>Analytics services (e.g., Google Analytics).</li>
              <li>Marketing platforms (only with your consent).</li>
            </ul>
            <p className="mt-2">We never sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">7. Data Retention</h2>
            <p>We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Order data is typically retained for 6 years for tax and accounting purposes.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">8. Your Rights Under GDPR</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Access</strong> your personal data.</li>
              <li><strong>Rectify</strong> inaccurate or incomplete data.</li>
              <li><strong>Erase</strong> your personal data ("right to be forgotten").</li>
              <li><strong>Restrict</strong> processing of your data.</li>
              <li><strong>Data Portability</strong> — receive your data in a structured format.</li>
              <li><strong>Object</strong> to processing based on legitimate interest or direct marketing.</li>
              <li><strong>Withdraw Consent</strong> at any time for consent-based processing.</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, contact us at <span className="text-foreground font-medium">privacy@vervepets.com</span>.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">9. Cookies</h2>
            <p>We use essential cookies to operate our website and optional cookies for analytics and marketing. You can manage your cookie preferences through your browser settings. For more details, see our Cookie section in the footer.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">10. International Transfers</h2>
            <p>Your data may be transferred outside the European Economic Area (EEA). Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on our website with a revised "Last updated" date.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

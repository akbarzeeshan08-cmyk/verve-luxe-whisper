import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 lg:px-12 pt-32 pb-20">
        <h1 className="font-serif text-4xl lg:text-5xl tracking-wider text-foreground mb-4">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: April 7, 2026</p>

        <div className="max-w-3xl mx-auto space-y-10 font-sans text-muted-foreground text-lg leading-relaxed text-justify">
          {/* 1 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">1. Introduction</h2>
            <p>
              These Terms &amp; Conditions ("Terms") govern your use of the Verve website (<span className="text-foreground font-medium">vervepetting.com</span>) and the purchase of products offered by Verve ("we", "us", "our"). By accessing this website or placing an order, you agree to be bound by these Terms. If you do not agree, please refrain from using our services.
            </p>
            <p className="mt-2">
              Verve is a brand operated from India. We sell and ship our products worldwide. These Terms are drafted in compliance with applicable Indian law, European Union consumer protection regulations, and the UK Consumer Rights Act 2015.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">2. Eligibility</h2>
            <p>
              You must be at least 18 years of age, or the age of majority in your jurisdiction, to place an order. By using this website you represent and warrant that you meet this requirement.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">3. Products &amp; Pricing</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>All product descriptions and images are as accurate as possible; however, slight variations in colour or texture may occur due to handcrafted production and screen settings.</li>
              <li>Prices are listed in your selected currency and are inclusive of Indian GST where applicable. For international orders, prices exclude local import duties, taxes, and customs fees (see our Shipping &amp; Returns policy).</li>
              <li>We reserve the right to modify prices or discontinue products at any time without prior notice.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">4. Orders &amp; Payment</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Placing an order constitutes an offer to purchase. Acceptance occurs when we send a shipping confirmation email.</li>
              <li>We reserve the right to refuse or cancel any order due to suspected fraud, pricing errors, or stock unavailability.</li>
              <li>Payments are processed securely through our third-party payment providers. We do not store your full card details on our servers.</li>
              <li>All transactions are subject to the Information Technology Act, 2000 (India) and the Payment Card Industry Data Security Standard (PCI DSS).</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">5. Shipping &amp; Delivery</h2>
            <p>
              Please refer to our <a href="/shipping-returns" className="text-foreground font-medium underline underline-offset-2 hover:text-accent transition-colors">Shipping &amp; Returns</a> page for full details on delivery timescales, free worldwide shipping, and DAP (Delivered At Place) terms for duties and taxes.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">6. Returns, Refunds &amp; Cancellations</h2>
            <p>
              Our 30-day return policy is detailed on the <a href="/shipping-returns" className="text-foreground font-medium underline underline-offset-2 hover:text-accent transition-colors">Shipping &amp; Returns</a> page. In addition:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><span className="text-foreground font-medium">Indian consumers:</span> Returns and refunds are governed by the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020.</li>
              <li><span className="text-foreground font-medium">EU/EEA consumers:</span> You have a statutory 14-day cooling-off period under the Consumer Rights Directive (2011/83/EU) during which you may withdraw from a distance purchase without giving a reason. This right is in addition to our 30-day policy.</li>
              <li><span className="text-foreground font-medium">UK consumers:</span> Your rights under the Consumer Rights Act 2015 and the Consumer Contracts Regulations 2013 are unaffected by these Terms.</li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">7. Data Protection &amp; GDPR</h2>
            <p>
              We take your privacy seriously. Our full data practices are described in our <a href="/privacy" className="text-foreground font-medium underline underline-offset-2 hover:text-accent transition-colors">Privacy Policy</a>. Key points include:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>We process personal data in accordance with the General Data Protection Regulation (EU) 2016/679 ("GDPR"), the UK GDPR, and India's Digital Personal Data Protection Act, 2023 ("DPDP Act").</li>
              <li>We collect only the data necessary to fulfil your order, provide customer support, and improve our services.</li>
              <li>You have the right to access, rectify, erase, restrict, or port your personal data. To exercise these rights, email <span className="text-foreground font-medium">privacy@vervepets.com</span>.</li>
              <li>We do not sell your personal data to third parties.</li>
              <li>For EU/EEA data transfers outside the European Economic Area, we rely on Standard Contractual Clauses (SCCs) approved by the European Commission.</li>
              <li>Our Data Protection Officer can be reached at <span className="text-foreground font-medium">privacy@vervepets.com</span>.</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">8. Intellectual Property</h2>
            <p>
              All content on this website — including text, photographs, logos, graphics, product designs, and software — is the exclusive property of Verve and is protected under the Copyright Act, 1957 (India), the Trademarks Act, 1999 (India), and applicable international intellectual property treaties. Reproduction without prior written consent is prohibited.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">9. Limitation of Liability</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To the maximum extent permitted by law, Verve shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our website or products.</li>
              <li>Our total aggregate liability shall not exceed the amount you paid for the specific product giving rise to the claim.</li>
              <li>Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud, or any liability that cannot be excluded under applicable law (including EU consumer protection law).</li>
            </ul>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Verve, its officers, directors, employees, and agents from any claims, losses, damages, liabilities, and expenses (including reasonable legal fees) arising from your breach of these Terms or misuse of the website.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">11. Governing Law &amp; Dispute Resolution</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-foreground font-medium">For Indian customers:</span> These Terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India, without prejudice to your right to approach consumer forums under the Consumer Protection Act, 2019.</li>
              <li><span className="text-foreground font-medium">For EU/EEA customers:</span> You may bring proceedings in your country of residence. You also have access to the European Commission's Online Dispute Resolution platform at <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium underline underline-offset-2 hover:text-accent transition-colors">ec.europa.eu/consumers/odr</a>.</li>
              <li><span className="text-foreground font-medium">For UK customers:</span> These Terms are governed by the laws of England and Wales. Nothing in these Terms affects your statutory rights.</li>
              <li><span className="text-foreground font-medium">For all other customers:</span> These Terms are governed by the laws of India, and disputes shall be subject to arbitration in New Delhi under the Arbitration and Conciliation Act, 1996.</li>
            </ul>
          </section>

          {/* 12 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">12. Severability</h2>
            <p>
              If any provision of these Terms is held invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">13. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Changes will be posted on this page with a revised "Last updated" date. Your continued use of the website after any changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="font-serif text-xl tracking-wider text-foreground mb-3">14. Contact</h2>
            <p>
              For questions regarding these Terms &amp; Conditions, please contact us at <span className="text-foreground font-medium">support@vervepets.com</span>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;

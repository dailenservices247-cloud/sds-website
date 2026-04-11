import type { Metadata } from "next";
import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Synapse Dynamics Segmented collects, uses, and protects information from people who visit our website or contact us.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      effectiveDate="April 11, 2026"
    >
      <p>
        Synapse Dynamics Segmented (&ldquo;<strong>SDS</strong>,&rdquo; &ldquo;
        <strong>we</strong>,&rdquo; &ldquo;<strong>us</strong>&rdquo;) is a
        brand of Black Sheep 247 LLC. We respect your privacy. This page
        explains what information we collect when you visit{" "}
        <a href="https://synapsedynamics.vercel.app">synapsedynamics.vercel.app</a>{" "}
        or contact us, why we collect it, and what we do with it.
      </p>

      <h2>What we collect</h2>

      <h3>Information you give us directly</h3>
      <p>
        When you submit our contact form, we collect the name, email address,
        company (optional), and project description that you provide. We collect
        this so we can respond to you. That&apos;s it.
      </p>

      <h3>Information collected automatically</h3>
      <p>
        Like most websites, our hosting provider (Vercel) logs basic technical
        information about visits — IP address, user agent, referrer, page
        viewed, and timestamp — to keep the site running and to detect abuse.
        These logs are retained for a limited period and are not used to build
        marketing profiles.
      </p>
      <p>
        If we enable Vercel Analytics, it collects aggregate, privacy-respecting
        page-view data. Vercel Analytics does not use cookies and does not track
        individual visitors across sites.
      </p>

      <h2>What we do with it</h2>
      <ul>
        <li>Respond to your inquiry or proposal request.</li>
        <li>Send follow-up communications about a project you initiated.</li>
        <li>Operate, secure, and improve the website.</li>
        <li>Comply with legal obligations.</li>
      </ul>
      <p>
        We do not sell your information. We do not share it with advertisers.
        We do not use it to train AI models.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We use a small set of service providers to operate this site and run
        our business. The providers that may receive information you submit
        are:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong> — hosting and edge delivery for the website.
        </li>
        <li>
          <strong>Resend</strong> (when enabled) — transactional email delivery
          for contact-form submissions.
        </li>
        <li>
          <strong>GitHub</strong> — source code hosting for this website.
        </li>
      </ul>
      <p>
        Each of these providers has its own privacy practices and is bound by
        its own data-processing terms with us. We only share what is necessary
        for them to perform their function.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Contact-form submissions are kept for as long as is reasonably
        necessary to respond to your inquiry and to maintain a record of our
        engagement (typically up to 24 months from last contact, after which
        records are deleted unless an active project requires otherwise).
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access,
        correct, delete, or export the personal information we hold about you,
        or to object to our processing of it. To exercise any of these rights,
        email us at{" "}
        <a href="mailto:hello@synapsedynamicssegmented.com">
          hello@synapsedynamicssegmented.com
        </a>{" "}
        and we&apos;ll respond within a reasonable timeframe.
      </p>

      <h2>Cookies</h2>
      <p>
        This website does not currently set tracking cookies. If that changes,
        this page will be updated and a cookie notice will be added.
      </p>

      <h2>Children</h2>
      <p>
        This site is intended for business users and is not directed to
        children under 13. We do not knowingly collect information from
        children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        reflected by a new effective date at the top of this page. Continued
        use of the site after changes are posted means you accept the updated
        policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href="mailto:hello@synapsedynamicssegmented.com">
          hello@synapsedynamicssegmented.com
        </a>
        .
      </p>

      <hr />

      <p>
        <em>
          Synapse Dynamics Segmented is a brand of Black Sheep 247 LLC.
        </em>
      </p>
    </LegalLayout>
  );
}

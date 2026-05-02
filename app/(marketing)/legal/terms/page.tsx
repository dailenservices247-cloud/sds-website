import type { Metadata } from "next";
import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your use of the Synapse Dynamics Segmented website.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Use"
      effectiveDate="April 11, 2026"
    >
      <p>
        These Terms of Use govern your access to and use of the Synapse
        Dynamics Segmented website at{" "}
        <a href="https://synapsedynamics.io">synapsedynamics.io</a>{" "}
        (the &ldquo;<strong>Site</strong>&rdquo;), operated by Black Sheep 247
        LLC (&ldquo;<strong>SDS</strong>,&rdquo; &ldquo;<strong>we</strong>
        ,&rdquo; &ldquo;<strong>us</strong>&rdquo;). By using the Site, you
        agree to these terms. If you don&apos;t agree, please don&apos;t use
        the Site.
      </p>

      <h2>Informational only</h2>
      <p>
        The Site is a marketing and informational resource. Nothing on it
        constitutes a binding offer, a contract, or professional advice. Any
        engagement between you and SDS is governed by a separate, signed
        statement of work or services agreement — not by anything published
        here.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Two different licenses apply to material on this site:
      </p>
      <ul>
        <li>
          <strong>Code.</strong> The source code for this website is published
          under the MIT License and is available at{" "}
          <a
            href="https://github.com/dailenservices247-cloud/sds-website"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/dailenservices247-cloud/sds-website
          </a>
          . You&apos;re welcome to read it, fork it, and learn from it.
        </li>
        <li>
          <strong>Brand assets.</strong> All Synapse Dynamics Segmented brand
          assets — including the wordmark, the Nodal Worm primary mark, the
          Mono-S Coil monogram, the name &ldquo;Synapse Dynamics
          Segmented,&rdquo; the SDS color system, copy on the Site, and any
          other identifiable brand materials — are proprietary to Black Sheep
          247 LLC and are not licensed under the MIT License. You may not
          reproduce, modify, or use them to imply endorsement, partnership, or
          affiliation without our prior written permission.
        </li>
      </ul>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Site in any way that violates applicable law.</li>
        <li>
          Attempt to disrupt or compromise the Site, its underlying
          infrastructure, or any user&apos;s access.
        </li>
        <li>
          Scrape the Site at a rate or volume that interferes with normal
          operation.
        </li>
        <li>
          Submit false, misleading, or impersonating information through the
          contact form.
        </li>
        <li>
          Use any AI agent or automated system to interact with the Site in a
          way that misrepresents itself as a human prospect.
        </li>
      </ul>

      <h2>Third-party links</h2>
      <p>
        The Site may link to third-party websites and services that we
        don&apos;t operate or control (for example, scrlpets.lovable.app, our
        GitHub repository, and our service providers). We are not responsible
        for the content, terms, or privacy practices of those sites. Your use
        of them is at your own risk.
      </p>

      <h2>No warranties</h2>
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo; without warranties of any kind, express or implied.
        We do not warrant that the Site will be uninterrupted, error-free, or
        free from harmful components. Information on the Site may be updated
        or removed at any time without notice.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, neither SDS nor Black Sheep
        247 LLC will be liable for any indirect, incidental, special,
        consequential, or punitive damages, or any loss of profits, revenue,
        data, or business opportunities, arising out of or in connection with
        your use of the Site — even if we have been advised of the
        possibility of such damages.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Ohio, without
        regard to its conflict of law principles. Any dispute arising under
        these terms will be resolved in the state or federal courts located in
        Lucas County, Ohio.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Material changes will be
        reflected by a new effective date at the top of this page. Continued
        use of the Site after changes are posted means you accept the updated
        terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
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

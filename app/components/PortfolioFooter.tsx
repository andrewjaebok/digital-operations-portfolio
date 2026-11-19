import Link from "next/link";
import FooterBlocks from "./FooterBlocks";
import "./PortfolioFooter.css";

export default function PortfolioFooter() {
  return (
    <footer className="playful-footer" id="contact">
      <div className="shell">
        <div className="footer-invitation">
          <p className="eyebrow">Have something in mind?</p>
          <h2>Let’s build something better.</h2>
          <p>Better customer experiences. Smoother operations. Ideas brought to life.</p>
          <a className="footer-contact" href="mailto:andrewjaebok@gmail.com">Let’s talk</a>
        </div>
        <FooterBlocks />
        <div className="footer-baseline">
          <Link href="/">Andrew · Digital Operations</Link>
          <nav aria-label="Footer navigation">
            <Link href="/#work">Projects</Link>
            <Link href="/how-i-work">How I work</Link>
            <a href="#top">Back to top</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

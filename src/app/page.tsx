import { Navigation } from "@/components/navigation";
import {
  Arrow,
  BrowserIcon,
  ButtonLink,
  ImageFrame,
  Star,
} from "@/components/portfolio-elements";
import { profile, projects, toolGroups } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <section
          id="home"
          className="section hero"
          data-theme="dark"
          aria-labelledby="home-heading"
        >
          <div className="section-inner hero-grid">
            <div className="hero-copy">
              <h1 id="home-heading" className="hand hero-heading">
                hi, i’m faiz.
              </h1>
              <div className="hero-intro">
                <p>Fresh Information Content Management graduate.</p>
                <p>I build simple websites + useful systems.</p>
              </div>
              <ButtonLink href="#work">see my work</ButtonLink>
            </div>
            <div className="hero-portrait">
              <ImageFrame
                kind="portrait"
                label="Line portrait of Faiz Hashim"
                alt="White line portrait of Faiz Hashim holding a cup of ice cream"
                src="/images/faiz-dark-line-portrait.webp"
                className="dark-line-portrait"
              />
            </div>
          </div>
        </section>

        <section
          id="about"
          className="section about"
          data-theme="light"
          aria-labelledby="about-heading"
        >
          <div className="section-inner about-grid">
            <div className="about-portrait">
              <ImageFrame
                kind="portrait"
                label="Illustrated portrait of Faiz Hashim"
                alt="Line illustration of Faiz Hashim holding a cup of ice cream"
                src="/images/faiz-about-illustration.webp"
                className="about-illustration"
              />
            </div>
            <div className="about-copy">
              <div className="underlined-heading">
                <h2 id="about-heading" className="hand">
                  about me
                </h2>
                <Star />
              </div>
              <div className="about-intro">
                <p>UiTM graduate.</p>
                <p>I turn messy business tasks into simple digital tools.</p>
                <p>Clear, useful, easy to use.</p>
              </div>
              <div className="tools">
                <h3 className="hand">tools i’ve used</h3>
                <dl>
                  {toolGroups.map((group) => (
                    <div key={group.label}>
                      <dt>{group.label}</dt>
                      <dd>{group.tools}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="section work"
          data-theme="dark"
          aria-labelledby="work-heading"
        >
          <div className="section-inner">
            <h2 id="work-heading" className="hand work-heading">
              work
            </h2>
            <ol className="work-list">
              {projects.map((project) => (
                <li key={project.id}>
                  <a className="work-link" href={`#${project.id}`}>
                    <span className="work-number hand">{project.number}</span>
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.category}</p>
                    </div>
                    <BrowserIcon />
                    <Arrow />
                  </a>
                </li>
              ))}
            </ol>
            <a className="scroll-link" href="#barbershop">
              scroll <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        {projects.map((project) => (
          <section
            key={project.id}
            id={project.id}
            className={`section project project--${project.id}`}
            data-theme={project.theme}
            data-nav="work"
            aria-labelledby={`${project.id}-heading`}
          >
            <div className="section-inner project-grid">
              <div className="project-copy">
                <h2
                  id={`${project.id}-heading`}
                  className="hand project-heading"
                  aria-label={`${project.number} / ${project.title}`}
                >
                  {project.id === "norisah-selera" ? (
                    <>
                      <span className="project-number">{project.number}</span>
                      <span className="norisah-heading-slash" aria-hidden="true">/</span>
                      <span className="norisah-heading-first">Norisah</span>{" "}
                      <span className="norisah-heading-rest">Selera Desa</span>
                    </>
                  ) : (
                    <>
                      <span className="project-number">{project.number} /</span>
                      <span>{project.heading}</span>
                    </>
                  )}
                </h2>
                <p className="project-description">{project.description}</p>
                <ul className="feature-list">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <p className="project-tools">{project.tools}</p>
                <div className="project-actions">
                  <ButtonLink href={project.href} external>
                    {project.action}
                  </ButtonLink>
                  <Arrow curved />
                </div>
              </div>
              <ImageFrame
                label={`${project.title} screenshot`}
                alt={`${project.title} website screenshot`}
                src={project.image}
                className={`project-frame project-frame--${project.id}`}
              />
            </div>
          </section>
        ))}

        <section
          id="experience"
          className="section experience"
          data-theme="dark"
          aria-labelledby="experience-heading"
        >
          <div className="section-inner experience-grid">
            <div className="experience-copy">
              <h2 id="experience-heading" className="hand experience-heading">
                Codex
                <br />
                gets work
                <br />
                moving.
              </h2>
              <p className="experience-intro">
                I use Codex to plan features, build pages, test with Playwright
                and fix bugs.
              </p>
              <div className="internship">
                <Arrow />
                <div>
                  <h3>AI Digital Marketing Intern</h3>
                  <p>Locus-T · March–August 2026</p>
                  <p className="muted">
                    SiteTarik · CMS · dashboard · website tracking
                  </p>
                </div>
              </div>
            </div>
            <div className="workflow" aria-label="My workflow with Codex">
              <div className="browser-bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="workflow-body">
                <div className="workflow-note">
                  <span className="small-label">my process</span>
                  <p className="hand">
                    a useful idea.
                    <br />a working website.
                  </p>
                  <span className="code-mark" aria-hidden="true">
                    &lt;/&gt;
                  </span>
                </div>
                <ol>
                  {["plan", "build", "test", "review"].map((step) => (
                    <li key={step}>
                      <span className="check" aria-hidden="true">
                        ✓
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <p className="workflow-caption">AI helps. I check the details.</p>
            </div>
          </div>
        </section>

        <section
          id="education"
          className="section education"
          data-theme="light"
          aria-labelledby="education-heading"
        >
          <div className="section-inner">
            <div className="education-title">
              <h2 id="education-heading" className="script">
                the background bits.
              </h2>
              <Star />
            </div>
            <div className="education-grid">
              <div className="qualification">
                <h3>UiTM · Information Content Management</h3>
                <p>Bachelor of Information Science (Hons) · 2024–2026</p>
                <p>CGPA 3.74 · Dean’s List, Semesters 3–6</p>
              </div>
              <ol className="uni-projects">
                <li>
                  <span>01</span>Campus Job Board
                </li>
                <li>
                  <span>02</span>Clinic Appointment System
                </li>
                <li>
                  <span>03</span>Ikan Bandaraya Catch Management System
                </li>
              </ol>
            </div>
            <div className="beyond-work">
              <h3>Beyond work</h3>
              <p>
                K-Youth Nurture <span>·</span> Enactus Treasurer <span>·</span>{" "}
                Records Transfer Volunteer
              </p>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section contact"
          data-theme="dark"
          aria-labelledby="contact-heading"
        >
          <div className="section-inner">
            <div className="contact-grid">
              <h2 id="contact-heading" className="script contact-heading">
                Say hi.
              </h2>
              <div className="contact-details">
                <address>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn <span aria-hidden="true">↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                  <p>{profile.location}</p>
                </address>
                <ButtonLink href={`mailto:${profile.email}`}>
                  send an email
                </ButtonLink>
              </div>
            </div>
            <footer className="footer">
              <nav aria-label="Footer navigation">
                <a href="#work">work</a>
                <a href="#about">about</a>
                <a href="#contact">contact</a>
              </nav>
              <a href="#home" className="back-top">
                back to top <span aria-hidden="true">↑</span>
              </a>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

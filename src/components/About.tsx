"use client";
import { useLang } from "@/lib/LangContext";
import CountUp from "./CountUp";

const ICONS = [
  // lastbil
  <path key="a" d="M2 6h11v10H2zM13 9h4l4 4v3h-8M6 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01" />,
  // retur
  <path key="b" d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4" />,
  // sköld
  <path key="c" d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5" />,
  // skiftnyckel
  <path key="d" d="M14.5 4.5a4.5 4.5 0 0 0-5.6 5.8L3 16.2 7.8 21l5.9-5.9a4.5 4.5 0 0 0 5.8-5.6l-2.8 2.8-3-.6-.6-3z" />,
];

export default function About() {
  const { tr } = useLang();
  const a = tr.about;
  return (
    <section className="about" id="om-oss">
      <div className="wrap about-in">
        <div className="about-copy" data-reveal>
          <p className="kicker">{a.eyebrow}</p>
          <h2 className="sec-title">
            <span className="mat">{a.title[0]}</span>
            <br />
            <span className="mat mat-hot">{a.title[1]}</span>
          </h2>
          <p>{a.body1}</p>
          <p>{a.body2}</p>
          <dl className="about-stats">
            {a.stats.map(([num, suf, label]) => (
              <div key={label}>
                <dt><CountUp to={Number(num)} suffix={suf} /></dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="timeline" data-reveal data-anim>
          <h3 className="tl-title"><span>{a.timelineTitle}</span></h3>
          <ol>
            <span className="weld" aria-hidden="true"><i /></span>
            {a.timeline.map(([year, title, text], i) => (
              <li key={year} style={{ ["--i" as string]: i }}>
                <span className="tl-year">{year}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="wrap">
        <ul className="usps">
          {a.usps.map((u, i) => (
            <li key={u.label} data-reveal style={{ ["--i" as string]: i }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[i]}</svg>
              <strong>{u.label}</strong>
              <p>{u.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

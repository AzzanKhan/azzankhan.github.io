'use client';

import { FormEvent, useRef, useState } from 'react';

const arrow = <span aria-hidden="true">↗</span>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const iframeLoaded = useRef(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setSubmitting(true);
  }

  function handleFrameLoad() {
    if (!iframeLoaded.current) {
      iframeLoaded.current = true;
      return;
    }
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="contact-success" role="status">
        <span className="success-mark" aria-hidden="true">✓</span>
        <p className="eyebrow">Message received</p>
        <h2>Thanks for reaching out.</h2>
        <p>Your note is on its way. I&apos;ll get back to you at the email address you provided.</p>
        <button className="button button-dark" type="button" onClick={() => setSubmitted(false)}>Send another message {arrow}</button>
      </div>
    );
  }

  return (
    <>
      <form className="contact-form" action="https://formsubmit.co/azzankhanofficial@gmail.com" method="POST" target="contact-submit-frame" onSubmit={handleSubmit}>
        <input type="hidden" name="_subject" value="[Azzan Khan Website] New inquiry" />
        <input type="hidden" name="_captcha" value="false" />
        <label>Name<input name="name" required autoComplete="name" /></label>
        <label>Email<input type="email" name="email" required autoComplete="email" /></label>
        <label>What can I help with?<textarea name="message" rows={6} required /></label>
        <button className="button button-dark" type="submit" disabled={submitting}>{submitting ? 'Sending…' : <>Send inquiry {arrow}</>}</button>
      </form>
      <iframe name="contact-submit-frame" title="Contact form submission" className="contact-submit-frame" onLoad={handleFrameLoad} />
    </>
  );
}

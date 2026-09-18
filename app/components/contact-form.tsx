'use client';

import { useEffect, useState } from 'react';

const arrow = <span aria-hidden="true">↗</span>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(new URLSearchParams(window.location.search).get('sent') === 'true');
  }, []);

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
      <form className="contact-form" action="https://formsubmit.co/azzankhanofficial@gmail.com" method="POST">
        <input type="hidden" name="_subject" value="[Azzan Khan Website] New inquiry" />
        <input type="hidden" name="_next" value="https://azzankhan.github.io/contact?sent=true" />
        <input type="hidden" name="_captcha" value="false" />
        <label>Name<input name="name" required autoComplete="name" /></label>
        <label>Email<input type="email" name="email" required autoComplete="email" /></label>
        <label>What can I help with?<textarea name="message" rows={6} required /></label>
        <button className="button button-dark" type="submit">Send inquiry {arrow}</button>
      </form>
    </>
  );
}

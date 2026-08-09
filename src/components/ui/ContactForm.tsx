"use client";

import React, { useRef, useState } from 'react';
import { Button } from './Button';

type Fields = { name: string; phone: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: '', phone: '', email: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Mirrors the server's rules so the user gets feedback without a round-trip.
 *  The server re-validates regardless — this is UX, not security. */
function validate(v: Fields): Errors {
    const e: Errors = {};
    if (!v.name.trim()) e.name = 'Please enter your name.';
    if (!v.phone.trim()) e.phone = 'Please enter your phone number.';
    else if (!/[0-9]/.test(v.phone)) e.phone = 'Please enter a valid phone number.';
    if (!v.email.trim()) e.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.';
    if (!v.message.trim()) e.message = 'Please enter a message.';
    return e;
}

export const ContactForm: React.FC = () => {
    const [values, setValues] = useState<Fields>(EMPTY);
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [formError, setFormError] = useState('');
    // Only surface a field's error once the user has left it (or tried to
    // submit) — validating mid-typing is hostile.
    const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
    const honeypot = useRef<HTMLInputElement>(null);
    // When the form was mounted — the server rejects submissions that arrive
    // implausibly fast for something a human typed.
    const startedAt = useRef<number>(Date.now());

    const set = (k: keyof Fields) => (
        ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const next = { ...values, [k]: ev.target.value };
        setValues(next);
        if (touched[k]) setErrors(validate(next));
    };

    const blur = (k: keyof Fields) => () => {
        setTouched((t) => ({ ...t, [k]: true }));
        setErrors(validate(values));
    };

    async function onSubmit(ev: React.FormEvent) {
        ev.preventDefault();
        const found = validate(values);
        setErrors(found);
        setTouched({ name: true, phone: true, email: true, message: true });
        if (Object.keys(found).length) {
            // Move focus to the first problem so keyboard/screen-reader users
            // aren't left guessing what failed.
            const first = (['name', 'phone', 'email', 'message'] as const).find((k) => found[k]);
            if (first) document.getElementById(`hb-${first}`)?.focus();
            return;
        }

        setStatus('sending');
        setFormError('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    company: honeypot.current?.value ?? '',
                    startedAt: startedAt.current,
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                if (data.errors) {
                    setErrors(data.errors);
                    setStatus('idle');
                    return;
                }
                throw new Error(data.error || 'Something went wrong.');
            }
            setStatus('sent');
            setValues(EMPTY);
            setTouched({});
        } catch (err) {
            setStatus('error');
            setFormError(err instanceof Error ? err.message : 'Something went wrong.');
        }
    }

    if (status === 'sent') {
        return (
            <div className="hb-form-done" role="status">
                <div className="hb-form-done-mark" aria-hidden="true">
                    <img src="/img/cdn/68b2c1be2762f3ffc1be06c5_icon-bubble-check.svg" width="56" height="56" alt="" />
                </div>
                <h3 className="hb-form-done-title">Message sent!</h3>
                <p className="hb-form-done-text">
                    Thanks for reaching out — our team will get back to you shortly.
                </p>
                <Button
                    type="button"
                    variant="light"
                    onClick={() => { startedAt.current = Date.now(); setStatus('idle'); }}
                >
                    Send another
                </Button>
            </div>
        );
    }

    const field = (k: keyof Fields) => ({
        id: `hb-${k}`,
        name: k,
        value: values[k],
        onChange: set(k),
        onBlur: blur(k),
        'aria-invalid': errors[k] ? true : undefined,
        'aria-describedby': errors[k] ? `hb-${k}-err` : undefined,
        className: `hb-input${errors[k] ? ' has-error' : ''}`,
    });

    return (
        <form className="hb-form" onSubmit={onSubmit} noValidate>
            <div className="hb-form-row">
                <div className="hb-field">
                    <label className="hb-label" htmlFor="hb-name">Name</label>
                    <input {...field('name')} type="text" autoComplete="name" placeholder="Your name" />
                    {errors.name && <span className="hb-error" id="hb-name-err">{errors.name}</span>}
                </div>
                <div className="hb-field">
                    <label className="hb-label" htmlFor="hb-phone">Phone Number</label>
                    <input {...field('phone')} type="tel" autoComplete="tel" inputMode="tel" placeholder="+94 7X XXX XXXX" />
                    {errors.phone && <span className="hb-error" id="hb-phone-err">{errors.phone}</span>}
                </div>
            </div>

            <div className="hb-field">
                <label className="hb-label" htmlFor="hb-email">Email</label>
                <input {...field('email')} type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" />
                {errors.email && <span className="hb-error" id="hb-email-err">{errors.email}</span>}
            </div>

            <div className="hb-field">
                <label className="hb-label" htmlFor="hb-message">Message</label>
                <textarea {...field('message')} rows={4} placeholder="Tell us what you need — stock, wholesale, events, anything." />
                {errors.message && <span className="hb-error" id="hb-message-err">{errors.message}</span>}
            </div>

            {/* Honeypot — hidden from humans, irresistible to bots. */}
            <input
                ref={honeypot}
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hb-hp"
            />

            <div className="hb-form-actions">
                <Button type="submit" variant="light" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                </Button>
            </div>

            <p className="hb-form-note" role={status === 'error' ? 'alert' : undefined}>
                {status === 'error'
                    ? formError
                    : <>Or email us at <a href="mailto:info@hypebam.lk">info@hypebam.lk</a></>}
            </p>
        </form>
    );
};

export default ContactForm;

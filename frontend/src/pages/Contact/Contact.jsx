import React, { useState } from 'react';
import {
  INSTITUTE_NAME,
  INSTITUTE_PHONE,
  INSTITUTE_EMAIL,
  INSTITUTE_ADDRESS,
} from '../../utils/constants';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  MessageCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    classLevel: 'Class 12 Science',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(
    "Hello Sarthak Institute! I would like to inquire about Class 10, 11 & 12 coaching admissions."
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
          GET IN TOUCH
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
          Contact Sarthak Institute
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-4 text-base">
          Visit our campus office, call our counseling hotline, or chat with us instantly on WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info & WhatsApp CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
              Campus Office &amp; Counseling Desk
            </h3>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Coaching Address
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                    {INSTITUTE_ADDRESS}
                  </div>
                  <a
                    href="https://maps.app.goo.gl/DEytu3NHHUYy7E9q8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline mt-1.5"
                  >
                    📍 Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary-100 dark:bg-secondary-950 text-secondary-600 dark:text-secondary-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Admissions Phone Number
                  </div>
                  <a
                    href={`tel:${INSTITUTE_PHONE}`}
                    className="text-primary-600 dark:text-primary-400 font-semibold hover:underline mt-0.5 block"
                  >
                    {INSTITUTE_PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Official Email
                  </div>
                  <a
                    href={`mailto:${INSTITUTE_EMAIL}`}
                    className="text-primary-600 dark:text-primary-400 font-semibold hover:underline mt-0.5 block"
                  >
                    {INSTITUTE_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Counseling Hours
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                    Monday – Saturday: 9:00 AM – 7:30 PM
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-card p-8 sm:p-10">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              Send an Inquiry Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out the form below and our admission counselor will contact you within 2 hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  Message Sent Successfully!
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Thank you for contacting Sarthak Institute. Our counselor has received your inquiry for <strong>{formData.classLevel}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline py-2 px-6 text-xs mt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Verma"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Target Class &amp; Program *
                    </label>
                    <select
                      value={formData.classLevel}
                      onChange={(e) =>
                        setFormData({ ...formData, classLevel: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option>Class 10 Foundation &amp; Boards</option>
                      <option>Class 11 Science (PCM / PCB)</option>
                      <option>Class 11 Commerce &amp; CA Foundation</option>
                      <option>Class 11 Humanities &amp; CUET</option>
                      <option>Class 12 Science (PCM / PCB + Boards)</option>
                      <option>Class 12 Commerce &amp; Board Achievers</option>
                      <option>Class 12 Humanities &amp; Premier Batch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Message / Question
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ask about scholarship test, batch timings, or fee discounts..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="btn-primary w-full py-3">
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Google Maps Campus Location Embed */}
      <div className="glass-card overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
        <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary-600" />
            <span>Campus Location: Sarthak Institute Coaching Campus</span>
          </div>
          <a
            href="https://maps.app.goo.gl/DEytu3NHHUYy7E9q8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-extrabold text-primary-600 hover:underline flex items-center gap-1"
          >
            📍 Open Official Campus Map →
          </a>
        </div>

        <div className="aspect-[16/6] w-full bg-slate-200 dark:bg-slate-900 relative flex items-center justify-center overflow-hidden">
          <iframe
            title="Sarthak Institute Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.123456789012!2d75.8765432!3d22.7195687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0000000001%3A0x1234567890abcdef!2sMG%20Road%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;

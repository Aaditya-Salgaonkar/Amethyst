import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-40">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white">Contact Us</h2>
        <p className="mt-4 text-lg text-white">
          Have any questions or business inquiries? Reach out to us!
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="text-left">
            <h3 className="text-2xl font-semibold text-white">Our Office</h3>
            <p className="mt-2 text-lg text-white">Goa, India</p>

            <h3 className="mt-6 text-2xl font-semibold text-white">Email</h3>
            <p className="mt-2 text-lg text-white">
              <a href="mailto:aadityasalgaonkar@gmail.com" className="tetext-white">worksphere@gmail.com</a>
            </p>

            <h3 className="mt-6 text-2xl font-semibold text-white">Phone</h3>
            <p className="mt-2 text-lg text-white">+91 XXXXXXXXXX</p>
          </div>

          {/* Contact Form */}
          <div className="bg-neutral-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-white">Send a Message</h3>
            <form className="mt-4">
              <div className="mb-4">
                <label className="block text-left text-white font-semibold">Name</label>
                <input type="text" className="w-full p-3 rounded-lg border bg-gray mt-1 text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
              </div>

              <div className="mb-4">
                <label className="block text-left text-white font-semibold">Email</label>
                <input type="email" className="w-full p-3 rounded-lg border bg-gray mt-1 text-white border-gray-300 focus:outline-none focus:ring-2 focus:orange-indigo-500"/>
              </div>

              <div className="mb-4">
                <label className="block text-left text-white font-semibold">Message</label>
                <textarea className="w-full p-3 rounded-lg border bg-gray mt-1 text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" rows="4"></textarea>
              </div>

              <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

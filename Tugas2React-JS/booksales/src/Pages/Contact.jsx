import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

export default function Contact() {
  return (
    <>
      <Header />
      <section id="contact" className="py-5 bg-body-tertiary">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-4">
                <h2 className="fw-bold mb-3">Contact Us</h2>
                <p className="text-body-secondary">
                  Punya pertanyaan atau ingin kerja sama? Kirim pesanmu di sini.
                </p>
                <form onSubmit={(e) => e.preventDefault()} noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nama
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Nama kamu"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="email@domain.com"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder="Tulis pesanmu..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <i className="fa-regular fa-paper-plane me-2" />
                    Kirim
                  </button>
                </form>
              </div>

              <div className="col-lg-6">
                <div className="h-100 p-4 bg-white rounded-3 shadow-sm">
                  <h5 className="mb-3">Info Kontak</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">
                      <i className="fa-solid fa-location-dot me-2" />
                      Bogor, Indonesia
                    </li>
                    <li className="mb-2">
                      <i className="fa-solid fa-envelope me-2" />
                      hello@irmastore.com
                    </li>
                    <li>
                      <i className="fa-solid fa-phone me-2" />
                      +62 812-3456-7890
                    </li>
                  </ul>
                  <div className="ratio ratio-16x9">
                    <iframe
                      title="Map"
                      src="https://www.google.com/maps?q=bogor+indonesia&output=embed"
                      allowFullScreen
                      loading="lazy"
                      style={{ border: 0 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      <Footer />
    </>
  );
}

export default function ProductList() {
  return (
    <>
      <main>
        {/* ================= PRODUCT LIST ================= */}
        <section id="books" className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Best Seller</h1>
              <p className="lead text-body-secondary">
                Koleksi pilihan dengan ulasan terbaik dari pembaca. Temukan
                bacaan favorit untuk temani rutinitasmu.
              </p>
              <p>
                <a href="#" className="btn btn-primary my-2">
                  Views
                </a>
                <a href="#" className="btn btn-secondary my-2 ms-2">
                  Other Book
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="album py-5 bg-body-tertiary">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div className="col" key={i}>
                  <div className="card shadow-sm">
                    <svg
                      aria-label="Placeholder: Thumbnail"
                      className="bd-placeholder-img card-img-top"
                      width="100%"
                      height="225"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#55595c"></rect>
                      <text
                        x="50%"
                        y="50%"
                        fill="#eceeef"
                        dy=".3em"
                        textAnchor="middle"
                      >
                        Thumbnail
                      </text>
                    </svg>

                    <div className="card-body">
                      <p className="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content.
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary ms-2"
                          >
                            Edit
                          </button>
                        </div>
                        <small className="text-body-secondary">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TEAM SECTION ================= */}
        <section id="team" className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold">Our Team</h2>
              <p className="text-body-secondary">
                Kenalan dengan orang-orang di balik rak buku favoritmu.
              </p>
            </div>

            <div className="row g-4">
              {[
                { name: "Siti Irmawati", role: "Founder & CEO" },
                { name: "Fakhirul", role: "Fullstack Developer" },
                { name: "Raka Pratama", role: "Marketing Lead" },
                { name: "Nadia Safitri", role: "UI/UX Designer" },
              ].map((m, idx) => (
                <div className="col-12 col-sm-6 col-lg-3" key={idx}>
                  <div className="card h-100 text-center border-0 shadow-sm">
                    <img
                      src={`https://i.pravatar.cc/300?img=${idx + 10}`}
                      alt={m.name}
                      className="card-img-top"
                      style={{ aspectRatio: "1/1", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title mb-0">{m.name}</h5>
                      <small className="text-body-secondary">{m.role}</small>
                    </div>
                    <div className="card-footer bg-white border-0 pb-4">
                      <a
                        href="#"
                        className="btn btn-outline-primary btn-sm me-2"
                      >
                        <i className="fa-brands fa-linkedin" /> LinkedIn
                      </a>
                      <a href="#" className="btn btn-outline-secondary btn-sm">
                        <i className="fa-brands fa-github" /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
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
      </main>
    </>
  );
}

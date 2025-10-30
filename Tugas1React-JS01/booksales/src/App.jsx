function App() {
  return (
    <>
      <div className="container">
        {/* Header */}
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <a
              href="#home"
              className="d-inline-flex align-items-center link-body-emphasis text-decoration-none"
            >
              <i
                className="fa-solid fa-book fa-xl"
                style={{ color: "#77c0fc" }}
              />
              <span className="ms-2 fs-4">bookstore</span>
            </a>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#home" className="nav-link px-2">
                Home
              </a>
            </li>
            <li>
              <a href="#books" className="nav-link px-2">
                Book
              </a>
            </li>
            <li>
              <a href="#team" className="nav-link px-2">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link px-2">
                Contact
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link px-2">
                About
              </a>
            </li>
          </ul>

          <div className="col-md-3 text-end">
            <button type="button" className="btn btn-outline-primary me-2">
              Login
            </button>
            <button type="button" className="btn btn-primary">
              Register
            </button>
          </div>
        </header>

        {/* Hero */}
        <div id="home" className="container my-5">
          <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
            <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
              <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
                Atomic Habit: Perubahan Kecil yang Memberikan Hasil Luar Biasa
              </h1>
              <p className="lead">
                Cara mudah dan terbukti untuk membentuk kebiasaan baik dan
                menghilangkan kebiasaan buruk.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg px-4"
                >
                  Detail
                </button>
              </div>
            </div>

            <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
              <img
                className="rounded-3 img-fluid"
                src="https://picsum.photos/720/600"
                alt="Book cover"
                width="720"
              />
            </div>

            <main>
              {/* Intro Best Seller */}
              <section id="books" className="py-5 text-center container">
                <div className="row py-lg-5">
                  <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Best Seller</h1>
                    <p className="lead text-body-secondary">
                      Koleksi pilihan dengan ulasan terbaik dari pembaca.
                      Temukan bacaan favorit untuk temani rutinitasmu.
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

              {/* Album / Grid Books */}
              <div className="album py-5 bg-body-tertiary">
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
                            <rect
                              width="100%"
                              height="100%"
                              fill="#55595c"
                            ></rect>
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
                              This is a wider card with supporting text below as
                              a natural lead-in to additional content. This
                              content is a little bit longer.
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
                              <small className="text-body-secondary">
                                9 mins
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ===== TEAM SECTION ===== */}
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
                      {
                        name: "Fakhirul",
                        role: "Fullstack Developer",
                      },
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
                            <small className="text-body-secondary">
                              {m.role}
                            </small>
                          </div>
                          <div className="card-footer bg-white border-0 pb-4">
                            <a
                              href="#"
                              className="btn btn-outline-primary btn-sm me-2"
                            >
                              <i className="fa-brands fa-linkedin" /> LinkedIn
                            </a>
                            <a
                              href="#"
                              className="btn btn-outline-secondary btn-sm"
                            >
                              <i className="fa-brands fa-github" /> GitHub
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ===== CONTACT SECTION ===== */}
              <section id="contact" className="py-5 bg-body-tertiary">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <h2 className="fw-bold mb-3">Contact Us</h2>
                      <p className="text-body-secondary">
                        Punya pertanyaan atau ingin kerja sama? Kirim pesanmu di
                        sini.
                      </p>

                      <form
                        onSubmit={(e) => e.preventDefault()}
                        className="needs-validation"
                        noValidate
                      >
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
          </div>
        </div>

        {/* Footer */}
        <div className="container" id="about">
          <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
              <li className="nav-item">
                <a href="#home" className="nav-link px-2 text-body-secondary">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#books" className="nav-link px-2 text-body-secondary">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#contact"
                  className="nav-link px-2 text-body-secondary"
                >
                  FAQs
                </a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link px-2 text-body-secondary">
                  About
                </a>
              </li>
            </ul>
            <p className="text-center text-body-secondary">
              &copy; 2025 Siti Irmawati
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;

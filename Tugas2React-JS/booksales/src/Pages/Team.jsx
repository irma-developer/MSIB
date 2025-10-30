import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

export default function Team() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

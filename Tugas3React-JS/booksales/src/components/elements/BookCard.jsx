// src/components/elements/BookCard.jsx
export default function BookCard({ book }) {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <img
        src={book.image}
        alt={book.title}
        className="card-img-top"
        style={{ aspectRatio: "16/10", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="mb-1"><small className="text-body-secondary">
          {book.author} • {book.year}
        </small></p>
        <p className="card-text text-body-secondary">{book.description}</p>
      </div>
      <div className="card-footer bg-white border-0 pb-4">
        <button className="btn btn-sm btn-primary me-2">View</button>
        <button className="btn btn-sm btn-outline-secondary">Detail</button>
      </div>
    </div>
  );
}

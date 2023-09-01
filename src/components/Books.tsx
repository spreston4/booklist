import * as React from "react";
import axios from "axios";
import { SessionProps } from "../App";

interface BooksProps extends SessionProps {}

export interface BookObject {
  author: string;
  created_at: string;
  description?: string;
  id: number;
  title: string;
  updated_at: string;
}

const Books = ({ loggedInStatus, currentUser }: BooksProps) => {
  const [books, setBooks] = React.useState<BookObject[] | null>([]);
  const fetchBooks = () => {
    axios
      .get("http://localhost:3000/api/v1/books")
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((error) => console.log("Book fetch error: ", error));
  };

  React.useEffect(fetchBooks, []);
  return (
    <div className="w-2/3 mx-auto">
      <h2 className="font-montserrat text-type-dark text-xl font-medium py-4">
        Books
      </h2>
      <div>
        {books?.map((book) => (
          <p key={`${book.title}-${book.id}`} className="font-roboto">{book.title}</p>
        ))}
      </div>
    </div>
  );
};

export default Books;

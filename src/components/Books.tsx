import * as React from "react";
import axios from "axios";
import BookCard from "./ui/organisms/BookCard";
import { BooksProps, BookObject } from "../types";

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
      <div className="flex flex-col gap-4">
        {books?.map((book) => (
          <BookCard
            book={book}
            addable={"both"}
            currentUser={currentUser}
            loggedInStatus={loggedInStatus}
            key={`${book.title}-${book.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Books;

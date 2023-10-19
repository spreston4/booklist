import * as React from "react";
import axios from "axios";
import BookCard from "./ui/organisms/BookCard";
import Container from "./ui/atoms/Container";
import { BookObject, WishlistProps } from "../types";

const Readlist = ({ loggedInStatus, currentUser }: WishlistProps) => {
  const [books, setBooks] = React.useState<BookObject[] | null>([]);
  const [forceUpdate, setForceUpdate] = React.useState(false);

  const fetchReadlist = (id: number | null) => {
    axios
      .get(`/user/${id}/get_readlist`, {
        headers: { Accept: "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setBooks(response.data.books);
      })
      .catch((error) => console.log("Readlist fetch error: ", error));
  };

  const handleForceUpdate = () => {
    setForceUpdate(!forceUpdate);
  };

  React.useEffect(() => {
    if (currentUser?.id) {
      fetchReadlist(currentUser.id);
    }
  }, [currentUser?.id, forceUpdate]);

  return (
    <div className="w-2/3 mx-auto">
      Readlist
      <div className="flex flex-col gap-4">
        {books?.map((book) => (
          <BookCard
            book={book}
            currentUser={currentUser}
            loggedInStatus={loggedInStatus}
            removable={"readlist"}
            handleForceUpdate={handleForceUpdate}
            key={`${book.title}-${book.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Readlist;

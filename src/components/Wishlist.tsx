import * as React from "react";
import axios from "axios";
import BookCard from "./ui/organisms/BookCard";
import Container from "./ui/atoms/Container";
import { BookObject, WishlistProps } from "../types";

const Wishlist = ({ loggedInStatus, currentUser }: WishlistProps) => {
  const [books, setBooks] = React.useState<BookObject[] | null>([]);
  const [forceUpdate, setForceUpdate] = React.useState(false);

  const fetchWishlist = (id: number | null) => {
    axios
      .get(`/user/${id}/get_wishlist`, {
        headers: { Accept: "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((error) => console.log("Wishlist fetch error: ", error));
  };

  const handleForceUpdate = () => {
    setForceUpdate(!forceUpdate);
  };

  React.useEffect(() => {
    if (currentUser?.id) {
      fetchWishlist(currentUser.id);
    }
  }, [currentUser?.id, forceUpdate]);

  return (
    <div className="w-2/3 mx-auto">
      Wishlist
      <div className="flex flex-col gap-4">
        {books?.map((book) => (
          <BookCard
            addable="readlist"
            book={book}
            currentUser={currentUser}
            loggedInStatus={loggedInStatus}
            removable={"wishlist"}
            handleForceUpdate={handleForceUpdate}
            key={`${book.title}-${book.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
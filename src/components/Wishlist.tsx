import * as React from "react";
import axios from "axios";
import BookCard from "./ui/organisms/BookCard";
import { SessionProps } from "../App";
import { BookObject } from "./Books";

interface WishlistProps extends SessionProps {}

const Wishlist = ({ loggedInStatus, currentUser }: WishlistProps) => {
  const [books, setBooks] = React.useState<BookObject[] | null>([]);
  const [forceUpdate, setForceUpdate] = React.useState(false);

  const fetchWishlist = (id: number | null) => {
    axios
      .get(`http://localhost:3000/users/${id}/get_wishlist`, {
        headers: { Accept: "application/json" },
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
            book={book}
            currentUser={currentUser}
            removable={true}
            handleForceUpdate={handleForceUpdate}
            key={`${book.title}-${book.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

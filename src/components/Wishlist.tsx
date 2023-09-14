import * as React from "react";
import axios from "axios";
import { SessionProps } from "../App";
import { BookObject } from "./Books";

interface WishlistProps extends SessionProps {}

const Wishlist = ({ loggedInStatus, currentUser }: WishlistProps) => {
  const [books, setBooks] = React.useState<BookObject[] | null>([]);

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

  React.useEffect(() => {
    if (currentUser?.id) {
      fetchWishlist(currentUser.id);
    }
  }, [currentUser.id]);

  return (
    <div>
      Wishlist
      <div>
        {books?.map((book) => (
          <p key={`${book.title}-${book.id}`} className="font-roboto">
            {book.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

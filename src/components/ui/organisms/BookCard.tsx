import * as React from "react";
import axios from "axios";
import Button from "../atoms/Button";
import Container from "../atoms/Container";
import { BookObject } from "../../Books";
import { User } from "../../../App";
import { SessionProps } from "../../../App";

interface BookCardProps extends SessionProps {
  addable?: "wishlist" | "readlist" | "both";
  book: BookObject;
  handleForceUpdate?: () => void;
  removable?: "wishlist" | "readlist" | "both";
}

const BookCard = ({
  addable,
  book,
  currentUser,
  handleForceUpdate,
  loggedInStatus,
  removable,
}: BookCardProps) => {
  const loggedIn = loggedInStatus === "LOGGED_IN";

  const handleAddWishlist = () => {
    axios
      .post(`http://localhost:3000/users/${currentUser?.id}/add_to_wishlist`, {
        headers: { Accept: "application/json" },
        book: book,
      })
      .then((response) => {})
      .catch((error) => console.log("Wishlist add error: ", error));
  };

  const handleRemoveWishlist = () => {
    axios
      .delete(
        `http://localhost:3000/users/${currentUser?.id}/remove_from_wishlist`,
        {
          data: {
            headers: { Accept: "application/json" },
            book: book,
          },
        }
      )
      .then((response) => {
        handleForceUpdate?.();
      })
      .catch((error) => console.log("Wishlist add error: ", error));
  };

  return (
    <Container className="min-w-[175px]">
      <h3 className="font-montserrat text-type-dark text-lg font-medium">
        {book.title}
      </h3>
      <p className="font-roboto text-md text-type-grey">{book.author}</p>
      <div className="flex justify-start items-center gap-2">
        {loggedIn && (
          <div className="flex justify-start items-center gap-2">
            {(addable === "wishlist" || addable === "both") && (
              <Button onClick={handleAddWishlist}>+ Wishlist</Button>
            )}
            {(addable === "readlist" || addable === "both") && (
              <Button>+ Readlist</Button>
            )}
            {(removable === "wishlist" || removable === "both") && (
              <Button onClick={handleRemoveWishlist}>- Wishlist</Button>
            )}
            {(removable === "readlist" || removable === "both") && (
              <Button>- Readlist</Button>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default BookCard;

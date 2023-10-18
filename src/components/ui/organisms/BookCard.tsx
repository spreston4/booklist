import * as React from "react";
import axios from "axios";
import Button from "../atoms/Button";
import Container from "../atoms/Container";
import { BookCardProps } from "../../../types";

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
      .post(`http://localhost:3000/user/${currentUser?.id}/add_to_wishlist`, {
        headers: { Accept: "application/json" },
        book: book,
      })
      .then((response) => {})
      .catch((error) => console.log("Wishlist add error: ", error));
  };

  const handleRemoveWishlist = () => {
    axios
      .delete(
        `http://localhost:3000/user/${currentUser?.id}/remove_from_wishlist`,
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
      <h3 className="text-lg font-medium font-montserrat text-type-dark">
        {book.title}
      </h3>
      <p className="font-roboto text-md text-type-grey">{book.author}</p>
      <div className="flex items-center justify-start gap-2">
        {loggedIn && (
          <div className="flex items-center justify-start gap-2">
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

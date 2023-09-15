import * as React from "react";
import axios from "axios";
import Button from "../atoms/Button";
import { BookObject } from "../../Books";
import { User } from "../../../App";

interface BookCardProps {
  addable?: boolean;
  book: BookObject;
  currentUser?: User | null;
  handleForceUpdate?: () => void;
  removable?: boolean;
}

const BookCard = ({
  addable = false,
  book,
  currentUser,
  handleForceUpdate,
  removable = false,
}: BookCardProps) => {
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
        handleForceUpdate?.()
      })
      .catch((error) => console.log("Wishlist add error: ", error));
  };

  return (
    <div className="bg-bg-primary p-2 rounded-sm">
      <h3 className="font-montserrat text-type-dark text-lg font-medium">
        {book.title}
      </h3>
      <p className="font-roboto text-md text-type-grey">{book.author}</p>

      {addable && (
        <div className="flex justify-start items-center gap-2">
          <Button onClick={handleAddWishlist}>+ Wishlist</Button>
          <Button>+ Readlist</Button>
        </div>
      )}

      {removable && (
        <div className="flex justify-start items-center gap-2">
          <Button onClick={handleRemoveWishlist}>- Wishlist</Button>
          <Button>- Readlist</Button>
        </div>
      )}
    </div>
  );
};

export default BookCard;

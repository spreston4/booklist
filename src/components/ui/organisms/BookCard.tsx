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

  const handleAction = (
    list: "wishlist" | "readlist",
    action: "post" | "delete"
  ) => {
    const isPost = action === "post";
    const endpoint = {
      wishlist: isPost ? "add_to_wishlist" : "remove_from_wishlist",
      readlist: isPost ? "add_to_readlist" : "remove_from_readlist",
    };

    axios({
      method: action,
      url: `/user/${currentUser?.id}/${endpoint[list]}`,
      headers: { Accept: "application/json" },
      data: {
        book: book,
      },
    })
      .then((response) => {
        handleForceUpdate?.();
      })
      .catch((error) => console.error(error));
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
              <Button onClick={() => handleAction("wishlist", "post")}>
                + Wishlist
              </Button>
            )}
            {(addable === "readlist" || addable === "both") && (
              <Button onClick={() => handleAction("readlist", "post")}>
                + Readlist
              </Button>
            )}
            {(removable === "wishlist" || removable === "both") && (
              <Button onClick={() => handleAction("wishlist", "delete")}>
                - Wishlist
              </Button>
            )}
            {(removable === "readlist" || removable === "both") && (
              <Button onClick={() => handleAction("readlist", "delete")}>
                - Readlist
              </Button>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default BookCard;

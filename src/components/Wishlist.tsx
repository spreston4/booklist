import * as React from "react";
import BookCard from "./ui/organisms/BookCard";
import { WishlistProps } from "../types";

const Wishlist = ({
  loggedInStatus,
  currentUser,
  list,
  handleForceUpdate,
}: WishlistProps) => {
  return (
    <div className="w-2/3 mx-auto">
      Wishlist
      <div className="flex flex-col gap-4">
        {list?.map((book) => (
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

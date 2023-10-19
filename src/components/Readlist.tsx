import * as React from "react";
import BookCard from "./ui/organisms/BookCard";
import { WishlistProps } from "../types";

const Readlist = ({
  loggedInStatus,
  currentUser,
  list,
  handleForceUpdate,
}: WishlistProps) => {
  return (
    <div className="w-2/3 mx-auto">
      Readlist
      <div className="flex flex-col gap-4">
        {list?.map((book) => (
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

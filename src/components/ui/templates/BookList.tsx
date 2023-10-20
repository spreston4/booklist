import * as React from "react";
import BookCard from "../organisms/BookCard";
import { BooklistProps } from "../../../types";

const BookList = ({
  loggedInStatus,
  currentUser,
  list,
  name,
  removable = "both",
  addable = "both",
  handleForceUpdate,
}: BooklistProps) => {
  return (
    <div className="flex flex-col items-center justify-start w-2/3 mx-auto">
      {name}
      <div className="flex flex-col items-center justify-start gap-4">
        {list?.map((book) => (
          <BookCard
            book={book}
            currentUser={currentUser}
            loggedInStatus={loggedInStatus}
            removable={removable}
            addable={addable}
            handleForceUpdate={handleForceUpdate}
            key={`${book.title}-${book.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;

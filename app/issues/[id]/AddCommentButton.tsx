"use client";
import { Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";

const AddCommentButton = ({ issueId }: { issueId: number }) => {
  const [isClicked, setIsClicked] = useState(false);
  //assume our schema has a list of comments
  const [comment, setComment] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/issues/" + issueId, { comments: comment });
      setComment("");
      setIsClicked(false);
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  return (
    <Flex direction="column">
      <Button onClick={() => setIsClicked(!isClicked)}>Comment</Button>
      {isClicked && (
        <>
          <input
            placeholder="My thoughts are..."
            value={comment}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} disabled={!comment.trim()}>
            Post
          </Button>
        </>
      )}
    </Flex>
  );
};

export default AddCommentButton;

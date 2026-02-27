"use client";
import { Button } from "@radix-ui/themes";
import React from "react";

const AddCommentButton = () => {
  return <Button onClick={() => console.log("clicked")}>Comment</Button>;
};

export default AddCommentButton;

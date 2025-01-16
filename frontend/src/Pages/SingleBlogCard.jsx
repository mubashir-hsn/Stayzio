import React from "react";
import EditorJsParser from 'editorjs-parser';
import { FormatDate } from "../Components/FormatDate";

const SingleBlogCard = ({ blog }) => {
  const { title, description, content, coverImg, category, rating, author, createdAt } = blog || {};
  const parser = new EditorJsParser();

  const html = content ? parser.parse(content) : "";

  
  return (
    <div className="bg-white p-5 rounded-3">
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="" style={{ fontSize: "13px" }}>
          {FormatDate(createdAt)} by{" "}
          <span className="text-primary" style={{ cursor: "pointer" }}>Jhon</span>
        </p>
      </div>

      <div className="pt-3">
        <img src={coverImg} className="w-100 h-75" alt={title || "Blog Cover"} />
      </div>

      <div className="mt-4">
        <div
          className="prose prose-sm gap-3 editorjsdiv"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <div>
        <span className="" style={{fontSize:"16px", fontWeight:"600"}}>Rating:</span>
        <span>{" "}{rating} (Based on 2,322 reviews).</span>
      </div>
    </div>
  );
};

export default SingleBlogCard;

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import {
  PencilIcon,
  EyeIcon,
  CloudDownloadIcon,
  TrashIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import ReactMarkdown from "react-markdown/react-markdown.min";
import * as MDComponents from "./MDComponents";
import axios from "axios";

const tabs = [
  {
    text: "Write",
    icon: PencilIcon,
  },
  {
    text: "Preview",
    icon: EyeIcon,
  },
];

const Editor = ({
  initialData = null,
  showDeleteButton = false,
  showPublishButton = false,
  showUpdateButton = false,
  disabled = false,
  debounceDelay = 500,
  onChange = () => null,
  onUpdate = () => null,
  onPublish = () => null,
  onDelete = () => null,
}) => {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [category, setCategory] = useState(initialData?.category?.name ?? "");
  const [image, setImage] = useState(initialData?.image ?? "");
  const [activeTab, setActiveTab] = useState(0);

  const [debouncedTitle] = useDebounce(title, debounceDelay);
  const [debouncedContent] = useDebounce(content, debounceDelay);

  const initialRendering = useRef(true);

  useEffect(() => {
    if (initialRendering.current) {
      initialRendering.current = false;
      return;
    }
    onChange(debouncedTitle, debouncedContent);
  }, [debouncedTitle, debouncedContent]);

  /// Upload photo snippet Adam

  const handleUpload = async (e) => {
    let file = e.target.files[0];
    // Split the filename to get the name and type
    let fileParts = e.target.files[0].name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    await axios
      .post("/api/awsImageUrl/postImage", {
        fileName: fileName,
        fileType: fileType,
      })
      .then((res) => {
        const signedRequest = res.data.signedRequest;
        const url = res.data.url;
        setImage(url);

        var options = {
          headers: {
            "Content-Type": fileType,
            "Access-Control-Allow-Origin": "*",
          },
        };
        axios
          .put(signedRequest, file, options)

          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={150}
        placeholder="Title...."
        disabled={disabled}
        className="w-full text-3xl font-bold leading-snug bg-transparent outline-none appearance-none resize-none disabled:cursor-not-allowed "
      />
      <textarea
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        maxLength={150}
        placeholder="Tech..."
        disabled={disabled}
        className="w-full text-xl font-bold leading-snug bg-transparent outline-none appearance-none resize-none disabled:cursor-not-allowed "
      />
      <div className="">
        <input
          type="file"
          accept="image/png, image/jpeg,image/jpg"
          className=""
          onChange={handleUpload}
        />
        <button type="submit">Set Image</button>
      </div>
      <div>
        <img src={image} alt="test" />
      </div>

      <div className="mt-6 flex justify-center sm:justify-between items-center px-4 py-2 space-x-6 rounded bg-gray-100 border border-gray-300 text-gray-700 sticky top-0 ">
        <div className="flex items-center space-x-4">
          {tabs.map(({ text, icon: Icon }, i) => (
            <button
              key={text}
              onClick={() => setActiveTab(i)}
              disabled={disabled}
              className={`flex items-center space-x-1 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors${
                activeTab === i
                  ? "text-blue-600 cursor-default select-none disabled:hover:text-blue-600"
                  : "hover:text-blue-600 disabled:hover:text-current "
              }`}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
              <span className="hidden sm:inline-block">{text}</span>
            </button>
          ))}
        </div>
        {/** Publish & delete actions */}
        <div className="flex items-center space-x-4">
          {showUpdateButton ? (
            <button
              onClick={() => onUpdate(title, content, category, initialData.id)}
              disabled={disabled}
              className="flex items-center space-x-1 transition-colors rounded-md focus:outline-none hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-current"
            >
              <RefreshIcon className="w-6 h-6 flex-shrink-0" />
              <span className="hidden sm:inline-block">Update</span>
            </button>
          ) : null}
          {showPublishButton ? (
            <button
              onClick={() => onPublish(title, content, category)}
              disabled={disabled}
              className="flex items-center space-x-1 transition-colors rounded-md focus:outline-none hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-current"
            >
              <CloudDownloadIcon className="w-6 h-6 flex-shrink-0" />
              <span className="hidden sm:inline-block">Publish</span>
            </button>
          ) : null}
          {showDeleteButton ? (
            <button
              onClick={() => onDelete(initialData.id)}
              disabled={disabled}
              className="flex items-center space-x-1 transition-colors rounded-md focus:outline-none hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-current"
            >
              <TrashIcon className="w-6 h-6 flex-shrink-0" />
              <span className="hidden sm:inline-block">Delete</span>
            </button>
          ) : null}
        </div>
      </div>
      {/** Post Content */}
      <div className="px-4 py-12">
        {activeTab === 0 ? (
          <textarea
            value={content}
            rows="20"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            disabled={disabled}
            className="w-full  resize-none bg-transparent focus:outline-none text-xl leading-snug disabled:cursor-not-allowed"
          />
        ) : (
          <article className=" prose sm:prose-lg lg:prose-xl max-w-none">
            {content ? (
              <ReactMarkdown components={MDComponents}>{content}</ReactMarkdown>
            ) : (
              <p>Nothing to preview yet....</p>
            )}
          </article>
        )}
      </div>
    </div>
  );
};

export default Editor;

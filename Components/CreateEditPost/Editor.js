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
  awsId = null,
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
  const [awsFileName, setAwsFileName] = useState(awsId ?? "");
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
        //const url = res.data.url;
        //setImage(url);

        var options = {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        };
        axios
          .put(signedRequest, file, options)
          .then((r) => {
            console.log(r);
          })

          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    setAwsFileName(fileName);
    setTimeout(async () => {
      await axios
        .post("/api/awsImageUrl/postImage", {
          fileName: fileName,
          fileType: fileType,
        })
        .then((res) => {
          const url = res.data.url;
          setImage(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
  };

  const handleDeleteImage = async (fileName) => {
    try {
      await axios.delete(`/api/awsdeleteimage/${fileName}`);
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(image);
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={150}
        placeholder="Title...."
        disabled={disabled}
        className="w-full text-3xl font-bold leading-snug bg-transparent outline-none appearance-none resize-none disabled:cursor-not-allowed text-white"
      />
      <textarea
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        maxLength={150}
        placeholder="Tech..."
        disabled={disabled}
        className="w-full text-xl text-white font-bold leading-snug bg-transparent outline-none appearance-none resize-none disabled:cursor-not-allowed "
      />
      <div className=" flex flex-row justify-start content-center">
        <label className=" cursor-pointer w-20 h-20 border border-solid border-slate-300 rounded-full leading-8 font-bold text-3xl text-white flex justify-center items-center hover:border-dilate-green">
          <input
            type="file"
            accept="image/png, image/jpeg,image/jpg"
            onChange={handleUpload}
            className="h-0 w-0 opacity-0 cursor-pointer"
          />
          <span className="h-full w-full flex justify-center items-center hover:text-dilate-green">
            +
          </span>
        </label>
        <div className="h-24 ml-7 flex justify-center items-center relative ">
          {image ? (
            <>
              <img src={image} className="h-full w-full" alt="test" />
              <button
                className="text-black bg-gray-300 w-4 h-4 flex justify-center items-center font-bold rounded-xl p-3 absolute top-0 right-0"
                onClick={() => {
                  handleDeleteImage(awsFileName);
                }}
              >
                X
              </button>
            </>
          ) : null}
        </div>
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
              onClick={() =>
                onUpdate(title, content, category, image, initialData.id)
              }
              disabled={disabled}
              className="flex items-center space-x-1 transition-colors rounded-md focus:outline-none hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-current"
            >
              <RefreshIcon className="w-6 h-6 flex-shrink-0" />
              <span className="hidden sm:inline-block">Update</span>
            </button>
          ) : null}
          {showPublishButton ? (
            <button
              onClick={() => onPublish(title, content, category, image)}
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
      <div className="px-4 py-12 overflow-y-hidden">
        {activeTab === 0 ? (
          <textarea
            value={content}
            rows="16"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            disabled={disabled}
            className="w-full text-white  resize-none bg-transparent focus:outline-none text-xl leading-snug disabled:cursor-not-allowed"
          />
        ) : (
          <article className=" prose sm:prose-lg lg:prose-xl max-w-none text-white">
            {content ? (
              <ReactMarkdown components={MDComponents}>{content}</ReactMarkdown>
            ) : (
              <p className="text-white">Nothing to preview yet....</p>
            )}
          </article>
        )}
      </div>
    </div>
  );
};

export default Editor;

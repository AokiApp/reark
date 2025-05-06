import { useContext } from "react";
import { LarkApiContext } from "../contexts/LarkApiContext";
export function useFileToken({ token, name }: { name: string; token: string }) {
  const { files } = useContext(LarkApiContext);
  if (!files) {
    throw new Error("LarkApiContext is not available.");
  }
  const pubUrlWithExt = files[token];
  if (!pubUrlWithExt) {
    throw new Error(`File token ${token} not found in context.`);
  }
  const extension = name.split(".").pop() || "";
  const filename = name.split("/").pop() || "";

  const isVideo = ["mp4", "mov", "avi"].includes(extension);
  const isImage = ["jpg", "jpeg", "png", "gif"].includes(extension);
  const isAudio = ["mp3", "wav", "ogg", "mpga"].includes(extension);
  const isPdfLike = ["pdf"].includes(extension);
  const isOfficeLike = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(
    extension,
  );
  const isPlayable = isVideo || isAudio;
  const isViewable = isImage || isVideo || isAudio;
  const isDownloadable = !isViewable && !isPlayable;

  let kindForIcon = "document"; // default icon
  switch (true) {
    case isVideo:
      kindForIcon = "video";
      break;
    case isImage:
      kindForIcon = "image";
      break;
    case isAudio:
      kindForIcon = "audio";
      break;
    case isPdfLike:
      kindForIcon = "pdf";
      break;
    case isOfficeLike:
      kindForIcon = "office";
      break;
    case isDownloadable:
      kindForIcon = "download";
      break;
    default:
      kindForIcon = "document";
      break;
  }

  // count the number of files in the context
  const fileCount = Object.keys(files).length;
  // prefer eager load if there are less than 10 files
  // this is a heuristic to avoid loading too many files at once
  // and potentially causing performance issues
  const preferEagerLoad = fileCount < 10;

  return {
    uri: pubUrlWithExt,
    extension,
    filename,
    size: 0, // size is currently not available in the context
    verdicts: {
      isVideo,
      isImage,
      isAudio,
      isPlayable,
      isViewable,
      isDownloadable,
      isPdfLike,
      isOfficeLike,
      kindForIcon,
    },
    preferEagerLoad,
  };
}

type ViewProps = {
  fileBlock: {
    name: string;
    token: string;
  };
};

/**
 * CardView: Renders a small banner with the file name, file type, and a download link.
 */
export function CardView({ fileBlock }: ViewProps) {
  const { uri, extension, filename, verdicts } = useFileToken(fileBlock);

  return (
    <div className="view-block view-block__card">
      <div className="view-block__card-icon">
        <FileIcon kindForIcon={verdicts.kindForIcon} extension={extension} />
      </div>
      <div className="view-block__card-content">
        <div className="view-block__card-filename">{filename}</div>
        <div className="view-block__card-meta">
          <span className="view-block__card-extension">
            {extension.toUpperCase()}
          </span>
        </div>
      </div>
      <a
        href={uri}
        className="view-block__card-download"
        download={filename}
        target="_blank"
        rel="noopener noreferrer"
      >
        <DownloadIcon />
      </a>
    </div>
  );
}

/**
 * FileIcon: Renders appropriate icon based on file type
 */
export function FileIcon({
  kindForIcon,
}: {
  kindForIcon: string;
  extension: string;
}) {
  const iconMap: Record<string, React.ReactNode> = {
    pdf: <DocumentIcon />,
    image: <ImageIcon />,
    video: <VideoIcon />,
    audio: <AudioIcon />,
    office: <DocumentIcon />,
    download: <DocumentIcon />,
    document: <DocumentIcon />,
  };

  return (
    <div
      className={`view-block__file-icon view-block__file-icon--${kindForIcon}`}
    >
      {iconMap[kindForIcon] || <DocumentIcon />}
    </div>
  );
}

const ImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path
      d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
      fill="#4CAF50"
    />
  </svg>
);

const VideoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM15 10.5V8.5C15 7.67 14.33 7 13.5 7H9V17H13.5C14.33 17 15 16.33 15 15.5V13.5C15 12.67 14.33 12 13.5 12C14.33 12 15 11.33 15 10.5Z"
      fill="#2196F3"
    />
  </svg>
);

const AudioIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path
      d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17C6 19.21 7.79 21 10 21C12.21 21 14 19.21 14 17V7H18V3H12ZM10 19C8.9 19 8 18.1 8 17C8 15.9 8.9 15 10 15C11.1 15 12 15.9 12 17C12 18.1 11.1 19 10 19Z"
      fill="#FF9800"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"
      fill="#607D8B"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20"
    height="20"
  >
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </svg>
);

/**
 * PreviewView: Renders a preview of the file content.
 */
export function PreviewView({ fileBlock }: ViewProps) {
  const { uri, extension, filename, verdicts, preferEagerLoad } =
    useFileToken(fileBlock);

  return (
    <div className="view-block view-block__preview">
      {verdicts.isImage && (
        <div className="view-block__preview-content view-block__preview-image">
          <img src={uri} alt={filename} />
        </div>
      )}
      {verdicts.isVideo && (
        <div className="view-block__preview-content view-block__preview-video">
          <video
            src={uri}
            controls
            autoPlay={false}
            preload={preferEagerLoad ? "auto" : "none"}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {verdicts.isAudio && (
        <div className="view-block__preview-content view-block__preview-audio">
          <audio
            src={uri}
            controls
            autoPlay={false}
            preload={preferEagerLoad ? "auto" : "none"}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {!verdicts.isViewable && (
        <div className="view-block__preview-content view-block__preview-placeholder">
          <FileIcon kindForIcon={verdicts.kindForIcon} extension={extension} />
        </div>
      )}
      {!(verdicts.isVideo || verdicts.isAudio) && (
        <div className="view-block__preview-footer">
          <div className="view-block__preview-filename">{filename}</div>
          <a
            href={uri}
            className="view-block__preview-download"
            download={filename}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DownloadIcon />
          </a>
        </div>
      )}
    </div>
  );
}

/**
 * InlineView: Renders the file inline with text.
 */
export function InlineView({ fileBlock }: ViewProps) {
  const { uri, extension, filename, verdicts } = useFileToken(fileBlock);

  return (
    <a
      href={uri}
      className="view-block__inline-link"
      download={filename}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="view-block__inline-icon">
        <FileIcon kindForIcon={verdicts.kindForIcon} extension={extension} />
      </div>
      <div className="view-block__inline-filename">{filename}</div>
    </a>
  );
}

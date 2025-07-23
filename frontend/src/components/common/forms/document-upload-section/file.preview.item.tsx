// src/components/common/forms/document-upload-section/file.preview.item.tsx

import React from "react";
import css from "../../../../assets/styles/components/file.preview.item.module.scss";

// Ícono genérico de archivo
const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={css.fileIcon}
  >
    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"></path>
  </svg>
);

// Ícono específico para PDF
const PdfIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={css.fileIcon}
  >
    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM19 19H5V5H19V19ZM12 9H9V11H12V13H9V15H12V17H9V19H7V7H12C14.2091 7 16 8.79086 16 11V11.5C16 13.7091 14.2091 15.5 12 15.5V13.5C13.1046 13.5 14 12.6046 14 11.5V11C14 9.89543 13.1046 9 12 9Z"></path>
  </svg>
);

interface FilePreviewItemProps {
  file: string | File;
  index?: number;
  onDelete: (index?: number) => void;
  fieldName: 'document1' | 'document2' | 'document3';
}

const FilePreviewItem: React.FC<FilePreviewItemProps> = ({
  file,
  index,
  onDelete,
  fieldName,
}) => {
  let displayName: string;

  // Obtiene un nombre seguro, incluso si el archivo es undefined
  const actualFileName =
    typeof file === "string"
      ? file?.split?.("/")?.pop() || ""
      : file?.name || "";

  // Etiqueta visual según el tipo de documento
  if (fieldName === 'document3' && index !== undefined) {
    displayName = `Imagen ${index + 1}`;
  } else if (fieldName === 'document1') {
    displayName = "Documento 1";
  } else if (fieldName === 'document2') {
    displayName = "Documento 2";
  } else {
    displayName = "Archivo Adjunto";
  }

  const handleDelete = () => {
    onDelete(index);
  };

  const getFileIcon = (fileName: string) => {
    if (!fileName || !fileName.includes(".")) {
      return <FileIcon />;
    }

    const extension = fileName.split(".").pop()?.toLowerCase();

    if (extension === "pdf") {
      return <PdfIcon />;
    }

    return <FileIcon />;
  };

  return (
    <div className={css.filePreviewItem}>
      <div className={css.fileIconContainer}>
        {getFileIcon(actualFileName)}
      </div>
      <span className={css.fileName}>{displayName}</span>
      <button type="button" onClick={handleDelete} className={css.deleteButton}>
        X
      </button>
    </div>
  );
};

export default FilePreviewItem;

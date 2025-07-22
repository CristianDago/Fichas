// src/components/common/forms/document-upload-section/document.upload.section.tsx

import React from "react";
import FilePreviewItem from './file.preview.item';

interface DocumentUploadSectionProps {
  label: string;
  name: string; // Este 'name' es crucial y lo pasaremos como 'fieldName'
  value: string | File | (string | File)[] | File[] | null | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (index?: number) => void;
  multiple?: boolean;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  label,
  name, // Recuperamos 'name' aquí
  value,
  onChange,
  onDelete,
  multiple = false,
}) => {
  const handleNativeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simplemente pasamos el evento nativo al onChange que viene de las props.
    onChange(e);
  };

  const renderContent = () => {
    if (!value) return null;

    if (Array.isArray(value)) {
      return value.map((file, index) => {
        if (!file) return null;
        return (
          <FilePreviewItem
            key={index}
            file={file}
            index={index}
            onDelete={onDelete}
            fieldName={name as 'document1' | 'document2' | 'document3'} // <--- ¡ÚNICO CAMBIO AQUÍ!
          />
        );
      });
    }

    return (
      <FilePreviewItem
        file={value}
        onDelete={onDelete}
        fieldName={name as 'document1' | 'document2' | 'document3'} // <--- ¡ÚNICO CAMBIO AQUÍ!
      />
    );
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", marginBottom: "8px" }}>{label}</label>
      <input
        type="file"
        name={name}
        onChange={handleNativeInputChange} // Se pasa el evento nativo
        multiple={multiple}
        style={{ marginBottom: "8px" }}
      />
      <div>{renderContent()}</div>
    </div>
  );
};

export default DocumentUploadSection;
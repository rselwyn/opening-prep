import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";

const PGNForm = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} color="primary" variant="contained">
        Submit PGN
      </Button>

      <DropzoneDialog
        // acceptedFiles={["image/*"]}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={open}
        onClose={() => setOpen(false)}
        onSave={onSubmit}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </>
  );
};

export default PGNForm;

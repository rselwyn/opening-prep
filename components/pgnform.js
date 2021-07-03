import { Button } from "@material-ui/core"
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";


const PGNForm = ({ onSubmit }) => (
  <>
 <DropzoneArea
        onChange={() => {}}
        />
   <DropzoneDialog
                    open={false}
                    onSave={() => {}}
                    // acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    // onClose={this.handleClose.bind(this)}
                />
                </>
  // <form onSubmit={onSubmit}>
  //   <label>
  //     <span>PGN</span>
  //     <Button variant="contained" component="label">
  //       Upload File
  //       <input type="file" hidden />
  //     </Button>
  //   </label>

  //   {/* <div className="submit"> */}
  //     <Button variant="contained" color="primary" type="submit">Submit PGN</Button>
  //   {/* </div> */}

  //   <style jsx>{`
  //     form,
  //     label {
  //       display: flex;
  //       flex-flow: column;
  //     }
  //     label > span {
  //       font-weight: 600;
  //     }
  //     input {
  //       padding: 8px;
  //       margin: 0.3rem 0 1rem;
  //       border: 1px solid #ccc;
  //       border-radius: 4px;
  //     }
  //     .submit {
  //       display: flex;
  //       justify-content: flex-end;
  //       align-items: center;
  //       justify-content: space-between;
  //     }
  //     .submit > a {
  //       text-decoration: none;
  //     }
  //     .submit > button {
  //       padding: 0.5rem 1rem;
  //       cursor: pointer;
  //       background: #fff;
  //       border: 1px solid #ccc;
  //       border-radius: 4px;
  //     }
  //     .submit > button:hover {
  //       border-color: #888;
  //     }
  //     .error {
  //       color: brown;
  //       margin: 1rem 0 0;
  //     }
  //   `}</style>
  // </form>
);

export default PGNForm

import {DirectUploadFile} from "src/dropzone/direct_upload_controller";
import {DropzoneBaseController} from "src/dropzone/dropzone_base_controller";
import {createDirectUploadController, createDropZone} from "src/dropzone/utils";
import {removeElement} from "src/utils";

export default class DropzoneController extends DropzoneBaseController {

  connect(): void {
    this.dropZone = createDropZone(this);
    this.hideFileInput();
    this.bindEvents();
  }

  private hideFileInput(): void {
    this.inputTarget.disabled = true;
    this.inputTarget.style.display = "none";
  }

  private bindEvents(): void {
    this.dropZone.on("addedfile", (file: DirectUploadFile) => {
      setTimeout(() => {
        file.accepted && createDirectUploadController(this, file).start();
      }, 500);
    });

    this.dropZone.on("removedfile", (file: DirectUploadFile) => {
      file.controller && removeElement(file.controller.hiddenInput);
    });

    this.dropZone.on("canceled", (file: DirectUploadFile) => {
      file.controller && file.controller.xhr.abort();
    });
  }
}
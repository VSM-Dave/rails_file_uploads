import { DirectUpload } from "@rails/activestorage";
import {DropzoneBaseController} from "src/dropzone/dropzone_base_controller";
import {DropzoneFile} from "dropzone";
import {findElement, insertAfter, removeElement} from "src/utils";
import * as Dropzone from "dropzone";
import {createDirectUpload} from "src/dropzone/utils";

export interface DirectUploadFile extends DropzoneFile{
  controller?: DirectUploadController
}

export class DirectUploadController {
  private directUpload: DirectUpload;
  private sourceController: DropzoneBaseController;
  private readonly file: DirectUploadFile;
  public hiddenInput: HTMLInputElement;
  public xhr: XMLHttpRequest;

  constructor(source: DropzoneBaseController, file: DropzoneFile) {
    this.directUpload = createDirectUpload(file, source.url, this);
    this.sourceController = source;
    this.file = file;
  }

  public start(): void {
    this.file.controller = this;
    this.hiddenInput = this.createHiddenInput();
    this.directUpload.create((error, attributes) => {
      if (error) {
        removeElement(this.hiddenInput);
        this.emitDropzoneError(error);
      } else {
        this.hiddenInput.value = attributes.signed_id;
        this.emitDropzoneSuccess();
      }
    });
  }

  private createHiddenInput(): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = this.sourceController.inputTarget.name;
    insertAfter(input, this.sourceController.inputTarget);
    return input;
  }

  public directUploadWillStoreFileWithXHR(xhr): void {
    this.bindProgressEvent(xhr);
    this.emitDropzoneUploading();
  }

  private bindProgressEvent(xhr: XMLHttpRequest): void {
    this.xhr = xhr;
    this.xhr.upload.addEventListener("progress", event =>
      this.uploadRequestDidProgress(event)
    );
  }

  private uploadRequestDidProgress(event): void {
    const element = this.sourceController.element;
    const progress = (event.loaded / event.total) * 100;
    findElement(
      this.file.previewTemplate,
      ".dz-upload"
    ).style.width = `${progress}%`;
  }

  emitDropzoneUploading(): void {
    this.file.status = Dropzone.UPLOADING;
    this.sourceController.dropZone.emit("processing", this.file);
  }

  emitDropzoneError(error): void {
    this.file.status = Dropzone.ERROR;
    this.sourceController.dropZone.emit("error", this.file, error);
    this.sourceController.dropZone.emit("complete", this.file);
  }

  emitDropzoneSuccess(): void {
    this.file.status = Dropzone.SUCCESS;
    this.sourceController.dropZone.emit("success", this.file);
    this.sourceController.dropZone.emit("complete", this.file);
  }
}

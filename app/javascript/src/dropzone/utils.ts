import {DropzoneBaseController} from "src/dropzone/dropzone_base_controller";
import * as Dropzone from "dropzone";
import {DropzoneOptions} from "dropzone";
import {DirectUploadController} from "src/dropzone/direct_upload_controller";
import {DropzoneFile} from "dropzone";
import {DirectUpload} from "@rails/activestorage";

export function createDropZone(controller: DropzoneBaseController): Dropzone {
  const options: DropzoneOptions = {
    url: controller.url,
    headers: controller.headers,
    maxFiles: controller.maxFiles,
    maxFilesize: controller.maxFileSize,
    acceptedFiles: controller.acceptedFiles,
    addRemoveLinks: controller.addRemoveLinks,
    autoQueue: false,
    uploadMultiple: controller.maxFiles > 1
  };
  return new Dropzone(controller.element as HTMLElement, options)
}

export function createDirectUploadController(source: DropzoneBaseController, file: DropzoneFile): DirectUploadController {
  return new DirectUploadController(source, file);
}

export function createDirectUpload(file: DropzoneFile, url: string, controller: DirectUploadController): DirectUpload {
  return new DirectUpload(file, url, controller);
}
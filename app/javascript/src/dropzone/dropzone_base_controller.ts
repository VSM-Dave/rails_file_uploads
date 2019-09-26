import {Controller} from "@stimulus/core";
import * as Dropzone from "dropzone";
import {getMetaValue} from "src/utils";

export class DropzoneBaseController extends Controller {
  static targets = ["input"];
  public dropZone: Dropzone;
  public inputTarget: HTMLInputElement;

  public get headers(): { "X-CSRF-Token": string } {
    return {"X-CSRF-Token": getMetaValue("csrf-token")};
  }

  public get url(): string {
    return this.inputTarget.getAttribute("data-direct-upload-url");
  }

  public get maxFiles(): number {
    const value: string = this.data.get("maxFiles");
    return value ? parseInt(value) : 1;
  }

  public get maxFileSize(): number {
    const value: string = this.data.get("maxFileSize");
    return value ? parseInt(value) : 256;
  }

  public get acceptedFiles(): string {
    return this.data.get("acceptedFiles");
  }

  public get addRemoveLinks(): boolean {
    const value = this.data.get("addRemoveLinks");
    return value ? value == "true" : true;
  }
}
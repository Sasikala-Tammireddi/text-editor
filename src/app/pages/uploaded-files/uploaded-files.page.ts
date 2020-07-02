import { Component, OnInit } from "@angular/core";
import { File } from "@ionic-native/file/ngx";
import { Platform } from "@ionic/angular";
import {
  FileTransfer,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";

@Component({
  selector: "app-uploaded-files",
  templateUrl: "./uploaded-files.page.html",
  styleUrls: ["./uploaded-files.page.scss"],
})
export class UploadedFilesPage implements OnInit {
  public listOfFiles: Array<any> = [];
  constructor(
    private file: File,
    private platform: Platform,
    private transfer: FileTransfer
  ) {
    this.getFiles();
  }

  ngOnInit() {}

  getFiles() {
    this.file.listDir(this.file.dataDirectory, "durity").then((res) => {
      console.log("List::::::::::::::::::\n", res);
      this.listOfFiles = [...res];
    });
    console.log(this.listOfFiles);
  }

  downloadFile(file) {
    let path = file.nativeURL.substring(0, file.nativeURL.lastIndexOf("/") + 1);
    console.log(path);
    path = this.file.dataDirectory + "/durity/";
    if (this.platform.is("android")) {
      this.download(path, file.name, this.file.externalRootDirectory);
    } else if (this.platform.is("ios")) {
      this.download(path, file.name, this.file.documentsDirectory);
    }
  }

  download(path, filename, newpath) {
    // this.file.createDir(path, "durity", true).then((createDirectoryResp) => {
    //   console.log("Directory exists");
    //   this.file.createFile(path + "/durity/", filename, true).then((createFileResp: any) => {
    //     const blob: Blob = new Blob([this.listOfFiles[indexToDownload].content],{ type: `text/plain` });
    //     this.file.writeFile(path + "/durity/", filename, blob, { replace: true, append: false }).then((resp) => {
    //       console.log("response over writing a file", resp);
    //     }, (writeFileErr: any) => {
    //       console.error("createFile Error::::::\n", writeFileErr);
    
    //     });
    //   }, (createFileErr: any) => {
    //     console.error("createFile Error::::::\n", createFileErr);
    //   });
    // }, (createDirErr: any) => {
    //   console.error("createDir Error::::::\n", createDirErr);
    // });
    this.file.copyFile(path, filename, newpath + "/durity/", "").then(
      (resp) => {
        console.log("coping file to local store", resp);
      },
      (err) => {
        console.error("Error over copying file", err);
      }
    );
  }

  deleteFile(file) {
    let path = this.file.dataDirectory + "/durity/";
    this.file.removeFile(path, file).then(
      () => {
        this.getFiles();
      },
      (err) => {
        console.error("Error while deleting file", err);
      }
    );
  }
}

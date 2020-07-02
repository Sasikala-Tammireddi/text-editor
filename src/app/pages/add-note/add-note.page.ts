import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControlName, FormControl } from "@angular/forms";
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: "app-add-note",
  templateUrl: "./add-note.page.html",
  styleUrls: ["./add-note.page.scss"],
})
export class AddNotePage implements OnInit {
  public editorControl: FormControl;
  public title: any;
  public dataToShow: Array<any> = [];
  public updateIndex: number = 0;

  constructor(private fb: FormBuilder, public file: File) {
    this.editorControl = this.fb.control("");
  }

  ngOnInit() {}

  ionViewDidEnter() {
    console.clear();
    this.getData();
  }

  getData() {
    if (
      localStorage.getItem("data") !== null &&
      localStorage.getItem("data") !== undefined
    ) {
      this.dataToShow = JSON.parse(localStorage.getItem("data"));
    }
  }

  save() {
    this.dataToShow.push({
      title: this.title,
      content: this.editorControl.value,
    });
    localStorage.setItem("data", JSON.stringify(this.dataToShow));
    this.title = "";
    this.editorControl.reset();
  }

  selectDataToUpdate(indexToUpdate) {
    this.updateIndex = indexToUpdate;
    this.title =this.dataToShow[indexToUpdate].title;
    this.editorControl.patchValue(this.dataToShow[indexToUpdate].content);
  }

  updateData() {
    this.dataToShow[this.updateIndex].title= this.title;
    this.dataToShow[this.updateIndex].content = this.editorControl.value;
    localStorage.setItem("data", JSON.stringify(this.dataToShow));
    this.title ="";
    this.editorControl.reset();
  }

  deleteData(indexToDelete) {
    this.dataToShow.splice(indexToDelete, 1);
    localStorage.setItem("data", JSON.stringify(this.dataToShow));
  }

  uploadData(indexToUpload) {
    const uploadData: Array<any> = [];
    uploadData.push(this.dataToShow[indexToUpload]);
    localStorage.setItem("uploaded-data", JSON.stringify(uploadData));
    this.file.createDir(this.file.dataDirectory, "durity", true).then((createDirectoryResp) => {
      console.log("Directory exists");
      this.file.createFile(this.file.dataDirectory + "/durity/", `${this.dataToShow[indexToUpload].title}.txt`, true).then((createFileResp:any) => {
        const blob: Blob =  new Blob([this.dataToShow[indexToUpload].content], { type: `text/plain` });
        this.file.writeFile(this.file.dataDirectory + "/durity/", `${this.dataToShow[indexToUpload].title}.txt` , blob, {replace: true, append: false});
      },(createFileErr:any) => {
        console.error("createFile Error::::::\n", createFileErr);
      })
    },(createDirErr:any) => {
      console.error("createDir Error::::::\n", createDirErr);
    });
  }
}

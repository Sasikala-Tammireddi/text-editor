import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
  AfterContentInit,
  OnChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "rich-text",
  templateUrl: "./rich-text.component.html",
  styleUrls: ["./rich-text.component.scss"],
})
export class RichTextComponent implements OnInit, AfterContentInit, OnChanges {
  @ViewChild("editor") public editor: ElementRef;
  @ViewChild("decorate") public decorate: ElementRef;
  @ViewChild("styler") public styler: ElementRef;

  @Input() public formControlItem: FormControl;
  @Input() public placeholderText: string;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.formControlItem.valueChanges.subscribe((x) => {
      console.clear();
      const element = this.editor.nativeElement as HTMLDivElement;
      if (x === null || x === undefined || x === "") {
        element.innerHTML = "<div></div>";
      } else {
        element.innerHTML = x;
      }
    });
  }

  getPlaceholderText() {
    if (this.placeholderText !== undefined) {
      return this.placeholderText;
    }
    return "";
  }

  uniqueId = `editor${Math.floor(Math.random() * 1000000)}`;

  private stringTools = {
    isNullOrWhiteSpace: (value: string) => {
      if (value == null || value == undefined) {
        return true;
      }
      value = value.replace(/[\n\r]/g, "");
      value = value.split(" ").join("");

      return value.length === 0;
    },
  };

  private updateItem() {
    const element = this.editor.nativeElement as HTMLDivElement;
    element.innerHTML = this.formControlItem.value;

    // if (element.innerHTML === null || element.innerHTML === '') {
    //   element.innerHTML = '<div></div>';
    // }

    const reactToChangeEvent = () => {
      if (this.stringTools.isNullOrWhiteSpace(element.innerText)) {
        element.innerHTML = "<div></div>";
        this.formControlItem.setValue(null);
      } else {
        this.formControlItem.setValue(
          element.innerHTML.replace("<div></div>", "")
        );
        element.focus();
        document.execCommand("selectAll", false, null);
        document.getSelection().collapseToEnd();
      }
    };

    element.onchange = () => reactToChangeEvent();
    // element.onkeyup = () => reactToChangeEvent();
    element.onpaste = () => reactToChangeEvent();
    element.oninput = () => reactToChangeEvent();
  }

  private wireupButtons() {
    let buttons = (this.decorate
      .nativeElement as HTMLDivElement).getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];

      let command = button.getAttribute("data-command");

      if (command.includes("|")) {
        let parameter = command.split("|")[1];
        command = command.split("|")[0];

        button.addEventListener("click", () => {
          document.execCommand(command, false, parameter);
        });
      } else {
        button.addEventListener("click", () => {
          document.execCommand(command);
        });
      }
    }
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.updateItem();
      this.wireupButtons();
    }, 1500);
  }
}

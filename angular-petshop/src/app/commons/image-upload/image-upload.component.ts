import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

    @Input() files: File[];
    @Input() images: string[];

    constructor() {
    }

    ngOnInit() {
    }

    onAdd(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (load: any) => {
                this.images.push(load.target.result);
            };
            this.files.push(event.target.files[0]);
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    onRemoved(i: number) {
        this.images.splice(i, 1);
        this.files.splice(i, 1);
    }
}

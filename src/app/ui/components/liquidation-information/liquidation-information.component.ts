import {Component, Inject, OnInit} from '@angular/core';
import {ErrorsUseCase} from "../../../domain/usecase/errors.usecase";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LiquidationUseCase} from "../../../domain/usecase/liquidation.usecase";
import {ILiquidationModel} from "../../../domain/models/liquidation/liquidation.model";
import {jsPDF} from 'jspdf';
import html2canvas from "html2canvas";

@Component({
  selector: 'app-liquidation-information',
  templateUrl: './liquidation-information.component.html',
  styleUrls: ['./liquidation-information.component.css']
})
export class LiquidationInformationComponent implements OnInit {

  liquidation! : ILiquidationModel;
  id : string;

  constructor(
    private liquidationUseCase: LiquidationUseCase,
    private error : ErrorsUseCase,
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    private dialogRef: MatDialogRef<LiquidationInformationComponent>,
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.findLiquidation(this.id);
  }

  findLiquidation(id:string){
    this.liquidationUseCase.findLiquidationOfEmployee(id).subscribe(result => {
      if("employeeName" in result) {
        this.liquidation = result;
      } else {
        this.error.error(result);
      }
    })
  }

  downloadPDF() : void{
    const data = document.getElementById('component-to-download');

    html2canvas(data!).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('settlement-voucher.pdf');
      this.dialogRef.close();
    });
  }



}





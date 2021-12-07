import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UserBankDetailsService } from 'src/app/services/user-bank-details.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {

  //Main Form Group
  bankDetailsForm!: FormGroup;

  // Form Group for Arrays
  rnfi!: FormGroup;
  pivotal!: FormGroup;
  paysprint!: FormGroup;

  controls_array: any[] = [];


  constructor(private bankDetailsService: UserBankDetailsService,
    private _fb: FormBuilder) { }

  ngOnInit(): void {

    this.bankDetailsForm = this._fb.group({
      rnfi: this._fb.array([]),
      pivotal: this._fb.array([]),
      paysprint: this._fb.array([]),
    });

    this.bankDetailsService.getAllUserDetails().subscribe(
      (response) => {
        //console.log(response.data[0]);
        const bankDetails = response.data[0];
        this.addData('rnfi', bankDetails.rnfi);
        this.addData('pivotal', bankDetails.pivotal);
        this.addData('paysprint', bankDetails.paysprint);

        //The below array is to make the template code leaner
        this.controls_array = [
          { array_name: 'rnfi', controls: this.RNFI_controls },
          { array_name: 'pivotal', controls: this.pivotal_controls },
          { array_name: 'paysprint', controls: this.paysprint_controls }
        ];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addData(key: string, data: any[]) {
    data.forEach(
      (element) => {
        let data_array = this.bankDetailsForm.controls[key] as FormArray;
        const keys = Object.keys(element);
        let data_object = {};
        keys.forEach(
          (key) => {
            Object.assign(data_object, { [`${key}`]: element[key] })
          }
        );
        data_array.push(
          this._fb.group({
            ...data_object
          }))
      }
    );
  }

  get RNFI_controls() { // a getter!
    return (<FormArray>this.bankDetailsForm.get('rnfi')).controls as any;
  }

  get pivotal_controls() { // a getter!
    return (<FormArray>this.bankDetailsForm.get('pivotal')).controls as any;
  }

  get paysprint_controls() { // a getter!
    return (<FormArray>this.bankDetailsForm.get('paysprint')).controls as any;
  }

  onUpdate() {
    let newData = this.bankDetailsForm.value;
    console.log(newData) // updated data

    this.bankDetailsService.updateUserDetails(newData).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

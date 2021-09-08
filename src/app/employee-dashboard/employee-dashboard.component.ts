import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService} from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  
  formValue !: FormGroup;
  employeeModelObj : EmployeeModel =new EmployeeModel();
  employeedata !: any;
  constructor(private formbuilder: FormBuilder,
  private api : ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Nombre : [''],
      Apellido : [''],
      Email : [''],
      Celular : [''],
      Salario : ['']
    })
    this.getAllEmployee();
  }
  postEmployeeDetails(){
    this.employeeModelObj.Nombre= this.formValue.value.Nombre;
    this.employeeModelObj.Apellido= this.formValue.value.Apellido;
    this.employeeModelObj.Email= this.formValue.value.Email;
    this.employeeModelObj.Celular= this.formValue.value.Celular;
    this.employeeModelObj.Salario= this.formValue.value.Salario;

    this.api.postEmploye(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Empleado Agregado Exitosamente")
      let ref = document.getElementById('cancelar')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();  
    },
    err=>{
      alert ("Empleado no agregado");
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeedata = res;  
    })

  } 
  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Elimnado con Exito")
      this.getAllEmployee();
    })
  }
  onEdit(row : any){
    this.employeeModelObj.id=row.id;
    this.formValue.controls['Nombre'].setValue(row.Nombre);
    this.formValue.controls['Apellido'].setValue(row.Apellido)
    this.formValue.controls['Email'].setValue(row.Email)
    this.formValue.controls['Celular'].setValue(row.Celular)
    this.formValue.controls['Salario'].setValue(row.Salario)
    }

    updateEmployeeDetails(){
      this.employeeModelObj.Nombre= this.formValue.value.Nombre;
      this.employeeModelObj.Apellido= this.formValue.value.Apellido;
      this.employeeModelObj.Email= this.formValue.value.Email;
      this.employeeModelObj.Celular= this.formValue.value.Celular;
      this.employeeModelObj.Salario= this.formValue.value.Salario;
      this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert ("Actualizado Correctamente")
      let ref = document.getElementById('cancelar')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
    }
    
}

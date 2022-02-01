import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BasicMicroService from "../../submodules/ex3-ms-framework/basic-ms.service";
import { EmployeeEntity } from '../../submodules/ex3-ms-entities/employee.entity';
import EmployeeDto from '../../submodules/ex3-ms-dtos/employee.dto';


@Injectable()
export class EmployeeService extends BasicMicroService<EmployeeEntity, EmployeeDto> {

    constructor(
        @InjectRepository(EmployeeEntity) private employeeRepo: Repository<EmployeeEntity>,
    ) {
        super(employeeRepo, ["departments"], EmployeeEntity, EmployeeDto, 'Employee');
    }

}
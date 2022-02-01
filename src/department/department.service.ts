import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BasicMicroService from "../../submodules/ex3-ms-framework/basic-ms.service";
import { DepartmentEntity } from "submodules/ex3-ms-entities/department.entity";
import DepartmentDto from "submodules/ex3-ms-dtos/department.dto";


@Injectable()
export class DepartmentService extends BasicMicroService<DepartmentEntity, DepartmentDto> {

    constructor(
        @InjectRepository(DepartmentEntity) private departmentRepo: Repository<DepartmentEntity>,
    ) {
        super(departmentRepo, ["employees"], DepartmentEntity, DepartmentDto, 'Department');
    }

}
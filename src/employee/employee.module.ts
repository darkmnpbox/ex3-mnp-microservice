import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEntity } from "submodules/ex3-ms-entities/employee.entity";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";


@Module({
    imports: [TypeOrmModule.forFeature([EmployeeEntity])],
    controllers: [EmployeeController],
    providers: [EmployeeService]
})
export class EmployeeModule { }
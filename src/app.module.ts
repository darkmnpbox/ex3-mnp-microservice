import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from 'config/db.config';
import { DepartmentEntity } from 'submodules/ex3-ms-entities/department.entity';
import { EmployeeEntity } from 'submodules/ex3-ms-entities/employee.entity';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([DepartmentEntity, EmployeeEntity]),
    DepartmentModule,
    EmployeeModule
  ]
})
export class AppModule { }



import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';
import RequestModelQuery from 'submodules/ex3-ms-dtos/requestModelQuery';
import ResponseModelQueryDto from 'submodules/ex3-ms-dtos/responseModelQuery.dto';
import EmployeeDto from '../../submodules/ex3-ms-dtos/employee.dto';
import RequestModel from '../../submodules/ex3-ms-framework/common/ex3-ms-dtos/requestModel';
import ResponseModel from '../../submodules/ex3-ms-framework/common/ex3-ms-dtos/responseModel';




import { Broker } from '../../submodules/rabbitmq-broker/broker';
import { EmployeeService } from './employee.service';

@Controller('EMPLOYEE')
export class EmployeeController {

    private broker = Broker.getInstance();
    // mention the topic we need for this controller
    private topicArray = ['EMPLOYEE_ADD', 'EMPLOYEE_UPDATE', 'EMPLOYEE_DELETE'];
    private serviceName = ['IOT_SERVICE', 'IOT_SERVICE', 'IOT_SERVICE'];

    constructor(private readonly employeeService: EmployeeService) {
        // starting to listen for respective topics
        this.moduleInit();
    }

    /**
     * creating a listener to all topic belong to this controller
     */

    @Post('connect')
    async moduleInit() {
        console.log('inside of Employee Controller for connection');
        for (var i = 0; i < this.topicArray.length; i++) {
            this.broker.listenToService(
                this.topicArray[i],
                this.serviceName[i],
                (() => {
                    var value = this.topicArray[i];
                    return async (result) => {
                        console.log('params passed to listner callback in MS........' + JSON.stringify(result));
                        let responseModelOfGroupDto: ResponseModel<EmployeeDto>;
                        try {
                            switch (value) {
                                case 'EMPLOYEE_ADD':
                                    console.log('Inside EMPLOYEE_ADD Topic');
                                    responseModelOfGroupDto = await this.create(result['message']);
                                    break;
                                case 'EMPLOYEE_UPDATE':
                                    console.log('Inside EMPLOYEE_UPDATE Topic');
                                    var id: string = result.message.data.id;
                                    responseModelOfGroupDto = await this.update(result['message']);
                                    break;
                                case 'EMPLOYEE_DELETE':
                                    console.log('Inside EMPLOYEE_DELETE Topic');
                                    var id: string = result.message.data.id;
                                    responseModelOfGroupDto = await this.delete(parseInt(id));
                                    break;
                            }
                            responseModelOfGroupDto.socketId = result.message.socketId;
                            responseModelOfGroupDto.requestId = result.message.requestId;
                            console.log(responseModelOfGroupDto);
                            console.log('Sending process data back to gateways...');
                            for (
                                let index = 0;
                                index < result.OnSuccessTopicsToPush.length;
                                index++
                            ) {
                                const element = result.OnSuccessTopicsToPush[index];
                                this.broker.publishMessageToTopic(
                                    element,
                                    responseModelOfGroupDto
                                );
                            }
                        } catch (error) {
                            console.log('Error occured when trying to listen queues...');
                            console.log(error, result);
                            for (
                                let index = 0;
                                index < result.OnFailureTopicsToPush.length;
                                index++
                            ) {
                                const element = result.OnFailureTopicsToPush[index];
                                this.broker.publishMessageToTopic(
                                    element,
                                    responseModelOfGroupDto
                                );
                            }
                        }
                    };
                })(),
            );
        }
    }



    /**
     * Normal CURD opertions
     * 
     */

    @Get()
    async queryFilter(
        @Query('query') query: string
    ): Promise<ResponseModel<ResponseModelQueryDto<EmployeeDto[]>>> {
        const body: RequestModelQuery = JSON.parse(query);
        console.log(body);
        return this.employeeService.queryFilter(body);
    }

    @Get(':id')
    async getById(
        @Param('id') id: number
    ): Promise<ResponseModel<EmployeeDto>> {
        return this.employeeService.getById(id);
    }

    @Post()
    async create(
        @Body() body: RequestModel<EmployeeDto>
    ): Promise<ResponseModel<EmployeeDto>> {
        return this.employeeService.create(body);
    }

    @Put()
    async update(
        @Body() body: RequestModel<EmployeeDto>
    ): Promise<ResponseModel<EmployeeDto>> {
        return this.employeeService.update(body);
    }

    @Delete(':id')
    async delete(
        @Param('id') id: number
    ): Promise<ResponseModel<EmployeeDto>> {
        return this.employeeService.delete(id);
    }
}
